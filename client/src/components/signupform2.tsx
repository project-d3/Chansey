import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { SimpleSelect } from "react-selectize";
import Axios from "axios";

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

const FormItems = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
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

const Choose = styled("select")`
  margin: 0px;
  margin-bottom: 1vh;
  outline: none;
  font-family: "Quicksand", sans-serif;
  font-size: 1.5vw;
  &:focus {
    outline: none;
  }
`;

const Option = styled("option")``;

const Section = styled("div")`
  display: flex;
  flex-direction: column;
  font-family: "Quicksand", sans-serif;
  margin-top: 2vh;
  color: #464655;
  font-weight: bold;
`;

const SectionTitle = styled("p")`
  font-size: 1.2vw;
  margin: 0px;
`;

var uclabuildings = require("./UCLABuildings.json");
var upennbuildings = require("./UPennBuildings.json");

export default class SignupForm2 extends React.Component<
  RouteComponentProps,
  { university: string }
> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    this.props.history.push("/home");
  }

  componentWillMount() {
    this.setState({
      university: "None"
    });
  }

  handleChange(e) {
    this.setState({
      university: e.target.value
    });
  }

  renderOptions() {
    if (this.state.university === "upenn") {
      return upennbuildings["buildings"].map(building => (
        <Option value={building}>{building}</Option>
      ));
    }
    if (this.state.university === "ucla") {
      return uclabuildings["buildings"].map(building => (
        <Option value={building}>{building}</Option>
      ));
    }
    return <Option>--</Option>;
  }

  renderSchools() {
    var schools = [];
    Axios.get("/api/additional_info_form").then(response => {
      for (var school in response.data) {
        schools.push(<Option value={school}>{school}</Option>);
      }
    });
    console.log("hi");
    return schools;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormItems>
            <Section>
              <SectionTitle>University/College</SectionTitle>
              <Choose id="university" onChange={this.handleChange}>
                <Option value="None">Choose a school</Option>
                {this.renderSchools()}
              </Choose>
            </Section>
            <Section>
              <SectionTitle>Top 5 most visited buildings</SectionTitle>
              <Choose>{this.renderOptions()}</Choose>
              <Choose>{this.renderOptions()}</Choose>
              <Choose>{this.renderOptions()}</Choose>
              <Choose>{this.renderOptions()}</Choose>
              <Choose>{this.renderOptions()}</Choose>
            </Section>

            <RegisterButton type="submit">Register</RegisterButton>
          </FormItems>
        </Form>
      </>
    );
  }
}
