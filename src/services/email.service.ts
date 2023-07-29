import nodemailer from 'nodemailer'
import config from '$/config'

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: 2525,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
})

export async function sendEmail(
  recipient: string,
  subject: string,
  message: string
) {
  const info = {
    from: `Devcamper <noreply@devcamper.io>`,
    to: recipient,
    subject,
    text: message,
  }

  try {
    const emailInfo = await transporter.sendMail(info)
    return emailInfo
  } catch (err) {
    return null
  }
}
