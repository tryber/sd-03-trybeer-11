import React from "react";
import Logo from "../../utils/logo.svg";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Forms = ({ register }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState();

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
        return history.push("/");
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
            />
          </div>
        )}
        <div className="email">
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            data-testid={register ? "signup-email" : "email-input"}
          />
        </div>

        <div className="senha">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid={register ? "signup-password" : "password-input"}
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
            <p>Não em uma conta?</p>
            <Link to="/register" data-testid="no-account-btn">
              Registrar-se
            </Link>
          </div>
        )}

        <div className="button">
          {register ? (
            <button data-testid="signup-btn" type="submit">
              Registrar-se
            </button>
          ) : (
            <button data-testid="signin-btn" type="submit">
              Entrar
            </button>
          )}
        </div>
        {errorLogin && <span className="erro">{errorLogin}</span>}
      </form>
    </div>
  );
};

export default Forms;
