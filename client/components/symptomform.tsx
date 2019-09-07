import React from "react";
import styled from "styled-components";

const FormPage = styled("div")`
  position: absolute;
  top: 0px;
  left: 0px;
  display: ${props => {
    if (props.visible == true) {
      return "flex";
    } else {
      return "none";
    }
  }};
  width: 100%;
  height: 100vh;
  background: #feffe8;
`;

interface display {
  show: Boolean;
}

export default class SymptomForm extends React.Component<display> {
  render() {
    return (
      <>
        <FormPage visible={this.props.show}></FormPage>
      </>
    );
  }
}
