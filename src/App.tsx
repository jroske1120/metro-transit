import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import MainPage from "./Components/MainPage/MainPage";
import Stops from "./Components/Stops/Stops";

function App() {
  return (
    <Router>
      <Header />
      <Router>
        <Route path="/" component={MainPage} />
        <Route path=":id" component={Stops} />
      </Router>
      <Footer />
    </Router>
  );
}

export default App;
