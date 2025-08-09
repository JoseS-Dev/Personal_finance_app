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