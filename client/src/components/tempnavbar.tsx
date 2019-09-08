import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";

const NavWrapper = styled("div")`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background: #f7a9a8;
  font-family: "Comfortaa", sans-serif;
  align-items: center;
  position: relative;
`;
const TitleWrap = styled("div")`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
const Title = styled("p")`
  font-size: 3vw;
  color: #464655;
  font-weight: bold;
  margin: 2.5vh 4vw;
  letter-spacing: 0.1em;
`;

export default class TempNavBar extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.handleToHome = this.handleToHome.bind(this);
  }

  handleToHome(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/home",
      state: { email: this.props.location.state.email }
    });
  }

  render() {
    return (
      <>
        <NavWrapper>
          <TitleWrap onClick={this.handleToHome}>
            <Title>Chansey</Title>
          </TitleWrap>
        </NavWrapper>
      </>
    );
  }
}
