"use server"

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validation
  if (!name?.trim()) {
    return {
      success: false,
      message: "Name is required.",
    }
  }

  if (!email?.trim() || !emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  if (!message?.trim()) {
    return {
      success: false,
      message: "Message is required.",
    }
  }

  if (message.length > 5000) {
    return {
      success: false,
      message: "Message is too long. Please keep it under 5000 characters.",
    }
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'kabhavake@gmail.com',
      subject: `New Portfolio Contact from ${name.trim()}`,
      replyTo: email.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">
            New Portfolio Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name.trim()}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email.trim()}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 4px; white-space: pre-wrap;">
              ${message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
          
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    })

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error sending contact email:", error)
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return {
          success: false,
          message: "Email service configuration error. Please try again later.",
        }
      }
    }
    
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again.",
    }
  }
}