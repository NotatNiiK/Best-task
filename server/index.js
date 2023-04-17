const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');

// Встановлення парсера JSON
app.use(bodyParser.json());

// Конфігурація транспорту для відправки листів
const transporter = nodemailer.createTransport({
  // налаштування транспорту
});

// Опис маршруту для відправки листа
app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  // Налаштування деталей листа
  const mailOptions = {
    from: 'pizzaordertesttask@gmail.com', 
    to: email, // Email отримувача
    subject: 'Нове повідомлення', // Тема листа
    text: message // Тіло листа
  };

  // Відправка листа
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Помилка при відправці листа');
    } else {
      console.log('Лист успішно відправлено: ' + info.response);
      res.status(200).send('Лист успішно відправлено');
    }
  });
});

// Запуск сервера на порті 3000
app.listen(3000, () => {
  console.log('Сервер запущено на порту 3000');
});