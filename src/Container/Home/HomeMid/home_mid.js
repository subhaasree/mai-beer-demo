import React from "react";
import { Container } from "react-bootstrap";
import "./home_mid.css";
import { Link } from "react-router-dom";

function HomeMid() {
  return (
    <div>
      <div className="HomeMid">
        <div className="HomeMid-Left"></div>
        <div className="warp_BeerImg">
          <div className="BeerImg"></div>
        </div>
        <Container className="HomeMid-Right ">
          <h2 className="Right-Heading ">Find the Beer you’ll love.</h2>
          <p className="Right-Paragh  ">
            We Combine our beer expertise with your taste preference to
            <br />
            suggest the best beer for you
          </p>
          <div className="button-at">
            <button className="Right-Button ">
              <Link to="/UserInput" style={{ textDecoration: "none" }}>
                <div style={{ color: "white" }}> Get Started</div>
              </Link>
            </button>
          </div>
        </Container>
      </div>
      <div className="end_dec">
        <div className="endin"></div>
      </div>
      <div className="footer">
        <div style={{ margin: "20px" }}>
          Thanks for taking the time with us.
          <br /> Please give us your feedback to improve!
        </div>
        <button className="button-tri">Give Us Feedback</button>
      </div>
    </div>
  );
}

export default HomeMid;
