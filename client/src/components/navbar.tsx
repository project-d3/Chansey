import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
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

const LinksDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  margin-right: 1vw;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: #464655;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  &:hover {
    background: #464655;
    color: #f7a9a8;
    text-decoration: none;
  }
`;

const NavText = styled("p")`
  font-size: 2vw;
  margin: auto;
  height: 100%;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;

interface auth {
  loggedin: Boolean;
}

export default class NavBar extends React.Component<auth> {
  render() {
    return (
      <>
        <NavWrapper>
          <Title authen={true}>Chansey</Title>
          <LinksDiv>
            <NavLink to="/signup1">
              <NavText>Sign up</NavText>
            </NavLink>
            <NavLink to="/signin">
              <NavText>Sign in</NavText>
            </NavLink>
          </LinksDiv>
        </NavWrapper>
      </>
    );
  }
}
