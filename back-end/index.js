const bodyParser = require('body-parser');
const express = require('express');
const { productsRouter } = require('./routes');

const app = express();


app.use(bodyParser.json());

app.use('/products', productsRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`));
