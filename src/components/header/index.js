import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <header>
      <ul className="d-flex">
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
      </ul>
    </header>
  );
};

export default Header;
