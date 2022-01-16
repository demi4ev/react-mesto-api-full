const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
// const cors = require('./middlewares/cors');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError'); // 404
const { validateSignUp, validateSignIn } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 7000 } = process.env;
const app = express();

require('dotenv').config();

const corsOptions = {
  origin: [
    'https://api.mesto.demichev.nomoredomains.rocks',
    'http://api.mesto.demichev.nomoredomains.rocks',
    'http://localhost:7000',
  ],
  credentials: true,
};

app.use(cookieParser());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());

app.use(requestLogger);

app.use(cors(corsOptions));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
