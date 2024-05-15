import React from "react";
import logo from "../logo.png"
import "../styles/header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header">
        <Link to={"/"}>
        <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/milk-tracking">History</a></li>
          </ul>
        </nav>

      </div>
    </>
  );
};

export default Header;
