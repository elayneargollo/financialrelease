const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)
app.use('/api/transaction', routes)

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

const { DB_CONNECTION } = process.env;

console.log('Iniciando conexão ao MongoDB...');

mongoose.connect(
  "mongodb+srv://dbBootcamp:dbBootcamp@cluster0.loteo.mongodb.net/DesafioFinalBootcampFullSatack?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  console.log('Conectado ao MongoDB');

  /**
   * Definição de porta e
   * inicialização do app
   */
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
