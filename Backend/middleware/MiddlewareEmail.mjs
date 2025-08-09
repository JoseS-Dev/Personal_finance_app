import { createTransport } from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

// Crear el transporte para enviar el mensaje al usuario 
const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_EMAIL
    }
})

// Coloco el middleware de Gmail 
export const middlewareEmail = (req,res,next) => {
    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email_user,
        subject: 'Welcome to GIGI',
        text: 'Tu registro al sistema ha sido existoso',
        html: `<p>Hola , Tu registro ${req.body.name_user} ha sido existoso </p>
               <p>Gracias por contar con GIGI para mantener su control de ingreso y gastos!</p>`
    }

    transport.sendMail(emailOptions, (error,info) =>{
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        next(); // Procede a procesar el siguiente middleware
    })
}