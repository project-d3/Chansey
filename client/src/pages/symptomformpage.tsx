import React from "react";
import styled from "styled-components";
import SymptomInsert from "../components/symptominsert";
import Severity from "../components/severity";
import TempNavBar from "../components/tempnavbar";
import InsertSymptomAge from "../components/insertsymptomage";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Page = styled("div")`
  background: #feffe8;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const RightDiv = styled("div")`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`;

const Content = styled("form")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: auto;
`;

const SubmitSymptoms = styled("button")`
  align-self: flex-end;
  background: #feffe8;
  color: #c4a29e;
  border: 10px solid #c4a29e;
  font-size: 2vw;
  padding: 1.5vh 1.5vw;
  border-radius: 50px;
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  letter-spacing: 0.1em;
  transition: 0.25s;
  &:hover {
    color: #feffe8;
    background: #c4a29e;
  }
`;

class SymptomFormPage extends React.Component<
  RouteComponentProps,
  { severity: number; days: any; symptoms: any }
> {
  constructor(props) {
    super(props);
    this.changeSeverity = this.changeSeverity.bind(this);
    this.changeAge = this.changeAge.bind(this);
    this.changeSymptoms = this.changeSymptoms.bind(this);
    this.submitSymptoms = this.submitSymptoms.bind(this);
  }

  componentWillMount() {
    this.setState({
      severity: 0,
      days: 0,
      symptoms: []
    });
  }

  submitSymptoms(e) {
    e.preventDefault();
    console.log(this.props.location.state.email);
    axios
      .post("/api/submit_report", {
        severity: this.state.severity,
        date: this.state.days,
        email: this.props.location.state.email,
        symptoms: this.state.symptoms.join(",")
      })
      .then(res => {
        console.log(res.data["message"]);
        if (res.data["status"] == true) {
          this.props.history.push({
            pathname: "/home",
            state: { email: this.props.location.state.email }
          });
        }
      });
  }

  changeSeverity(num) {
    this.setState({ severity: num });
  }

  changeAge(num) {
    if (num != null) {
      this.setState({ days: num });
    }
  }

  changeSymptoms(arr) {
    this.setState({ symptoms: arr });
  }

  render() {
    return (
      <>
        <Page>
          <TempNavBar {...this.props} />
          <Content onSubmit={this.submitSymptoms}>
            <SymptomInsert funct={this.changeSymptoms} />
            <RightDiv>
              <Severity funct={this.changeSeverity} />
              <InsertSymptomAge funct={this.changeAge} />
              <SubmitSymptoms>Submit</SubmitSymptoms>
            </RightDiv>
          </Content>
        </Page>
      </>
    );
  }
}

export default withRouter(SymptomFormPage);
