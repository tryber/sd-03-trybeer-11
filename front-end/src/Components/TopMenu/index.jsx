import React, { useState } from "react";
import PropTypes from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";

import SideMenu from "./SideMenu/SideMenu";
import "./index.css";

const TopMenu = ({ title }) => {
  const [openSide, setOpenSide] = useState(false);

  return (
    <header className="top-menu">
      <div>
        <GiHamburgerMenu
          className="button-hamburgue"
          onClick={() => setOpenSide((value) => !value)}
        />
      {openSide && <SideMenu />}
      </div>
      <h2 className="header-title">{title}</h2>
    </header>
  );
};

TopMenu.propTypes = {
  title: PropTypes.string,
};

TopMenu.defaultProps = {
  title: "Trybeer",
};

export default TopMenu;
