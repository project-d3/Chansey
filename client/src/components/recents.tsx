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

export default class Recents extends React.Component<{ symptoms: any }> {
  constructor(props) {
    super(props);
  }

  renderRecents() {
    var renderArr = [];
    var numToRender = 8;
    var numArry = [];
    for (var num in this.props.symptoms) {
      if (num in numArry) {
        continue;
      }
      numArry.push(num);
    }
    numArry.sort();
    while (numToRender >= 0) {
      var max = numArry.pop();
      var i = 0;
      while (max in numArry && numToRender >= 0) {
        renderArr.push(
          <Symptom>
            <SymptomText>{this.props.symptoms[max][i]}</SymptomText>
          </Symptom>
        );
        i++;
        numToRender--;
      }
    }
    return renderArr;
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
