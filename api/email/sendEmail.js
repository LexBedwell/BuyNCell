const nodemailer = require('nodemailer')

const sendConfirmationEmail = (orderId, orderEmail) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      })
      let mailOptions = {
        from: 'Celery Store',
        to: orderEmail,
        subject: `Thank you for your order from Celery Store!`,
        html: `<html><p>Hello ${orderEmail}!</p>
        <p>Thank you for your order from Celery Store!</p>
        <p>Your order ID number is: ${orderId}.</p>
        <p>Please visit <a href="https://celery-store.herokuapp.com">Celery Store</a> again for all your celery needs!</p>
        <p>**THIS IS A TEST EMAIL SO DON'T WORRY, YOU HAVEN'T BEEN CHARGED!**</p>  
        </html>`
      }
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log(`Order confirmation email sent to ${orderEmail} for order number ${orderId}.`);
        }
      })
}

module.exports = { sendConfirmationEmail }