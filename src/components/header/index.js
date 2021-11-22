import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../login";
import Profile from "../profile";
import Search from "../search";
import Home from "../home";

const Header = () => {
  return (
    <div>
      <div>This is Header</div>
      <Router>
        <div>
          <ul className="d-flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Header;
