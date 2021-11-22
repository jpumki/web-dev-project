import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Footer from "./components/footer";
import Header from "./components/header";

ReactDOM.render(
  <div>
    <Header/>
    <App />
    <Footer/>
  </div>,
  document.getElementById("root")
);
