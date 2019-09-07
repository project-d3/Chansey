import React from "react";
import styled from "styled-components";
import SignupForm1 from "../components/signupform1";

export const Page = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #feffe8;
  align-items: center;
`;

export const Title = styled("p")`
  color: #c4a29e;
  font-family: "Comfortaa", cursive;
  font-size: 7vw;
  font-weight: bold;
`;

export default class SignupPage1 extends React.Component {
  render() {
    return (
      <>
        <Page>
          <Title>Chansey</Title>
          <SignupForm1 {...this.props}></SignupForm1>
        </Page>
      </>
    );
  }
}
