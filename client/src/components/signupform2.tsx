import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import Schooldropdown from "./schooldropdown";
import BuildingDrop from "./buildingdropdown";
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
var umdbuildings = require("./UMDBuildings.json");

export default class SignupForm2 extends React.Component<
  RouteComponentProps,
  {
    university: string;
    B0: string;
    B1: string;
    B2: string;
    B3: string;
    B4: string;
  }
> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buildingChange = this.buildingChange.bind(this);
  }

  handleSubmit() {
    var buildingstring =
      this.state.B0 +
      "," +
      this.state.B1 +
      "," +
      this.state.B2 +
      "," +
      this.state.B3 +
      "," +
      this.state.B4;
    axios
      .post("/api/registration", {
        email: this.props.location.state.email,
        buildings: buildingstring
      })
      .then(response => {
        console.log(response.data["message"]);
        if (response.data["status"] == true) {
          this.props.history.push({
            pathname: "/signup2",
            state: { email: this.props.location.state.email }
          });
        }
      });
  }

  componentWillMount() {
    this.setState({
      university: "University of Maryland",
      B0: "Brendan Irbe Center",
      B1: "Brendan Irbe Center",
      B2: "Brendan Irbe Center",
      B3: "Brendan Irbe Center",
      B4: "Brendan Irbe Center"
    });
  }

  handleChange(e) {
    this.setState({
      university: e.target.value
    });
  }

  renderOptions() {
    if (this.state.university === "University of California: Los Angeles") {
      return uclabuildings["buildings"].map(building => (
        <Option value={building}>{building}</Option>
      ));
    } else if (this.state.university === "University of Maryland") {
      return umdbuildings["buildings"].map(building => (
        <Option value={building}>{building}</Option>
      ));
    } else if (this.state.university === "University of Pennsylvania") {
      return upennbuildings["buildings"].map(building => (
        <Option value={building}>{building}</Option>
      ));
    }
  }

  buildingChange(e) {
    switch (e.target.dataset.building) {
      case 0:
        this.setState({ B0: e.target.value });
        break;
      case 1:
        this.setState({ B1: e.target.value });
        break;
      case 2:
        this.setState({ B2: e.target.value });
        break;
      case 3:
        this.setState({ B3: e.target.value });
        break;
      case 4:
        this.setState({ B4: e.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormItems>
            <Section>
              <SectionTitle id="Uni">University/College</SectionTitle>
              <Schooldropdown funct={this.handleChange} />
            </Section>
            <Section>
              <SectionTitle>Top 5 most visited buildings</SectionTitle>
              <Choose data-building={0} onChange={this.buildingChange}>
                {this.renderOptions()}
              </Choose>
              <Choose data-building={1} onChange={this.buildingChange}>
                {this.renderOptions()}
              </Choose>
              <Choose data-building={2} onChange={this.buildingChange}>
                {this.renderOptions()}
              </Choose>
              <Choose data-building={3} onChange={this.buildingChange}>
                {this.renderOptions()}
              </Choose>
              <Choose data-building={4} onChange={this.buildingChange}>
                {this.renderOptions()}
              </Choose>
            </Section>

            <RegisterButton type="submit">Register</RegisterButton>
          </FormItems>
        </Form>
      </>
    );
  }
}
