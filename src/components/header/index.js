import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./header.css";

const Header = ({ auth }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  const [user, setUser] = useState();
  const [init, setInit] = useState(false);
  const [tab, setTab] = useState("");

  const onLogOutClick = () => {
    auth.signOut();
  };

  const onTabClick = (tab) => {
    setTab(tab);
  };

  const navTabs = [
    { key: "home", link: "/" },
    { key: "people", link: "/people" },
    { key: "search", link: "/search" },
  ];

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

    const getNavigator = () => {
      console.log(window.location.pathname);
      if (window.location.pathname == "/") {
        setTab("home");
      } else {
        setTab(window.location.pathname.substring(1));
      }
    };
    userInfo();
    getNavigator();
  }, []);
  return (
    <header>
      <ul className="d-flex w-100">
        {navTabs.map((elem) => {
          return (
            <li className="cursor-pointer mx-2 ">
              <Link
                name={`${elem.key}`}
                onClick={(e) => {
                  onTabClick(e.target.name);
                }}
                className={`header-link text-capitalize ${
                  tab == elem.key && "selected-tab"
                }`}
                to={`${elem.link}`}
              >
                {elem.key}
              </Link>
            </li>
          );
        })}

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
                  <button className="fw-bold btn btn-danger w-100 d-flex justify-content-center align-items-center cursor-pointer">
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
