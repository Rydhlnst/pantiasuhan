type EmailOptions = {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, from = process.env.SMTP_FROM } = options

  try {
    if (process.env.SMTP_HOST && process.env.SMTP_PASS) {
      const nodemailer = await import('nodemailer')

      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from,
        to,
        subject,
        html,
      })

      return true
    }

    console.log(`[Email] ${subject} to ${to}`)
    console.log(html)
    return true
  } catch (error) {
    console.error('[Email Error]', error)
    return false
  }
}

export function buildPasswordResetEmail(
  resetURL: string,
  siteName: string = 'Beres CMS'
): { subject: string; html: string } {
  return {
    subject: `Reset your ${siteName} password`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
          .logo { font-size: 24px; font-weight: bold; color: #1e293b; }
          .content { padding: 30px 0; }
          .button { display: inline-block; background-color: #1e293b; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; }
          .button:hover { background-color: #334155; }
          .footer { padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
          .link { color: #666; word-break: break-all; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Beres CMS</div>
          </div>
          <div class="content">
            <h2>Reset your password</h2>
            <p>You requested a password reset. Click the button below to create a new password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetURL}" class="button">Reset Password</a>
            </p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>This email was sent from ${siteName}.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }
}

export function buildVerificationEmail(
  verificationURL: string,
  siteName: string = 'Beres CMS'
): { subject: string; html: string } {
  return {
    subject: `Verify your ${siteName} account`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
          .logo { font-size: 24px; font-weight: bold; color: #1e293b; }
          .content { padding: 30px 0; }
          .button { display: inline-block; background-color: #1e293b; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; }
          .button:hover { background-color: #334155; }
          .footer { padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Beres CMS</div>
          </div>
          <div class="content">
            <h2>Verify your email</h2>
            <p>Thanks for signing up! Click the button below to verify your email address:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${verificationURL}" class="button">Verify Email</a>
            </p>
            <p>This link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>This email was sent from ${siteName}.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }
}
