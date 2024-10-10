import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; // Usar import ao invés de require
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env

export async function POST(req) {
    // Acessar o corpo da solicitação
    const data = await req.formData(); // Note que aqui usamos 'formData()'

    // Acesso aos dados do formulário
    const name = data.get("name"); // Obtem o nome do usuário
    const email = data.get("email"); // Obtem o email do usuário
    const message = data.get("message"); // Obtem a mensagem do usuário

   

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.NEXT_EMAIL, // Usar a variável de ambiente para o email
            pass: process.env.PASS // Usar a variável de ambiente para a senha
        }
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contato do Site</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            p {
                line-height: 1.6;
                color: #555;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.8em;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Contato do Site</h2>
            <p><strong>Email:</strong> ${name}</p>
            <p><strong>Mensagem:</strong><br>${message}</p>
            <div class="footer">
                <p>Este e-mail foi enviado através do sistema de contato do seu site.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        const mail = await transporter.sendMail({
            from: process.env.NEXT_EMAIL, // Usar o email definido nas variáveis de ambiente
            to: "rafael.zachesky@gmail.com", // Destinatário do e-mail
            subject: "Contato do site",
            html: htmlContent, // Usando o template HTML
            headers: {
                'X-Gmail-Labels': 'IMPORTANT', // Marca o e-mail como importante
                "x-priority": "1",
                'Importance': 'High', // Também marcar como de alta importância
            }
        });
        return NextResponse.json({ message: "Success: email was sent" });
    } catch (e) {
        console.error("Error sending email:", e);
        return NextResponse.json({ message: "Error: email could not be sent" }, { status: 500 });
    }
}
