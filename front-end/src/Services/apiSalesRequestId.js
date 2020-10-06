import axios from 'axios';

const URL_BASE = 'http://localhost:3001';

const makeHeaders = () => {
  const token = localStorage.getItem('token');
  return { authorization: token };
};

const takeSalesId = async (id) => {
  console.log(id)
  const headers = makeHeaders();
  return axios.get(`${URL_BASE}/sales/${id}`, { headers })
    .then(({ data }) => (data || Promise.reject(new Error('No connection'))))
    .catch((err) => Promise.reject(
      console.log(err),
      new Error(err.response ? err.response.data.message : 'No connection'),
    ));
};

export default takeSalesId;
