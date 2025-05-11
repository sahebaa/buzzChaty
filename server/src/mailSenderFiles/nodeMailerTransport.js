import { compareSync } from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

console.log("here is your email user",process.env.EMAIL_USER);
const sendMail=async(reciver,verificationLink)=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or use SMTP provider like Mailgun, SendGrid, etc.
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS  
        }
      });
      
      const mailOptions = {
          from: '"BUZZCHATY',
          to: reciver,
          subject: 'Regarding to verfiy on our application',
           html: `<p>Click the link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`
        };

      try{
        const res=await transporter.sendMail(mailOptions);
        console.log("here is your res form nodemailer",res)
        return res;
      }catch(err){
        return err
      }
}
  
 
export default sendMail;