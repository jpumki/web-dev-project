import popcorn from "../../assets/wallpaper.png";
import "./login.css";
const Login = () => {
  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div
        className="login-backdrop"
        style={{
          backgroundImage: `url(${popcorn})`,
        }}
      />
      <div className="signin-container">
        <SignIn />
      </div>
    </div>
  );
};

const SignIn = () => {
  return (
    <div className="login-content">
      <div>
        <h1 className="login-h1">Sign In</h1>
        <div className="login-label">User name </div>
        <input className="login-input" />
        <div className="login-label">Password</div>
        <input className="login-input" />
        <div>
          <button className=" btn btn-danger mt-3 mb-2 d-flex justify-content-center align-items-center">
            Sign In
          </button>
        </div>
      </div>
      <div className="mt-3">
        New to the site?{" "}
        <a className="text-underline cursor-pointer">
          <u>Sign up here</u>
        </a>
      </div>
    </div>
  );
};

export default Login;
