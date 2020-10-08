import products from './products';
import saleMockData from './saleMockData';
import sales from './mySalesMock';

const createUrl = (pathname) => `http://localhost:3001${pathname}`;

const rj = (message) => Promise.reject(new Error(message));
const rs = (data) => Promise.resolve({ data });

const get = async (url, { headers: { Authorization, authorization } = {} } = {}) => {
  const token = authorization || Authorization || null;

  if (!token) return rj({ message: 'No token o tests' });

  switch (url) {
    case createUrl('/products'): return rs({ products });
    // case createUrl('/user'): return rs({ email: 'user@email.com', name: 'Nome Qualquer' });
    case createUrl('/sales/1'): return rs(saleMockData);
    case createUrl('/sales'): return rs({ sales });
    default: return rj('no url on mock');
  }
};

const post = async (url, body, { headers: { Authorization, authorization } = {} } = {}) => {
  const token = authorization || Authorization || null;
  if (!token) {
    switch (url) {
      case createUrl('/user/login'): return rs({ ...body, token: 'jfaj3u0rud0cjawu0ur3q32r' });
      case createUrl('/user'): return rs({ ...body, token: 'ofcknoefoajfojaofjeif' });
      case createUrl('/sales'): return rs({ ...body, message: 'Venda processada!' });
      default: return rj('no url on mock');
    }
  }
  return 'post';
};

const put = async (url, body, { headers: { Authorization, authorization } = {} } = {}) => {
  const token = authorization || Authorization || null;

  if (!token) return rj('No token in the put tests');
  switch (url) {
    case createUrl('/user/profile'): return rs('Atualização concluída com sucesso');
    default: return rj('no url on put tests');
  }
};

const postAdmin = async (url, body) => {
  const role = 'administrator';
  switch (url) {
    case createUrl('/user/login'): return rs({ ...body, token: 'jfaj3u0rud0cjawu0ur3q', role });
    case createUrl('/user'): return rs({ body, token: 'ofcknoefoajfojaofjeif', role });
    default: return rj('no url on mock');
  }
};

export default {
  get,
  post,
  put,
  postAdmin,
  failRequest: rj,
};
