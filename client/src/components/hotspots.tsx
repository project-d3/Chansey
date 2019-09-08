import React from "react";
import styled from "styled-components";
import axios from "axios";

const HotWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HotTitle = styled("p")`
  font-family: "Comfortaa", sans-serif;
  font-size: 3.5vw;
  color: #c4a29e;
  font-weight: bold;
  margin-bottom: 3vh;
`;

const BuildingWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Building = styled("div")`
  border: 4px solid #c4a29e;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 2vh;
`;

const BuildingText = styled("p")`
  font-family: "Quicksand", sans-serif;
  color: #c4a29e;
  font-size: 1.8vw;
  margin: 10px 10px;
  font-weight: bold;
`;

export default class Hotspots extends React.Component<{ buildings: any }> {
  constructor(props) {
    super(props);
    this.renderHotspots = this.renderHotspots.bind(this);
  }

  renderHotspots() {
    var renderArr = [];
    var numToRender = 6;
    var numArry = [];
    for (var num in this.props.buildings) {
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
          <Building>
            <BuildingText>{this.props.buildings[max][i]}</BuildingText>
          </Building>
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
        <HotWrapper>
          <HotTitle>Campus Hotspots</HotTitle>
          <BuildingWrapper>{this.renderHotspots()}</BuildingWrapper>
        </HotWrapper>
      </>
    );
  }
}
