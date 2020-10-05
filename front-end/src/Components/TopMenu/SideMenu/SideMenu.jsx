import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { GiHamburgerMenu } from "react-icons/gi";

const SideMenu = ({ setOpenSide }) => {
  const role = localStorage.getItem('role');

  return (
    <aside className="side-menu-container" data-testid="side-menu-container">
      {role === "administrator" ? (
        <>
          <Link to="/admin/profile">
            <button data-testid="side-menu-item-profile">Meu Perfil</button>
          </Link>
          <Link to="/admin/orders">
            <button data-testid="side-menu-item-orders">Pedidos</button>
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
