import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const role = localStorage.getItem('role');

console.log(role);

const SideMenu = () => {
  return (
    <aside className="side-menu-container">
      {role === "administrador" ? (
        <>
          <Link to="/">
            <button data-testid="side-menu-item-orders">Pedidos</button>
          </Link>
          <Link to="/admin/profile">
            <button data-testid="side-menu-item-profile">Meu Perfil</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/products">
            <button data-testid="side-menu-item-products">Produtos</button>
          </Link>
          <Link to="/orders">
            <button data-testid="side-menu-item-my-orders">Meus Pedidos</button>
          </Link>
          <Link to="/profile">
            <button data-testid="side-menu-item-my-profile">Meu Perfil</button>
          </Link>
        </>
      )}
      <Link to="/login">
        <button
          data-testid="side-menu-item-logout"
          onClick={() => localStorage.removeItem("token")}
        >
          Sair
        </button>
      </Link>
    </aside>
  );
};

export default SideMenu;
