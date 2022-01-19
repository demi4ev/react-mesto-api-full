const allowedCors = [
  'https://mesto.demichev.nomoredomains.rocks',
  'http://mesto.demichev.nomoredomains.rocks',
  'https://api.mesto.demichev.nomoredomains.rocks',
  'http://api.mesto.demichev.nomoredomains.rocks',
  'https://62.84.124.154',
  'http://62.84.124.154',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими  заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  next();
};
