import React from "react";
import { Page, Title } from "./signup1";
import SigninForm from "../components/signinform";

export default class SigninPage extends React.Component {
  render() {
    return (
      <>
        <Page>
          <Title>Chansey</Title>
          <SigninForm {...this.props}></SigninForm>
        </Page>
      </>
    );
  }
}
