/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const videos = require('./src/videos');

const hostname = '127.0.0.1';
const port = '*';

const app = express();
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', videos);

/* eslint-disable no-unused-vars */
function notFoundHandler(req, res, next) {
  const title = 'Villa kom upp';
  const message = 'Efnið fyrir síðuna fannst ekki';
  res.status(404).render('error', { title, message });
}
app.use(notFoundHandler);

function errorHandler(err, req, res, next) {
  console.error(err);
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}
app.use(errorHandler);

app.locals.getTimeText = (n) => {
  const t = Math.round(new Date().getTime() / 1000) - n / 1000;
  let x;
  switch (true) {
    case t > 31535965:
      x = Math.round(t / 31535965);
      if (x % 10 === 1) {
        return `Fyrir ${x} ári síðan`;
      }
      return `Fyrir ${x} árum síðan`;
    case t > 2628000:
      x = Math.round(t / 2628000);
      if (x % 10 === 1) {
        return `Fyrir ${x} mánuði síðan`;
      }
      return `Fyrir ${x} mánuðum síðan`;
    case t > 604800:
      x = Math.round(t / 604800);
      if (x % 10 === 1) {
        return `Fyrir ${x} viku síðan`;
      }
      return `Fyrir ${x} vikum síðan`;
    case t > 86400:
      x = Math.round(t / 86400);
      if (x % 10 === 1) {
        return `Fyrir ${x} degi síðan`;
      }
      return `Fyrir ${x} dögum síðan`;
    case t > 3600:
      x = Math.round(t / 3600);
      if (x % 10 === 1) {
        return `Fyrir ${x} klukkutíma síðan`;
      }
      return `Fyrir ${x} klukkutímum síðan`;
    default:
      x = Math.round(t / 60);
      if (x === 0) {
        return 'Fyrir  minna en mínútu síðan';
      } if (x % 10 === 1) {
        return `Fyrir ${x} mínútu síðan`;
      }
      return `Fyrir ${x} minútum síðan`;
  }
};

app.locals.getRuntime = (n) => {
  if (n === 3600) {
    return '60:00';
  }
  return (new Date(n * 1000).toISOString()).substring(15, 19);
};

app.listen(port, hostname, () => {
  console.info(`Server runinng at http://${hostname}:${port}/`);
});
