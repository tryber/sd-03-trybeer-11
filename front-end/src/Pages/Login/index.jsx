import React from 'react';
import { Forms } from '../../Components';
import GrupoLogin from '../../utils/grupo-login.svg';
import './styles.css';

const Login = () => {
  return (
    <div className="Container">
      <Forms />
      {/* <img src={GrupoLogin} alt="Grupo feliz" /> */}
    </div>
  )
}

export default Login;
