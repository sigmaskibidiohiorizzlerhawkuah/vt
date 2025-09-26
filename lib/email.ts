import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendCommentNotification({
  commenterName,
  commentContent,
  articleTitle,
  isReply,
  parentCommenterName,
}: {
  commenterName: string
  commentContent: string
  articleTitle: string
  isReply: boolean
  parentCommenterName?: string
}) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    console.log("Email notifications not configured (missing RESEND_API_KEY or ADMIN_EMAIL)")
    return
  }

  try {
    const subject = isReply 
      ? `New reply from ${commenterName} on "${articleTitle}"`
      : `New comment from ${commenterName} on "${articleTitle}"`

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New ${isReply ? 'Reply' : 'Comment'} on Vocabulary Today</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Article:</strong> ${articleTitle}</p>
          <p><strong>Commenter:</strong> ${commenterName}</p>
          ${isReply && parentCommenterName ? `<p><strong>Replying to:</strong> ${parentCommenterName}</p>` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-top: 0;">Comment:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${commentContent}</p>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This is an automated notification from your Vocabulary Today commenting system.
        </p>
      </div>
    `

    await resend.emails.send({
      from: process.env.RESEND_FROM || "onboarding@resend.dev", // use sandbox sender by default
      to: [process.env.ADMIN_EMAIL],
      subject,
      html: htmlContent,
    })

    console.log(`Email notification sent for comment from ${commenterName}`)
  } catch (error) {
    console.error("Failed to send email notification:", error)
  }
}
