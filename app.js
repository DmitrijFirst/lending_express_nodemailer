const nodemailer = require('nodemailer');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
/*
app.get('/contact', (req,res) => {
    res.sendFile(path.join(__dirname, './public/contact.html'))
})
*/
  // POST маршрут из контактной формы
  app.post('/contact', (req, res) => {

    // Создание SMTP-сервера
    const smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'testnodemailer5@gmail.com',
        pass: 'Nodemailer5'
      }
    }) 
  
    // Укажите, как будет выглядеть электронная почта
    const mailOpts = {
      from: 'Your sender info here', 
      to: 'testnodemailer5@gmail.com',
      subject: `Новый заказ от клиента ${req.body.name}`,
      text: `${req.body.name} (${req.body.email}) ${req.body.phone}  
      says: ${req.body.message}`
    }
  
    // Отправляем электронное письмо
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        res.render('contact-failure') // Попытка отправить электронное письмо
      }
      else {
        res.redirect('/') // Показать страницу, указывающую на успех
      }
    })
  })

  
app.listen(3000, () => {
    console.log('server start port 3000')
})
