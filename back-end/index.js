const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { productsRouter, usersRouter,salesRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/products', productsRouter);
app.use('/user', usersRouter);
app.use('/sales', salesRouter);

app.all('*', (_req, res) => res.status(404).json({ message: 'page not found' }));

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`));
