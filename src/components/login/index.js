import React, { useState, useEffect } from "react";
import wallpaper from "../../assets/wallpaper.png";
import "./login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "../../firebase/firebase";
const Login = ({auth}) => {
  const [isLoggin, setIsLoggin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggin(true);
        window.location.href = "/";
      } else {
        setIsLoggin(false);
      }
    });
  }, []);

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div
        className="login-backdrop"
        style={{
          backgroundImage: `url(${wallpaper})`,
        }}
      />
      <div className="signin-container">
        {isLoggin ? (
          <div className="text-center">Redirecting ...</div>
        ) : (
          <SignIn auth={auth} />
        )}
      </div>
    </div>
  );
};

const SignIn = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setError(false);
    if (name === "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(true);
    }
  };

  const goSignUp = () => {
    setLogin(false);
    setEmail("");
    setPassword("");
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLogin(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login-content">
      {login ? (
        <div>
          <form onSubmit={onLogin}>
            <h1 className="login-h1">Sign In</h1>
            <div className="login-label">User name </div>
            <input
              name="email"
              type="email"
              value={email}
              className="login-input"
              placeholder="Email"
              required
              onChange={onChange}
            />
            <div className="login-label">Password</div>
            <input
              name="password"
              value={password}
              className="login-input"
              type="password"
              placeholder="Password"
              required
              onChange={onChange}
            />
            {error && <div>Error Occured</div>}
            <div>
              <input
                className=" btn btn-danger mt-3 mb-2 d-flex justify-content-center align-items-center"
                type="submit"
                value={`Sign in`}
              />
            </div>
          </form>
          <div className="mt-3">
            New to the site?{" "}
            <a className="text-underline cursor-pointer" onClick={goSignUp}>
              <u>Sign up here</u>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={onSignUp}>
          <h1 className="login-h1">Sign Up</h1>
          <div className="login-label">User name </div>
          <input
            name="email"
            type="email"
            value={email}
            className="login-input"
            placeholder="Email"
            required
            onChange={onChange}
          />
          <div className="login-label">Password</div>
          <input
            name="password"
            value={password}
            className="login-input"
            type="password"
            placeholder="Password"
            required
            onChange={onChange}
          />
          {error && <div>Email already exist</div>}
          <div>
            <input
              className=" btn btn-danger mt-3 mb-2 d-flex justify-content-center align-items-center"
              type="submit"
              value={`Sign Up`}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
