const app = require('./app');

const PORT = 3001;

module.exports = app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`));
