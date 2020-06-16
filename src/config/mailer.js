import nodemailer from "nodemailer";

const adminEmail = "tuankhoi2206@gmail.com";
const adminPassword = "2206@Khoivu";
const emailHost = "smtp.gmail.com";
const emailPort = 587;

let sendMail = (to, subject, htmlContent) => {
    let transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    });

    let option = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transporter.sendMail(option);
};

module.exports = sendMail;
