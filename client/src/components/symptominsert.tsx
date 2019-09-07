import React from "react";
import styled from "styled-components";
import axios from "axios";

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

const SymptomDropdown = styled("select")``;
const SymptomOption = styled("option")``;

export default class SymptomInsert extends React.Component {
  getSymptoms() {
    //get symptoms
    var symptoms;
    axios.get("/symptoms").then(response => {
      symptoms = response.data;
    });
  }
  render() {
    return (
      <>
        <Wrapper>
          <Title>Symptoms</Title>
          <SymptomDropdown>
            <SymptomOption></SymptomOption>
          </SymptomDropdown>
        </Wrapper>
      </>
    );
  }
}
