const sgMail = require('@sendgrid/mail')

const sendgridApiKey = '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'

sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail= (email, name)=>{
    sgMail.send({
        to: email,
        from: 'hima.abousalem@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail =  (email, name) =>{
    sgMail.send({
        to: email,
        from:'hima.abousalem@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}