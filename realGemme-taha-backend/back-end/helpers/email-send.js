const nodemailer = require("nodemailer")
//create a transporter to send emails
const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth: {
            user:"" ,
            pass: "",
    }
}
)

async function sendmail(email,verificationtoken){
    console.log("email sending")
    const emailoption = {
        from : '',
        to : email,
        subject : 'verify your email ',
        text : `Please click on the link to verify your email: http://localhost:8080/verify/${verificationtoken}`    
    }
    try {
        await transporter.sendMail(emailoption);
        console.log("email sent metheni");
    }
    catch (error){
        console.error('Error sending verification email:', error);
    }
}

module.exports = sendmail