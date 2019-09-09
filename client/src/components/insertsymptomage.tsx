import React from "react";
import styled from "styled-components";

const AgeWrapper = styled("div")`
  width: 100%;
  background: #c4a29e;
  color: #feffe8;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EnterAge = styled("input")`
  outline: none;
  font-size: 2vw;
  background: #feffe8;
  color: #464655;
  width: 10%;
`;

const AgeText = styled("p")`
  font-family: "Comfortaa", sans-serif;
  color: #feffe8;
  font-size: 2.5vw;
  margin-left: 2vw;
  font-weight: bold;
`;

export default class InsertSymptomAge extends React.Component<{ funct: any }> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.funct(Number(e.target.value));
  }
  render() {
    return (
      <>
        <AgeWrapper>
          <EnterAge
            type="text"
            pattern="[0-9]*"
            id="counter"
            onChange={this.handleChange}
            maxlength="2"
          ></EnterAge>
          <AgeText>Days Ago</AgeText>
        </AgeWrapper>
      </>
    );
  }
}
