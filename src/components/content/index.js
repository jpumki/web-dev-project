import Header from "../header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "../search";
import Home from "../home";
import Detail from "../detail"
const Contents = () => {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/show/:id" element={<Detail />} />
        </Routes>
      </>
    </Router>
  );
};

export default Contents;
