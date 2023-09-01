import nodemailer from 'nodemailer'
import { envLoader } from '@/utils/env-loader'

const SMPT_HOST = envLoader('SMTP_HOST')
const SMPT_USERNAME = envLoader('SMTP_USERNAME')
const SMPT_PASSWORD = envLoader('SMTP_PASSWORD')

const transporter = nodemailer.createTransport({
  host: SMPT_HOST,
  port: 2525,
  auth: {
    user: SMPT_USERNAME,
    pass: SMPT_PASSWORD,
  },
})

export type EmailData = {
  recipient: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData) {
  let { recipient, message, subject } = data

  try {
    let emailInfo = await transporter.sendMail({
      from: `Devcamper <noreply@devcamper.io>`,
      to: recipient,
      subject,
      text: message,
    })

    return emailInfo
  } catch (err) {
    return null
  }
}
