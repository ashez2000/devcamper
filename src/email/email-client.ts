import nodemailer from 'nodemailer'
import { smtpConfig } from '../config'

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  auth: {
    user: smtpConfig.username,
    pass: smtpConfig.password,
  },
})

export type SendMailInput = {
  from: string
  to: string
  subject: string
  text: string
}

export async function sendEmail(input: SendMailInput) {
  const { from, to, subject, text } = input
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
  })
  return info
}
