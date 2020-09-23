import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const SideMenu = () => {
  return (
    <aside className="containers-buttons-menu">
      <Link to="/products">
        <button>Produtos</button>
      </Link>
      <Link to="/orders">
        <button>Meus Pedidos</button>
      </Link>
      <Link to="/profile">
        <button>Meu Perfil</button>
      </Link>
      <Link to="/login">
        <button onClick={() => localStorage.removeItem("user")}>Sair</button>
      </Link>
    </aside>
  );
};

export default SideMenu;
