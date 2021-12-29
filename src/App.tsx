import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Wrapper } from "./App.styles";
import "./App.styles.ts";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import MainPage from "./Components/MainPage/MainPage";
import Stops from "./Components/Stops/Stops";

function App() {
  return (
    <Router>
      <Wrapper>
        <Header />
        <Router>
          <Route path="/" component={MainPage} />
          <Route path=":id" component={Stops} />
        </Router>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;
