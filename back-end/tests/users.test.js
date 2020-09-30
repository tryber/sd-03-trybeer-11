const frisby = require('frisby');
const { eraseDB, URL_BASE, closeDB } = require('./banco');
const Joi = frisby.Joi;


describe('users', () => {
  describe('Name of the group', () => {
    const nameError = 'pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais';
    const emailError = 'email tem que ser no formato <nome@dominio>';
    const passwordError = 'senha de pelo menos 6 digitos';
    const lessInfoError = 'Faltando informacoes';
    const emailDuplicatedError = 'email ja existe';
    
    beforeAll(async () => eraseDB());
    
    afterAll(closeDB);
    
    test('Is possible create an commom user', async () => {
      const user = {
        name: 'exampleGrande',
        email: 'example@example.com',
        password: '123456',
        role: false,
      };

      const resultObj = {
        id: Joi.number().required(),
        email: 'example@example.com',
        token: Joi.string().required(),
        name: 'exampleGrande',
        role: 'client',
      };

      await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 201)
        .expect('jsonTypes', resultObj);
      });

      test('Name should have at least 12 characters', async () => {
        const user = {
          name: 'abcdefghijk',
          email: 'example@example.com',
          password: 'abcdef',
          role: 'false',
        };

        await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 422)
        .expect('jsonTypes', { message: nameError });
      });

      test('Name should not have number', async () => {
        const user = {
          name: 'abcdefghijk123',
          email: 'example@example.com',
          password: 'abcdef',
          role: 'false',
        };

      await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 422)
        .expect('jsonTypes', { message: nameError });
      });

      test('Name should not have special characters', async () => {
        const user = {
          name: 'abcdefghijk@^',
          email: 'example@example.com',
          password: 'abcdef',
          role: 'false',
        };
        
        await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 422)
        .expect('json', { message: nameError });
      });
      
      test('email should have the <name>@<dominio> format', async () => {
        const user = {
          name: 'abcdefghijkl',
          email: 'example@',
          password: 'abcdef',
          role: 'false',
        };
        
        await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 422)
        .expect('json', { message: emailError });
      });
      
      test('email should not exists', async () => {
        const email = 'example@exa.com';
      const user = {
        name: 'abcdefghijkl',
        email,
        password: 'abcdef',
        role: 'false',
      };
      
      const user2 = {
        name: 'mnopqrstuvwxyz',
        email,
        password: 'abcdef',
        role: 'false',
      };
      
      await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 201);
      
      await frisby.post(`${URL_BASE}/user`, user2)
      .expect('status', 409)
      .expect('json', { message: 'E-mail already in database.' });
    });
  });

  describe('login', () => {
    const erroEmailOrPassword = 'email ou senha inválido'
    const email = 'example@example.com';
    const password = '123456';

    const user = {
      name: 'exampleGrande',
      email,
      password,
      role: false,
    };

    const resultObj = {
      id: Joi.number().required(),
      email: 'example@example.com',
      token: Joi.string().required(),
      name: 'exampleGrande',
      role: 'client',
    };

    beforeAll(() => eraseDB());

    afterAll(closeDB);

    test('should be possible to login with right return', async () => {
      await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 201)
        .expect('jsonTypes', resultObj);

      await frisby.post(`${URL_BASE}/user/login`, { email, password })
        .expect('status', 200)
        .expect('jsonTypes', resultObj);
    });

    test('should not be possible enter with wrong password', async () => {
      await frisby.post(`${URL_BASE}/user/login`, { email, password: '123451' })
        .expect('status', 401)
        .expect('jsonTypes', { message: erroEmailOrPassword });
    });

    test('should not be possible enter with an non existent email', async () => {
      await frisby.post(`${URL_BASE}/user/login`, { email: 'noaexiste@certeza.com', password })
        .expect('status', 401)
        .expect('jsonTypes', { message: erroEmailOrPassword });
    });
  });

  describe('get user', () => {
    let token;
    const email = 'example@example.com';
    const password = '123456';

    const user = {
      name: 'exampleGrande',
      email,
      password,
      role: false,
    };

    const resultObj = {
      id: Joi.number().required(),
      email: 'example@example.com',
      token: Joi.string().required(),
      name: 'exampleGrande',
      role: 'client',
    };

    beforeAll(async () => eraseDB());

    afterAll(closeDB);

    test('create user to test', async () => {
      const { json } = await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 201)
        .expect('jsonTypes', resultObj);

      token = json.token;
    });

    test('should be possible take the user with token', async () => {
      if (!token) throw new Error('No token');
      await frisby.get(`${URL_BASE}/user`, { headers: { authorization: token } })
    });
  });
});
