import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateAnonymousName } from "@/lib/anon-name"
import { sendCommentNotification } from "@/lib/email"
import { randomUUID } from "crypto"

const GUEST_COOKIE = "vt_guest_token"
const ONE_YEAR = 60 * 60 * 24 * 365

async function getOrCreateGuest(): Promise<{ id: number; token: string }> {
  const cookieStore = cookies()
  let token = cookieStore.get(GUEST_COOKIE)?.value

  if (!token) {
    token = randomUUID()
    // set httpOnly cookie
    cookieStore.set(GUEST_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_YEAR,
      path: "/",
    })
  }

  let guest = await prisma.guest.findUnique({ where: { token } })
  if (!guest) {
    guest = await prisma.guest.create({ data: { token } })
  }
  return { id: guest.id, token: guest.token }
}

async function getOrCreateArticle(slug: string, title?: string) {
  let article = await prisma.article.findUnique({ where: { slug } })
  if (!article) {
    article = await prisma.article.create({ data: { slug, title: title ?? slug } })
  }
  return article
}

async function getOrCreateAnonUsername(guestId: number, articleId: number): Promise<string> {
  const existing = await prisma.guestArticleName.findUnique({
    where: { guestId_articleId: { guestId, articleId } },
  })
  if (existing) return existing.anonUsername

  // ensure uniqueness within the article
  for (let i = 0; i < 10; i++) {
    const candidate = generateAnonymousName()
    const collision = await prisma.guestArticleName.findFirst({
      where: { articleId, anonUsername: candidate },
      select: { id: true },
    })
    if (!collision) {
      const created = await prisma.guestArticleName.create({
        data: { guestId, articleId, anonUsername: candidate },
      })
      return created.anonUsername
    }
  }
  // fallback with suffix if collisions persist
  const fallback = `${generateAnonymousName()}${Math.floor(Math.random() * 1000)}`
  const created = await prisma.guestArticleName.create({
    data: { guestId, articleId, anonUsername: fallback },
  })
  return created.anonUsername
}

async function getParentCommenterName(parentId: number): Promise<string | undefined> {
  try {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
      select: { anonUsername: true },
    })
    return parentComment?.anonUsername
  } catch {
    return undefined
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("articleSlug")
  if (!slug) {
    return NextResponse.json({ error: "Missing articleSlug" }, { status: 400 })
  }

  const { id: guestId, token } = await getOrCreateGuest()
  const isAdminUser = !!process.env.ADMIN_GUEST_TOKEN && token === process.env.ADMIN_GUEST_TOKEN
  const article = await getOrCreateArticle(slug, "DUBAI AS AN EMIRATE, NOT A COUNTRY! 😅")
  const currentUsername = await getOrCreateAnonUsername(guestId, article.id)

  const comments = await prisma.comment.findMany({
    where: { articleId: article.id },
    orderBy: { createdAt: "desc" },
    include: {
      guest: {
        select: { token: true }
      }
    }
  })

  // Add isCreator flag to each comment
  const commentsWithCreatorFlag = comments.map(comment => ({
    ...comment,
    isCreator: !!process.env.ADMIN_GUEST_TOKEN && comment.guest.token === process.env.ADMIN_GUEST_TOKEN
  }))

  return NextResponse.json({ comments: commentsWithCreatorFlag, currentUsername, isAdminUser })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { articleSlug, content, parentId } = body ?? {}
    if (!articleSlug || !content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const { id: guestId } = await getOrCreateGuest()
    const article = await getOrCreateArticle(articleSlug, "DUBAI AS AN EMIRATE, NOT A COUNTRY! 😅")
    const anonUsername = await getOrCreateAnonUsername(guestId, article.id)

    const createData: any = {
      articleId: article.id,
      guestId,
      anonUsername,
      content: content.trim(),
    }
    if (typeof parentId === "number") createData.parentId = parentId

    const comment = await prisma.comment.create({
      data: createData,
    })

    // Send email notification (non-blocking)
    sendCommentNotification({
      commenterName: anonUsername,
      commentContent: content.trim(),
      articleTitle: article.title,
      isReply: !!parentId,
      parentCommenterName: parentId ? await getParentCommenterName(parentId) : undefined,
    }).catch(console.error)

    return NextResponse.json({ comment, username: anonUsername }, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


