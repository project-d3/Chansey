import React from "react";
import styled from "styled-components";
import axios from "axios";

const HotWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 4px solid #c4a29e;
  padding-bottom: 2px;
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
  box-shadow: 2px 2px 3px 3px #c4c4c4;
`;

const BuildingText = styled("p")`
  font-family: "Quicksand", sans-serif;
  color: #c4a29e;
  font-size: 1.4vw;
  margin: 10px 10px;
  font-weight: bold;
`;

export default class Hotspots extends React.Component<{ buildings: any }> {
  constructor(props) {
    super(props);
    this.renderHotspots = this.renderHotspots.bind(this);
  }

  renderHotspots() {
    var returnArr = [];
    var i = 0;
    for (var building in this.props.buildings) {
      if (i < 6) {
        returnArr.push(
          <Building>
            <BuildingText>
              {building} -- {this.props.buildings[building]}
            </BuildingText>
          </Building>
        );
        i++;
      }
    }
    return returnArr;
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
