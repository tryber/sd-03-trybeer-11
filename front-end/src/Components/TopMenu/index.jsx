import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";

import SideMenu from "./SideMenu/SideMenu";
import "./index.css";

const renderTitle = (path) => {
  switch (path) {
    case '/profile': return 'Meu perfil';
    case '':
    default: return 'TryBeer';
  }
}

const TopMenu = () => {
  const [openSide, setOpenSide] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="top-menu">
      <div>
        <GiHamburgerMenu
          data-testid="top-hamburguer"
          className="button-hamburgue"
          onClick={() => setOpenSide((value) => !value)}
        />
      {openSide && <SideMenu />}
      </div>
      <h2 data-testid="top-title" className="header-title">{renderTitle(pathname)}</h2>;
    </header>
  );
};

export default TopMenu;
