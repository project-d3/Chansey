import React from "react";
import styled from "styled-components";
import SymptomInsert from "../components/symptominsert";
import Severity from "../components/severity";
import TempNavBar from "../components/tempnavbar";
import InsertSymptomAge from "../components/insertsymptomage";

const Page = styled("div")`
  background: #feffe8;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const RightDiv = styled("div")`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`;

const Content = styled("form")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: auto;
`;

const SubmitSymptoms = styled("button")`
  align-self: flex-end;
  background: #feffe8;
  color: #c4a29e;
  border: 10px solid #c4a29e;
  font-size: 2vw;
  padding: 1.5vh 1.5vw;
  border-radius: 50px;
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  letter-spacing: 0.1em;
  transition: 0.25s;
  &:hover {
    color: #feffe8;
    background: #c4a29e;
  }
`;

export default class SymptomFormPage extends React.Component {
  render() {
    return (
      <>
        <Page>
          <TempNavBar />
          <Content>
            <SymptomInsert />
            <RightDiv>
              <Severity />
              <InsertSymptomAge />
              <SubmitSymptoms>Submit</SubmitSymptoms>
            </RightDiv>
          </Content>
        </Page>
      </>
    );
  }
}
