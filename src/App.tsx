import React from "react";
import { Wrapper } from "./App.styles";
import "./App.styles.ts";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import MainPage from "./Components/MainPage/MainPage";

function App() {
  return (
    <Wrapper>
      <Header />
      <MainPage />
      <Footer />
    </Wrapper>
  );
}

export default App;
