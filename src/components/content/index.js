import Header from "../header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "../search";
import Home from "../home";
const Contents = () => {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </>
    </Router>
  );
};

export default Contents;
