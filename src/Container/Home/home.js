import React from "react";
import Logo from "./Logo/logo";
import "../Home/home.css";
import HomeMid from "./HomeMid/home_mid";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <Logo />
      <h1 className="HomeContent">Explore and discover new beers</h1>
      <HomeMid />
    </Container>
  );
}

export default Home;
