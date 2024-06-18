require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
require('../config/db');

const app = express();
const port = 3000;

// Configuring pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: '123Test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Index
const mainRouter = require('../routes/index');
app.use('/', mainRouter);

// Static Files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
