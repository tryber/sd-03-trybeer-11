const frisby = require('frisby');
const { eraseDB, URL_BASE, closeDB } = require('./banco');
const Joi = frisby.Joi;


describe('users', () => {
  describe('Name of the group', () => {
    const nameError = 'pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais';
    const emailError = 'email tem que ser no formato <nome@dominio>';
    const passwordError = 'senha de pelo menos 6 digitos';
    const lessInfoError = 'Faltando informacoes';
    const emailDuplicatedError = 'E-mail already in database.';
    
    beforeAll(async () => eraseDB());
    
    afterAll(closeDB);
    
    const user = {
      name: 'exampleGrande',
      email: 'example@example.com',
      password: '123456',
      role: false,
    }

    const resultObj = {
      id: Joi.number().required(),
      email: 'example@example.com',
      token: Joi.string().required(),
      name: 'exampleGrande',
      role: 'client',
    };

    test('Is possible create an commom user', async () => {
      await frisby.post(`${URL_BASE}/user`, user)
        .expect('status', 201)
        .expect('jsonTypes', resultObj);
      });

      test('Name should have at least 12 characters', async () => {
        const name = 'abcdefghijk';

        await frisby.post(`${URL_BASE}/user`, { ...user, name })
          .expect('status', 422)
          .expect('jsonTypes', { message: nameError });
      });

      test('Name should not have number', async () => {
        const password = 'abcdef';

        await frisby.post(`${URL_BASE}/user`, { ...user, password })
          .expect('status', 422)
          .expect('jsonTypes', { message: nameError });
      });

      test('Name should not have special characters', async () => {
        const password = 'abcdef';

        await frisby.post(`${URL_BASE}/user`,  { ...user, password })
        .expect('status', 422)
        .expect('json', { message: nameError });
      });
      
      test('email should have the <name>@<dominio> format', async () => {
        const email = 'example@';
        
        await frisby.post(`${URL_BASE}/user`, { ...user, email })
        .expect('status', 422)
        .expect('json', { message: emailError });
      });
      
      test('email should not exists', async () => {
        const email = 'example@exa.com';
        
        const user2 = {
          name: 'mnopqrstuvwxyz',
          email,
          password: 'abcdef',
          role: 'false',
        };
        
        await frisby.post(`${URL_BASE}/user`, { ...user, email })
          .expect('status', 201);
        
        await frisby.post(`${URL_BASE}/user`, user2)
          .expect('status', 409)
          .expect('json', { message: emailDuplicatedError });
      });

      test('password wrong should throw error', async () => {
        const password = '12345';
        await frisby.post(`${URL_BASE}/user`, { ...user, password })
          .expect('status', 422)
          .expect('json', { message: passwordError });
      });

      test('error if have no password info', async () => {
        const { password, ...incompletUser } = user;

        await frisby.post(`${URL_BASE}/user`, incompletUser)
          .expect('status', 422)
          .expect('json', { message: lessInfoError });
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
    const { token: tokenSchema, ...resultNoToken } = resultObj;

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
        .expect('status', 200)
        .expect('jsonTypes', resultNoToken);
    });

    test('should give back an message if token is invalid', async () => {
      if (!token) throw new Error('No token');
      await frisby.get(`${URL_BASE}/user`)
        .expect('status', 401)
        .expect('json', { message: 'autenticacao invalido' });
    });

    test('should give back an message if token no token', async () => {
      if (!token) throw new Error('No token');
      await frisby.get(`${URL_BASE}/user`)
        .expect('status', 401)
        .expect('json', { message: 'autenticacao invalido' });
    });

    test('should give back an message if token no token', async () => {
      if (!token) throw new Error('No token');
      await frisby.get(`${URL_BASE}/user`, { headers: { authorization: 'E' + token.slice(1) }})
        .expect('status', 401)
        .expect('json', { message: 'autenticacao invalido' });
    });
  });
});
