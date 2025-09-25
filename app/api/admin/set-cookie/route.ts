import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const GUEST_COOKIE = "vt_guest_token"
const ONE_YEAR = 60 * 60 * 24 * 365

export async function GET() {
  try {
    const adminToken = process.env.ADMIN_GUEST_TOKEN
    if (!adminToken) {
      return NextResponse.json({ error: "ADMIN_GUEST_TOKEN not configured" }, { status: 500 })
    }

    const cookieStore = cookies()
    cookieStore.set(GUEST_COOKIE, adminToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_YEAR,
      path: "/",
    })

    return NextResponse.json({ 
      success: true, 
      message: "Admin cookie set. You are now the Creator. Refresh the page to see the badge." 
    })
  } catch (error) {
    console.error("Error setting admin cookie:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
