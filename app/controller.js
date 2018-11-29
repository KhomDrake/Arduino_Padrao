const express = require('express');
const { ArduinoData } = require('./serial');
const router = express.Router();
const db = require('./db').Arduino;

setInterval(() => {
    // aqui faz o comando para inserir no banco;
    let temperatura = ArduinoData.List1[ArduinoData.List1.length - 1];
    let umidade = ArduinoData.List2[ArduinoData.List2.length - 1];
    db.insertMeasurement({temp: temperatura, umi: umidade})
}, 1000);

router.get('/', (request, response, next) => {
    db.getAllMeasurement()
        .then(results => response.json(results))
        .catch(err => response.json(err));
});

module.exports = router;
