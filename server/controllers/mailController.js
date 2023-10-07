const nodemailer  = require('nodemailer');
const User = require('../models/User')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "gagikharutyunyan189@gmail.com",
                pass: "gohzpazbtbbdmrzp"
            }
        })
    }

    async sendActivationMail(to, message) {
        await this.transporter.sendMail({
            from: "gagikharutyunyan189@gmail.com",
            to,
            subject: 'qef',
            text: 'asdasd',
            html:
                `
                    <div>
                        <h1>${message}</h1>
                    </div>
                `
        })
    }
}

module.exports = new MailService()



