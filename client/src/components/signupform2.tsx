import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { SimpleSelect } from "react-selectize";
import Axios from "axios";
import { async } from "q";

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
  { university: string; schools: any; buildings: any }
> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderSchools = this.renderSchools.bind(this);
  }

  handleSubmit() {
    this.props.history.push("/home");
  }

  componentWillMount() {
    this.setState({
      university: "None",
      schools: []
    });
  }

  async componentDidMount() {
    if (!this.state.schools) {
      (async () => {
        try {
          this.setState({
            schools: await this.getData()
          });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  handleChange(e) {
    this.setState({
      university: e.target.value
    });
  }

  renderOptions() {
    var buildings = [];
    if (this.state.university != "None") {
      Axios.get("/api/additional_info_form").then(response => {
        buildings = response.data[this.state.university];
      });
      return buildings.map(building => (
        <Option value={building}>{building}</Option>
      ));
    }
    return buildings;
  }

  getData = async () => {
    const res = await Axios("/api/additional_info_form");
    return await res.data;
  };

  renderSchools = async () => {
    try {
      const response = await Axios.get("/api/additional_info_form");
      this.setState({ buildings: response.data });
      console.log("response");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormItems>
            <Section>
              <SectionTitle id="Uni">University/College</SectionTitle>
              <Choose id="university" onChange={this.handleChange}>
                <Option value="None">Choose a school</Option>
                {this.state.schools ? (
                  this.state.schools.map(school => (
                    <Option value={school}>{school}</Option>
                  ))
                ) : (
                  <Option value="None">LOADING</Option>
                )}
              </Choose>
            </Section>
            <Section>
              <SectionTitle>Top 5 most visited buildings</SectionTitle>
              <Choose>
                <Option value="None">---</Option>
                {/* {this.renderOptions()} */}
              </Choose>
              <Choose>
                <Option value="None">---</Option>
                {/* {this.renderOptions()} */}
              </Choose>
              <Choose>
                <Option value="None">---</Option>
                {/* {this.renderOptions()} */}
              </Choose>
              <Choose>
                <Option value="None">---</Option>
                {/* {this.renderOptions()} */}
              </Choose>
              <Choose>
                <Option value="None">---</Option>
                {/* {this.renderOptions()} */}
              </Choose>
            </Section>

            <RegisterButton type="submit">Register</RegisterButton>
          </FormItems>
        </Form>
      </>
    );
  }
}
