import React from "react";
import { NavLink } from "react-router-dom";
import "./MainMenu.scss";

const MainMenu = () => {
  return (
    <div className="mainMenuStyle">
      <div className="container">
        <header className="mainMenuContainer">
          <div className="logoContainer">
            <div className="imgLogo">
              <img
                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRjndEhs6kqd11pTLbuHqze9a19a922zN8e9LiG7pdh2cpqBF4E"
                alt="CookSmart Logo"
              />
            </div>
            <span>CookSmart</span>
          </div>
          <div className="nav">
            <nav>
              <NavLink to="/" activeclassname="active">
                Recipes
              </NavLink>
              <NavLink to="/shop" activeclassname="active">
                Shop
              </NavLink>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

export default MainMenu;
