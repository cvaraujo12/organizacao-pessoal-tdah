import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Organizador TDAH <noreply@organizadortdah.com>',
      ...options,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

// Verifica a conexão com o servidor de email
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Erro ao verificar conexão com servidor de email:', error);
    return false;
  }
}

// Template para email de boas-vindas
export function getWelcomeEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Bem-vindo ao Organizador TDAH</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 4px;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bem-vindo ao Organizador TDAH!</h1>
          </div>
          <div class="content">
            <p>Olá ${name},</p>
            <p>Estamos muito felizes em ter você conosco! O Organizador TDAH foi desenvolvido especialmente para ajudar pessoas com TDAH a manterem suas vidas mais organizadas e produtivas.</p>
            <p>Aqui estão algumas dicas para começar:</p>
            <ul>
              <li>Configure suas rotinas diárias</li>
              <li>Defina suas metas e prioridades</li>
              <li>Personalize as notificações</li>
              <li>Explore as ferramentas de organização</li>
            </ul>
            <p>Se precisar de ajuda, não hesite em nos contatar.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/getting-started" class="button">
              Começar
            </a>
          </div>
          <div class="footer">
            <p>Esta é uma mensagem automática do Organizador TDAH.</p>
            <p>Por favor, não responda este email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Template para email de recuperação de senha
export function getPasswordResetEmailTemplate(name: string, resetToken: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Recuperação de Senha</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 4px;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Recuperação de Senha</h1>
          </div>
          <div class="content">
            <p>Olá ${name},</p>
            <p>Recebemos uma solicitação para redefinir sua senha. Se você não fez esta solicitação, por favor ignore este email.</p>
            <p>Para redefinir sua senha, clique no botão abaixo:</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}" class="button">
              Redefinir Senha
            </a>
            <p>Este link expirará em 1 hora.</p>
          </div>
          <div class="footer">
            <p>Esta é uma mensagem automática do Organizador TDAH.</p>
            <p>Por favor, não responda este email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
} 