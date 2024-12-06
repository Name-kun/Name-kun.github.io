const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// cors!!!!!
app.use(cors());

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ratelimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 5, // 最大リクエスト数
  message: {
    status: 429,
    error: 'リクエストが多すぎます。15分後に再試行してください。',
  },
});

app.use(limiter);

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinquiry.childays@gmail.com',
    pass: 'aqcvqyukmvumlyzu',
  },
});

// フォーム送信エンドポイント
app.post('/send', (req, res) => {
  console.log(req.body);

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('すべてのフィールドを入力してください。');
  }

  const mailOptions = {
    from: email,
    to: 'namekuji.kouya0309@gmail.com',
    subject: `お問い合わせ: ${subject}`,
    text: `名前: ${name}\nメールアドレス: ${email}\n\n内容:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('メール送信エラー:', error);
      return res.status(500).send('メール送信に失敗しました。');
    } else {
      console.log('メール送信成功:', info.response);
      res.send('お問い合わせありがとうございます！');
    }
  });
});

// サーバー起動
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
