import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ auth }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
  }, []);
  return (
    <header>
      <ul className="d-flex w-100">
        <li>
          <Link className="header-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="header-link" to="/search">
            Search
          </Link>
        </li>
        {!isLoggin ? (
          <div className="w-100 d-flex align-items-center justify-content-end ">
            <Link className="header-link " to="/login">
              <button className="mx-3 btn btn-danger d-flex align-items-center justify-content-center">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-100 d-flex align-items-center justify-content-end ">
            <Link className="header-link " to="/profile">
              <div className="mx-3 d-flex align-items-center justify-content-center">
                Profile
              </div>
            </Link>
          </div>
        )}
      </ul>
    </header>
  );
};

export default Header;
