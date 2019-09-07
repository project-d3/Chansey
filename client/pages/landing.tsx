import React from "react";
import styled from "styled-components";
import NavBar from "../components/navbar";

const Page = styled("div")`
  width: 100%;
  height: 100vh;
  background: #feffe8;
`;

export default class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Page>
          <NavBar loggedin={false}></NavBar>
        </Page>
      </>
    );
  }
}
