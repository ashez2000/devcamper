import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
})

export async function sendEmail({ email = '', subject = '', message = '' }) {
    const info = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: email,
        subject,
        text: message,
    }

    try {
        const res = await transporter.sendMail(info)
        console.log('email: msg sent', res.messageId)
    } catch (err) {
        console.log('email: msg failed')
        console.error(err)
        throw err
    }
}
