const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { productsRouter, usersRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');

const app = express();

app.use((req, _res, next) => { console.log(req.path); next(); });
app.use(bodyParser.json());
app.use(cors());

app.use('/products', productsRouter);
app.use('/user', usersRouter);

app.all('*', (_req, res) => res.status(404).json({ message: 'page not found' }));

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`));
