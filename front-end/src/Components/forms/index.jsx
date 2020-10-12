import React from "react";
import Logo from "../../utils/logo.svg";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

const NAME_REGEX = /^[a-zA-Z ]{12}[a-zA-Z ]*$/;

const Forms = ({ register }) => {
  const [errorLogin, setErrorLogin] = React.useState('');
  const [nameIsEmpty, setNameIsEmpty] = React.useState(register);
  const [emailIsEmpty, setEmailIsEmpty] = React.useState(true);
  const [passwordIsEmpty, setPasswordIsEmpty] = React.useState(true);

  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    return axios
      .post("http://localhost:3001/user/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((res) => {
        if (!res) return setErrorLogin('No connection');
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('token', res.data.token);

        return history.push(res.data.role === 'administrator' ? '/admin/orders' : "/products");
      })
      .catch(({ response }) => {
        if (!response) return setErrorLogin('No connection');
        return setErrorLogin(response.data.message);
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    return axios
      .post("http://localhost:3001/user", {
        email: event.target.email.value,
        password: event.target.password.value,
        name: event.target.nome.value,
        role: event.target.role.checked,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        return history.push(res.data.role === 'administrator' ? '/admin/orders' : "/products");
      })
      .catch(({ response }) => {
        if (!response) return setErrorLogin('No connection');
        return setErrorLogin(response.data.message);
      });
  };

  return (
    <div className="container">
      <img className="logo" src={Logo} alt="logo" />
      <form
        aria-label={register ? "register" : "login"}
        onSubmit={(event) => register ? handleRegister(event) : handleLogin(event)}
      >
        {register && (
          <label htmlFor="name" className="nome">
            <span>Nome:</span>
            <input
              id="name"
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              data-testid="signup-name"
              onChange={({ target }) => setNameIsEmpty(!NAME_REGEX.test(target.value))}
            />
          </label>
        )}
        <label htmlFor="email" className="email">
          <span>Email:</span>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            data-testid={register ? "signup-email" : "email-input"}
            onChange={({ target }) => setEmailIsEmpty(!EMAIL_REGEX.test(target.value))}
          />
        </label>

        <label htmlFor="password" className="senha">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid={register ? "signup-password" : "password-input"}
            onChange={({ target }) => setPasswordIsEmpty(target.value.length < 6)}
          />
        </label>

        {register && (
          <label className="queroVender">
            <input
              type="checkbox"
              name="role"
              data-testid="signup-seller"
            />
            <p>Quero Vender!</p>
          </label>
        )}

        {!register && (
          <div className="register">
            <p>Ainda não tenho conta</p>
            <Link to="/register" data-testid="no-account-btn">
              Registrar-se
            </Link>
          </div>
        )}

        <div className="button">
          <button
            className="button-login"
            disabled={nameIsEmpty || emailIsEmpty || passwordIsEmpty}
            data-testid={register ? "signup-btn" : "signin-btn"}
            type="submit"
          >
            {register ? 'Cadastrar' : 'ENTRAR'}
          </button>
        </div>
        {errorLogin && <span className="erro">{errorLogin}</span>}
      </form>
    </div>
  );
};

export default Forms;
