const express = require('express');
const app = express();
const { handleCustomErrors, handle500s } = require('./controllers/errors');
const { revealSecrets } = require('./controllers/secrets');

app.use(express.json());

app.get('/api/secrets', revealSecrets);

app.all('/*', (req, res, next) => {
  next({ status: 404, msg: 'Route not found' });
});

app.use(handleCustomErrors);
app.use(handle500s);

module.exports = app;
