const POST_login = {
  recebe: {
    email: "<name@dominio>",
    password: "<string 6 len>"
  },
  responde: { // user sem senha
    id,
    email,
    name,
    token,
    role,
  },
  erros: {
    "senha / email invalido": {
      message: "email ou senha inválido",
    },    
  },
};

const POST_register = {
  recebe: {
    name: ">=12 len, no numbers or special",
    email: "<name@dominio>",
    password: "<string 6 len>",
    role: "<bool>",
  },
  retorna: { // user sem senha
    id,
    email,
    name,
    token,
    role,
  },
  erros: {
    "informacao incompleta": {
      message: "Faltando informacoes",
    },
    "email invalido": {
      message: "email tem que ser no formato <nome@dominio>",
    },
    "senha invalida": {
      message: "senha de pelo menos 6 digitos",
    },
    "nome invalido": {
      message: "pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais",
    },
    "email ja existente": {
      message: "E-mail already in database.",
    },
    "error interno de token": {
      message: "Não foi possível gerar a autenticacao",
    }
  }
};

const PUT_profile = {
  recebe: {
    token: "<token>",
    name: ">=12 len, no numbers or special",
  },
  retorna: { // user sem senha
    id,
    email,
    name,
    role,
  },
  erros: {
    "nome invalido": {
      message: "pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais",
    },
    "token invalido": {
      message: "autenticacao invalida",
    }
  }
};

const GET_profile = {
  recebe: {
    token,
  },
  retorna: { // user sem senha
    id,
    email,
    name,
    role,
  },
  erros: {
    "token invalido": {
      message: "autenticacao invalido",
    }
  }
};

const GET_products = {
  retorna: {
    products: [
      {
        id,
        name,
        price,
        url_image,
      }
    ],
  }  
};


// Enviado pelo front ao back para ser salvo no banco de dados de

// {
//   "userId": 1,
//   "totalPrice": 240.53,
//   "deliveryAddress": "Rua Doutor Mario Pires",
//   "deliveryNumber": "91",
//   "saleDate": "2020-09-28T19:45:44+00:00",
//   "products": [
//       {
//           "id": 1,
//           "sellingQnt": 3
//       },
//       {
//           "id": 2,
//           "sellingQnt": 1
//       }
//   ]

// }