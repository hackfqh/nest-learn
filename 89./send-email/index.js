const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    user: "2609212250@qq.com",
    pass: "ydyajfvgjglcechg",
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"zhang" <2609212250@qq.com>',
    to: "1075320989@qq.com",
    subject: "Hello 111",
    text: "测试测试",
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
