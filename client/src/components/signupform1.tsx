import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

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

const SignupText = styled("p")`
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

const RegisterButton = styled("button")`
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

export default class SignupForm1 extends React.Component<
  RouteComponentProps,
  { name: string; email: string; password: string }
> {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  componentWillMount() {
    this.setState({
      name: "",
      email: "",
      password: ""
    });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/registration", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data["message"]);
        if (response.data["status"] == true) {
          this.props.history.push({
            pathname: "/signup2",
            state: { email: this.state.email }
          });
        }
      });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormItems>
            <SignupText>Sign up!</SignupText>
            <Input
              placeholder="Name"
              required
              onChange={this.handleChangeName}
            ></Input>
            <Input
              type="email"
              placeholder="Email Address"
              required
              onChange={this.handleChangeEmail}
            ></Input>
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={this.handleChangePassword}
            ></Input>
            <RegisterButton type="submit">Next</RegisterButton>
          </FormItems>
        </Form>
      </>
    );
  }
}
