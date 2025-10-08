import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const GUEST_COOKIE = "vt_guest_token"

export async function POST(req: Request) {
  const { token } = await req.json().catch(() => ({ token: undefined }))
  if (!token || !process.env.ADMIN_GUEST_TOKEN || token !== process.env.ADMIN_GUEST_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // set the admin token as the guest cookie for this browser session
  const cookieStore = cookies()
  cookieStore.set(GUEST_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })

  return NextResponse.json({ ok: true })
}


