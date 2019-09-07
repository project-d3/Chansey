import React from "react";
import styled from "styled-components";

const RecentWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecentTitle = styled("p")`
  font-family: "Comfortaa", sans-serif;
  font-size: 3.5vw;
  color: #c4a29e;
  font-weight: bold;
  margin-bottom: 3vh;
`;

const SymptomWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Symptom = styled("div")`
  border: 4px solid #c4a29e;
  border-radius: 30px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 2vh;
`;

const SymptomText = styled("p")`
  font-family: "Quicksand", sans-serif;
  color: #c4a29e;
  font-size: 1.8vw;
  margin: 10px 10px;
  font-weight: bold;
`;

export default class Recents extends React.Component {
  render() {
    return (
      <>
        <RecentWrapper>
          <RecentTitle>Recent Symptoms</RecentTitle>
          <SymptomWrapper>
            <Symptom>
              <SymptomText>Cough</SymptomText>
            </Symptom>
            <Symptom>
              <SymptomText>Headache</SymptomText>
            </Symptom>
            <Symptom>
              <SymptomText>Nausea</SymptomText>
            </Symptom>
            <Symptom>
              <SymptomText>Stuffy Nose</SymptomText>
            </Symptom>
            <Symptom>
              <SymptomText>Bloody Nose</SymptomText>
            </Symptom>
            <Symptom>
              <SymptomText>Fever</SymptomText>
            </Symptom>
          </SymptomWrapper>
        </RecentWrapper>
      </>
    );
  }
}
