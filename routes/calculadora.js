var express = require('express');
var router = express.Router();

function calcularIMC(peso, altura) {
  if (!peso || !altura || altura === 0) return null;
  return (peso / (altura * altura)).toFixed(2);
}

function ehPrimo(numero) {
  if (numero <= 1) return false;
  for (let i = 2; i <= Math.sqrt(numero); i++) {
    if (numero % i === 0) return false;
  }
  return true;
}

router.post('/', function(req, res, next) {
  const peso = parseFloat(req.body.peso);
  const altura = parseFloat(req.body.altura);

  console.log('POST - Peso:', peso, 'Altura:', altura);

  const imc = calcularIMC(peso, altura);

  if (!imc) {
    return res.status(400).json({ erro: 'Parâmetros inválidos' });
  }

  res.json({ peso, altura, imc });
});

router.get('/primo', function(req, res) {
  const numeroStr = req.body.numero;

  if (!numeroStr) {
    return res.status(400).json({ erro: 'Parâmetro "numero" é obrigatório' });
  }

  const numero = parseInt(numeroStr, 10);

  if (isNaN(numero)) {
    return res.status(400).json({ erro: 'Número inválido' });
  }

  const resultado = ehPrimo(numero);

  res.json({ numero, primo: resultado });
});

module.exports = router;
