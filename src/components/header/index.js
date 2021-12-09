import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ auth }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  const [user, setUser] = useState();
  const [init, setInit] = useState(false);

  const onLogOutClick = () => {
    auth.signOut();
  };

  useEffect(() => {
    async function userInfo() {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggin(true);
          setUser(user);
          setInit(true);
        } else {
          setIsLoggin(false);
        }
      });
    }
    userInfo();
  }, []);
  return (
    <header>
      <ul className="d-flex w-100">
        <li className="cursor-pointer">
          <Link className="header-link" to="/">
            Home
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link className="header-link" to="/people">
            People
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link className="header-link" to="/search">
            Search
          </Link>
        </li>
        {!isLoggin ? (
          <div className="w-100 d-flex align-items-center justify-content-end ">
            <Link className="header-link " to="/login">
              <button className="mx-3 btn btn-danger d-flex align-items-center justify-content-center cursor-pointer">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-100 d-flex align-items-center justify-content-end ">
            {init && (
              <>
                <a className="header-link " href={`/profile/${user.uid}`}>
                  <div className="mx-3 d-flex align-items-center justify-content-center cursor-pointer">
                    MyProfile
                  </div>
                </a>

                <div className="col-1 mx-2" onClick={onLogOutClick}>
                  <button className="btn btn-danger w-100 d-flex justify-content-center align-items-center cursor-pointer">
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </ul>
    </header>
  );
};

export default Header;
