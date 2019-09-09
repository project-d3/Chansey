import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { MdAttachMoney } from "react-icons/md";

const NavWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
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

const EmailText = styled("p")`
  font-size: 2.5vw;
  color: #464655;
  font-weight: bold;
  margin: 2.2vh 4vw;
  letter-spacing: 0.1em;
`;

const RightNav = styled("div")`
  display: flex;
  align-items: center;
`;

const CreditsDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7vw;
  font-family: "Quicksand", sans-serif;
  background: #feffe8;
  color: #f7a9a8;
  box-shadow: 2px 2px 2px 3px #c4c4c4;
  font-weight: bold;
`;

const CreditsText = styled("p")`
  margin: 0.5vw;
`;

const MoneySign = styled(MdAttachMoney)`
  border-radius: 50%;
  border: 2px solid #f7a9a8;
  font-size: 1.5vw;
  margin: 0.5vw;
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
          <RightNav>
            <CreditsDiv>
              <CreditsText>Credits: </CreditsText>
              <MoneySign></MoneySign>
              <CreditsText>14</CreditsText>
            </CreditsDiv>
            <EmailText>{this.props.location.state.email}</EmailText>
          </RightNav>
        </NavWrapper>
      </>
    );
  }
}
