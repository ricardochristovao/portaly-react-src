import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";
import setCarrinho from "./util/Carrinho";
import "materialize-css/dist/css/materialize.min.css";
import "./css/Global.css";


const App = () => {

  setCarrinho();

  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
