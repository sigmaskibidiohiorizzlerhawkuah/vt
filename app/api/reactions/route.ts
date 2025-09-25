import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

const GUEST_COOKIE = "vt_guest_token"
const ONE_YEAR = 60 * 60 * 24 * 365

async function getOrCreateGuestId(): Promise<number> {
  const cookieStore = cookies()
  let token = cookieStore.get(GUEST_COOKIE)?.value
  if (!token) {
    token = randomUUID()
    cookieStore.set(GUEST_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_YEAR,
      path: "/",
    })
  }
  let guest = await prisma.guest.findUnique({ where: { token } })
  if (!guest) guest = await prisma.guest.create({ data: { token } })
  return guest.id
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { commentId, emoji } = body ?? {}
    if (!commentId || typeof emoji !== "string" || !emoji) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    const guestId = await getOrCreateGuestId()

    // toggle reaction
    const existing = await prisma.commentReaction.findUnique({
      where: { commentId_guestId_emoji: { commentId, guestId, emoji } },
    })
    if (existing) {
      await prisma.commentReaction.delete({ where: { id: existing.id } })
      return NextResponse.json({ toggled: "removed" })
    }

    await prisma.commentReaction.create({ data: { commentId, guestId, emoji } })
    return NextResponse.json({ toggled: "added" })
  } catch (error) {
    console.error("Error toggling reaction:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const commentIds = searchParams.getAll("commentId").map((v) => Number(v)).filter((n) => !isNaN(n))
  if (commentIds.length === 0) return NextResponse.json({ reactions: [] })

  const rows = await prisma.commentReaction.groupBy({
    by: ["commentId", "emoji"],
    where: { commentId: { in: commentIds } },
    _count: { _all: true },
  })

  return NextResponse.json({
    reactions: rows.map((r) => ({ commentId: r.commentId, emoji: r.emoji, count: r._count._all })),
  })
}


