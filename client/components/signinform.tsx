import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";

const Form = styled("form")`
  background: #f7a9a8;
  border-radius: 10px;
  width: 35%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled("input")`
  border: none;
  width: 65%;
  font-size: 1.3vw;
  padding: 10px 20px;
  border-radius: 25px;
  margin-bottom: 10px;
  color: #464655;
  &:focus {
    outline: none;
  }
`;

const SigninText = styled("p")`
  color: white;
  font-size: 3vw;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 2vh;
  margin-top: 3vh;
`;

const FormItems = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  font-family: "Quicksand", sans-serif;
`;

const LoginButton = styled("button")`
  color: #464655;
  font-size: 1.7vw;
  background: white;
  border: none;
  font-family: "Quicksand", sans-serif;
  border-radius: 25px;
  transition: 0.2s;
  margin-top: 2vh;
  margin-bottom: 4vh;
  padding: 0.5vw 2vw;
  letter-spacing: 0.1em;
  &:hover {
    background: #464655;
    color: white;
  }
`;

export default class SigninForm extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.history.push("/home");
  }
  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormItems>
            <SigninText>Sign in!</SigninText>
            <Input type="email" required placeholder="Email"></Input>
            <Input type="password" required placeholder="Password"></Input>
            <LoginButton type="submit">Log in</LoginButton>
          </FormItems>
        </Form>
      </>
    );
  }
}
