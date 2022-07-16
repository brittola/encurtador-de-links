const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const linkRoutes = require('./routes/linkRoutes');

const PORT = 3000;

mongoose.connect('mongodb://localhost/links');

let db = mongoose.connection;

db.on('open', () => { console.log('Banco carregado') });
db.once('error', () => { console.log('Erro ao carregar o banco') });

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', linkRoutes);

app.listen(PORT, () => { console.log('Server running on port: ' + PORT) });