const convertBRL = (price) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
// https://pt.stackoverflow.com/questions/181922/formatar-moeda-brasileira-em-javascript/186798

export default convertBRL;
