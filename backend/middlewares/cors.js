const allowedCors = [
  'https://mesto.demichev.nomoredomains.rocks',
  'http://mesto.demichev.nomoredomains.rocks',
  'https://api.mesto.demichev.nomoredomains.rocks',
  'http://api.mesto.demichev.nomoredomains.rocks',
  'https://62.84.124.154',
  'http://62.84.124.154',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Origin', origin);
    res.status(200).send();
    return;
  }
  next();
};
