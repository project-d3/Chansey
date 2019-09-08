import React from "react";
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

interface inter {
  school: any;
}

class SignupSchools extends React.Component<inter, { school_list: any }> {
  constructor(props) {
    super(props);
    this.state = {
      school_list: []
    };
  }

  componentDidMount() {
    Axios.get("/api/additional_info_form").then(res => {
      const schools = res.data[this.props.school];
      this.setState({ school_list: schools });
    });
  }

  render() {
    return (
      <>
        <Choose>
          {this.state.school_list.map(school => (
            <option>{school}</option>
          ))}
        </Choose>
      </>
    );
  }
}

export default SignupSchools;
