import React from "react";
import styled from "styled-components";
import { Page, Title } from "./signup1";
import SignupForm2 from "../components/signupform2";

export default class SignupPage2 extends React.Component {
  render() {
    return (
      <>
        <Page>
          <Title>Chansey</Title>
          <SignupForm2 {...this.props}></SignupForm2>
        </Page>
      </>
    );
  }
}
