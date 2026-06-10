import nodemailer from 'nodemailer'

const getTransporter = () => {
  if (!process.env.EMAIL_HOST) {
    // Dev fallback: log to console when no SMTP is configured
    return {
      sendMail: async (opts) => {
        console.log('\n📧 [EMAIL - not sent, no SMTP configured]')
        console.log('To:', opts.to)
        console.log('Subject:', opts.subject)
        console.log('Body:', opts.text || opts.html)
        console.log('---\n')
        return { messageId: 'dev-stub' }
      },
    }
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  })
}

const send = async ({ to, subject, html, text }) => {
  const transporter = getTransporter()
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  })
}

export const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/auth/verify-email?token=${token}`
  await send({
    to: email,
    subject: 'Verify your TapToSee email',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
        <h2>Welcome to TapToSee! 🎉</h2>
        <p>Click the button below to verify your email address.</p>
        <a href="${url}" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
          Verify Email
        </a>
        <p style="color:#888;font-size:13px;margin-top:20px">This link expires in 24 hours. If you didn't sign up, ignore this email.</p>
      </div>
    `,
    text: `Verify your TapToSee email: ${url}`,
  })
}

export const sendPasswordResetEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`
  await send({
    to: email,
    subject: 'Reset your TapToSee password',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
        <h2>Password Reset Request</h2>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <a href="${url}" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
          Reset Password
        </a>
        <p style="color:#888;font-size:13px;margin-top:20px">If you didn't request this, ignore this email — your password won't change.</p>
      </div>
    `,
    text: `Reset your TapToSee password: ${url}`,
  })
}
