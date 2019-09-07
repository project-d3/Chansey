import React from "react";
import styled from "styled-components";
import NavBar from "../components/navbar";
import FeelingSickCard from "../components/feelingsickcard";

const Content = styled("div")`
  display: flex;
`;

const Page = styled("div")`
  width: 100%;
  height: 100vh;
  background: #feffe8;
`;

const Message = styled("p")`
  color: #464655;
  font-size: 4vw;
  font-weight: bold;
`;

const Card = styled("div")`
  background: #f7a9a8;
  width: 40%;
  height: 60%;
  font-family: "Comfortaa", cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5vw;
  margin-top: 15vh;
  border-radius: 60px;
`;

export default class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Page>
          <NavBar loggedin={false}></NavBar>
          <Content>
            <Card>TEST</Card>
          </Content>
        </Page>
      </>
    );
  }
}
