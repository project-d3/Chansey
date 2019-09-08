import React from "react";
import { Input } from "reactstrap";
import Axios from "axios";
import styled from "styled-components";

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

interface funct {
  funct: any;
}

class SignupSchools extends React.Component<funct, { school_list: any }> {
  constructor(props) {
    super(props);
    this.state = {
      school_list: []
    };
  }

  componentDidMount() {
    Axios.get("/api/additional_info_form").then(res => {
      const schools = Object.keys(res.data);
      this.setState({ school_list: schools });
    });
  }

  render() {
    return (
      <>
        <Choose onChange={this.props.funct}>
          {this.state.school_list.map(school => (
            <option value={school}>{school}</option>
          ))}
        </Choose>
      </>
    );
  }
}

export default SignupSchools;
