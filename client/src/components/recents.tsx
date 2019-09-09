import React from "react";
import styled from "styled-components";

const RecentWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
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
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 2vh;
  box-shadow: 2px 2px 2px 3px #c4c4c4;
`;

const SymptomText = styled("p")`
  font-family: "Quicksand", sans-serif;
  color: #c4a29e;
  font-size: 1.4vw;
  margin: 10px 10px;
  font-weight: bold;
`;

export default class Recents extends React.Component<{ symptoms: any }> {
  constructor(props) {
    super(props);
    this.renderRecents = this.renderRecents.bind(this);
  }

  renderRecents() {
    var returnArr = [];
    var i = 0;
    for (var symptom in this.props.symptoms) {
      if (i < 8) {
        returnArr.push(
          <Symptom>
            <SymptomText>
              {symptom} -- {this.props.symptoms[symptom]}
            </SymptomText>
          </Symptom>
        );
        i++;
      }
    }
    return returnArr;
  }
  render() {
    return (
      <>
        <RecentWrapper>
          <RecentTitle>Recent Symptoms</RecentTitle>
          <SymptomWrapper>{this.renderRecents()}</SymptomWrapper>
        </RecentWrapper>
      </>
    );
  }
}
