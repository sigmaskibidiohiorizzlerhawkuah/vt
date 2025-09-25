import { NextResponse } from "next/server"
import { sendCommentNotification } from "@/lib/email"

export async function GET() {
  try {
    await sendCommentNotification({
      commenterName: "TestUser",
      commentContent: "This is a test comment to verify email notifications are working!",
      articleTitle: "DUBAI AS AN EMIRATE, NOT A COUNTRY! 😅",
      isReply: false,
    })
    
    return NextResponse.json({ 
      success: true, 
      message: "Test email sent! Check your inbox." 
    })
  } catch (error) {
    console.error("Test email failed:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
