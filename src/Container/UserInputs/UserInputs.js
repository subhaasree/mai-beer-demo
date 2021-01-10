import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { sampleData } from "../../data/sample_data";
import Logo from "../../Container/Home/Logo/logo";
import "../UserInputs/UserInputs.css";
import Button from "../../Components/button/button";
import { Link } from "react-router-dom";

//@ts-check
function UserInputs(props) {
  const [Qindex, setQindex] = useState(0);
  const questions = JSON.parse(JSON.stringify(sampleData));
  const [userResponse, setUserResponse] = useState();
  const [user_value, setUserValue] = useState();
  const [final_user_value, setFinalUserValue] = useState([]);

  console.log(final_user_value);

  return (
    <Container>
      <Logo />
      <button className="close-icon">
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <div style={{ color: "#EBA600" }}> X</div>
        </Link>
      </button>
      <Container className="pagination">
        {Qindex + 1} / {questions.questions.length}
      </Container>
      <div className="question_wrapper">
        {questions.questions[Qindex].question}
      </div>
      {answerType(
        questions.questions[Qindex],
        setUserResponse,
        userResponse,
        user_value,
        setUserValue
      )}
      <div className="action-wrapper">
        <Button
          onClick={() => {
            if (Qindex > 0) {
              setQindex(Qindex - 1);
            }
          }}
          className="nav-button secondary arrow-left"
          text="Previous"
          disabled={Qindex === 0}
          arrow="left"
        />
        <Button
          onClick={() => {
            if (Qindex < questions.questions.length - 1) {
              setFinalUserValue([...final_user_value, userResponse]);
              setQindex(Qindex + 1);
            }
          }}
          className="nav-button primary arrow-right"
          disabled={Qindex + 1 === questions.questions.length}
          text="Next"
          arrow="right"
        />
      </div>
      <div className="footer">
        <div className="footer-para1">
          <p>Why do you need to answer this?</p>
        </div>
        <div className="footer-para2">
          <p>
            mAI Beer works with a matching process to make suggestions that are
            best suited. We ask <br />
            for your preferences first because your answers will help us to
            build your profile.
          </p>
        </div>
      </div>
    </Container>
  );
}

function answerType(
  question,
  setUserResponse,
  userResponse,
  user_value,
  setUserValue
) {
  switch (question.question_type) {
    case "single":
      return SingleChoice(
        question,
        setUserResponse,
        userResponse,
        user_value,
        setUserValue
      );
    case "rating":
      return ratingChoice(
        question,
        setUserResponse,
        userResponse,
        user_value,
        setUserValue
      );
    case "numeric":
      return numericChoice(
        question,
        setUserResponse,
        userResponse,
        user_value,
        setUserValue
      );

    default:
      return SingleChoice(
        question,
        setUserResponse,
        userResponse,
        user_value,
        setUserValue
      );
  }
}

function SingleChoice(
  question,
  setUserResponse,
  userResponse,
  user_value,
  setUserValue
) {
  return (
    <Container style={{ marginLeft: "300px" }}>
      <div className="radiogroup">
        {question.answers.map(
          (
            { answer, server_value, url, color_code, name, row, type },
            index
          ) => {
            return (
              <div key={index}>
                {index % row === 0 && <div className="row-break" />}
                <Radio
                  text={answer}
                  value={server_value}
                  onChange={(value) => {
                    setUserValue(value);
                    setUserResponse({
                      question_id: question.id,
                      answer: question.answers.find(
                        (e) => e.server_value === value
                      ),
                    });
                  }}
                  name={name}
                  image={url}
                  color_code={color_code}
                  style_type={type}
                  selected_value={user_value}
                />
              </div>
            );
          }
        )}
      </div>
    </Container>
  );
}

function numericChoice(
  question,
  setUserResponse,
  userResponse,
  user_value,
  setUserValue
) {
  return (
    <Container style={{ marginLeft: "300px" }}>
      <Numeric
        onChange={(value) => {
          setUserValue(value);
          setUserResponse({
            question_id: question.id,
            answer: value,
          });
        }}
        selectedValue={user_value}
      ></Numeric>
    </Container>
  );
}

function ratingChoice(
  question,
  setUserResponse,
  userResponse,
  user_value,
  setUserValue
) {
  return (
    <Container style={{ marginLeft: "300px" }}>
      <Rating
        range_min={question.range_min}
        range_max={question.range_max}
        left_answer_hint={question.left_answer_hint}
        left_answer_icon={question.left_answer_icon}
        left_description={question.left_description}
        right_answer_hint={question.right_answer_hint}
        right_answer_icon={question.right_answer_icon}
        right_description={question.right_description}
        onChange={(value) => {
          setUserValue(value);
          setUserResponse({
            question_id: question.id,
            answer: value,
          });
        }}
        selectedValue={user_value}
      ></Rating>
    </Container>
  );
}

function Radio(props) {
  const {
    text,
    image,
    style_type,
    color_code,
    onChange,
    value,
    selected_value,
    ...rest
  } = props;
  const isChecked = selected_value === value;

  console.log(isChecked);
  return (
    <label className={`radio ${style_type} ${isChecked ? "checked" : ""}`}>
      <span
        className="radio-label-group"
        style={{ backgroundColor: color_code }}
      >
        <input
          type="radio"
          value={value}
          {...rest}
          onChange={() => {
            onChange(value);
          }}
          checked={isChecked}
        />
        {image && (
          <img
            className={`radio-image ${color_code ? "colored" : ""}`}
            src={image}
            alt="icon"
          />
        )}
        {style_type === "text_image" || style_type === "text" ? (
          <span style={{ color: color_code }} className="radio-label">
            {text}
          </span>
        ) : null}
      </span>
      {style_type === "image_small" && (
        <span style={{ color: color_code }} className="radio-label">
          {text}
        </span>
      )}
    </label>
  );
}

Radio.defaultProps = {
  style_type: "text_image",
};

function Numeric(props) {
  const { selectedValue, onChange } = props;
  const [numeriValue, setNumericValue] = useState(selectedValue || 0);

  return (
    <div className="numeric-selector">
      <button
        onClick={() => {
          if (numeriValue) {
            const updatedValue = numeriValue - 1;
            setNumericValue(updatedValue);
            onChange(updatedValue);
          }
        }}
      >
        -
      </button>
      <span className="value-holder">{numeriValue}</span>
      <button
        onClick={() => {
          const updatedValue = parseInt(numeriValue) + 1;
          setNumericValue(updatedValue);
          onChange(updatedValue);
        }}
      >
        +
      </button>
    </div>
  );
}

Numeric.defaultProps = {
  value: 0,
  onChange: () => {},
};

function Rating(props) {
  const {
    range_min,
    range_max,
    left_answer_hint,
    left_answer_icon,
    left_description,
    right_answer_hint,
    right_answer_icon,
    right_description,
    onChange,
    selectedValue,
  } = props;

  return (
    <div className="range-slider">
      <span className="slider-left">
        <span>
          <img src={left_answer_icon} alt="icon" />
        </span>
        <span className={"hint"}>{left_answer_hint}</span>
        <span className={"desc"}>{left_description}</span>
      </span>
      <span className="slider">
        <input
          type="range"
          min={range_min}
          max={range_max}
          value={selectedValue || "0"}
          className="slider"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </span>
      <span className="slider-right">
        <span>
          <img src={right_answer_icon} alt="icon" />
        </span>
        <span className={"hint"}>{right_answer_hint}</span>
        <span className={"desc"}>{right_description}</span>
      </span>
    </div>
  );
}
export default UserInputs;
