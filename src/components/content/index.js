import Header from "../header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "../search";
import Home from "../home";
import Detail from "../detail";
import Profile from "../profile";
import Login from "../login";
import firebaseApp from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
const Contents = () => {
  const auth = getAuth(firebaseApp);
  return (
    <Router>
      <>
        <Header auth={auth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login auth={auth} />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/show/:id" element={<Detail />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </>
    </Router>
  );
};

export default Contents;
