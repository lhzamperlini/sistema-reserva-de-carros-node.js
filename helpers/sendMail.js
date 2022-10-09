const nodemailer = require('nodemailer')
const smtp = require('./config/smtp')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'aloalozap@gmail.com',
      pass: '',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  async function run() {
    const mailSent = await transporter.sendMail({
      text: "Texto do E-mail",
      subject: "Assunto do e-mail",
      from: "Luis Henrique",
      to: ["lhzamperlini@gmail.com"],
      html: `
      <html>
      <body>
        <strong>Conteúdo HTML</strong></br>Do E-mail
      </body>
    </html> 
      `,
    });
  
    console.log(mailSent);
  }
  
  run();