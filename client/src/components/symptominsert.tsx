import React from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
  background: #c4a29e;
  color: #feffe8;
  height: 70vh;
  margin-bottom: auto;
  margin-top: auto;
  border-radius: 50px;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8vw;
`;

const Title = styled("p")`
  font-family: "Comfortaa", cursive;
  font-size: 3vw;
  font-weight: bold;
`;

export default class SymptomInsert extends React.Component {
  render() {
    return (
      <>
        <Wrapper>
          <Title>Symptoms</Title>
        </Wrapper>
      </>
    );
  }
}
