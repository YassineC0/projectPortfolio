import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, date } = req.body

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'carlie4carliejeff50@gmail.com',
      subject: 'New Appointment Booking',
      text: `
        New appointment booking:
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Preferred Date: ${date}
      `,
    }

    try {
      // Send email
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Appointment booked successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ message: 'Failed to book appointment' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}