const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'controle_ponto'
});

const allowedOrigins = ["http://localhost:3000", "http://localhost:9000"]; 
    app.use(
        cors({
            origin: allowedOrigins,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        })
    );

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para obter todos os funcionários
app.get('/funcionarios', (req, res) => {
  connection.query('SELECT * FROM funcionarios', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar funcionários');
    } else {
      res.json(results);
    }
  });
});

// Rota para registrar o ponto
app.post('/registrar-ponto', (req, res) => {
  const { funcionario_id, tipo_registro } = req.body;

  if (!funcionario_id || !tipo_registro) {
    res.status(400).send('Parâmetros inválidos');
    return;
  }

  const data_hora = new Date().toISOString().slice(0, 19).replace('T', ' ');

  connection.query(
    'INSERT INTO registros_ponto (funcionario_id, data_hora, tipo_registro) VALUES (?, ?, ?)',
    [funcionario_id, data_hora, tipo_registro],
    (err) => {
      if (err) {
        res.status(500).send('Erro ao registrar ponto');
      } else {
        res.send('Ponto registrado com sucesso');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
