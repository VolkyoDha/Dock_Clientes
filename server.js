const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://admin:admin@data3apps.owzveqi.mongodb.net/elysium?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    telefono: String
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

app.post('/clientes', (req, res) => {
    const cliente = new Cliente(req.body);
    cliente.save().then(() => res.status(201).send(cliente));
});

app.get('/clientes', (req, res) => {
    Cliente.find().then(clientes => res.send(clientes));
});

app.listen(3001, () => console.log('App1 listening on port 3001'));
