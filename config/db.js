const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));
