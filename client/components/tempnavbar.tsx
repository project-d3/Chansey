import React from "react";
import styled from "styled-components";

const NavWrapper = styled("div")`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background: #f7a9a8;
  font-family: "Comfortaa", sans-serif;
  align-items: center;
  position: relative;
`;

const Title = styled("p")`
  font-size: 3vw;
  color: #464655;
  font-weight: bold;
  margin: 2.5vh 4vw;
  letter-spacing: 0.1em;
`;

export default class TempNavBar extends React.Component {
  render() {
    return (
      <>
        <NavWrapper>
          <Title>Chansey</Title>
        </NavWrapper>
      </>
    );
  }
}
