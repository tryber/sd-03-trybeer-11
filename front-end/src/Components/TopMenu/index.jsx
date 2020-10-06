import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import SideMenu from "./SideMenu/SideMenu";
import "./index.css";

const renderTitle = (path) => {
  switch (path) {
    case '/profile': return 'Meu perfil';
    case '/orders': return 'Meus Pedidos';
    case '':
    default: return 'TryBeer';
  }
}

const TopMenu = () => {
  const role = localStorage.getItem('role');
  const [openSide, setOpenSide] = useState(role === 'administrator');
  const { pathname } = useLocation();

  return (
    <div>
      <header className="top-menu">
        <div>
          <GiHamburgerMenu
            data-testid="top-hamburguer"
            className="button-hamburgue"
            onClick={() => setOpenSide((value) => !value)}
          />
        </div>
        <h2 data-testid="top-title" className="header-title">{renderTitle(pathname)}</h2>
      </header>
      {openSide && <SideMenu setOpenSide={setOpenSide} />}
    </div>
  );
};

export default TopMenu;
