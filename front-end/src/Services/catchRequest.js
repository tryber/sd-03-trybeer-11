export const NO_CONNECTIO = 'Conexao com o servidor não encontrada';

export const catchRequestErr = (err) => {
  const { data } = err.response || {};
  const { message = NO_CONNECTIO } = data || {};
  return Promise.reject(message);
};
