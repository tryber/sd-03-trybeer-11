import React from "react";
import Logo from "../../utils/logo.svg";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail 

const Forms = ({ register }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState();
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
        localStorage.setItem("token", res.data.token);
        console.log('return from api', res.data)
        return history.push(res.data.role === 'administrator' ? '/admin/orders' : "/products");
      })
      .catch((err) => setErrorLogin(err.response.data.message));
  };

  const getToken = localStorage.getItem("token") || {};

  const handleRegister = (event) => {
    event.preventDefault();
    return axios
      .post("http://localhost:3001/user", {
        email: event.target.email.value,
        password: event.target.password.value,
        name: event.target.nome.value,
        token: event.target.email.value,
        role: isAdmin,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        return history.push("/");
      })
      .catch((err) => setErrorLogin(err.response.data.message));
  };

  return (
    <div className="container">
      <img className="logo" src={Logo} alt="logo" />
      <form
        onSubmit={(event) =>
          register ? handleRegister(event) : handleLogin(event)
        }
      >
        {register && (
          <div className="nome">
            <span>Nome:</span>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              data-testid="signup-name"
              onChange={({ target }) => setNameIsEmpty(!target.value)}
            />
          </div>
        )}
        <div className="email">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            data-testid={register ? "signup-email" : "email-input"}
            onChange={({ target }) => setEmailIsEmpty(!EMAIL_REGEX.test(target.value))}
          />
        </div>

        <div className="senha">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid={register ? "signup-password" : "password-input"}
            onChange={({ target }) => setPasswordIsEmpty(target.value.length < 6)}
          />
        </div>

        {register && (
          <div className="queroVender">
            <input
              type="checkbox"
              data-testid="signup-seller"
              onClick={() => setIsAdmin(!isAdmin)}
            />
            <p>Quero vender!</p>
          </div>
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
            disabled={nameIsEmpty || emailIsEmpty || passwordIsEmpty}
            data-testid={register ? "signup-btn" : "signin-btn"}
            type="submit"
          >
            {register ? 'CADASTRAR' : 'ENTRAR'}
          </button>
        </div>
        {errorLogin && <span className="erro">{errorLogin}</span>}
      </form>
    </div>
  );
};

export default Forms;
