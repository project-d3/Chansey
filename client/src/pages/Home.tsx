import React from "react";
import styled from "styled-components";
import TempNavBar from "../components/tempnavbar";
import FeelingSickCard from "../components/feelingsickcard";
import Hotspots from "../components/hotspots";
import Recents from "../components/recents";
import { RouteComponentProps } from "react-router-dom";

const Page = styled("div")`
  width: 100%;
  height: 100vh;
  background: #feffe8;
`;

const Content = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10vh;
`;

export default class HomePage extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
    this.handleToForm = this.handleToForm.bind(this);
  }

  handleToForm() {
    console.log(this.props.location.state.email);
    this.props.history.push({
      pathname: "/symptomform",
      state: { email: this.props.location.state.email }
    });
  }

  render() {
    return (
      <>
        <Page>
          <TempNavBar {...this.props} />
          <Content>
            <FeelingSickCard
              funct={this.handleToForm}
              {...this.props}
            ></FeelingSickCard>
            <RightWrapper>
              <Hotspots {...this.props}></Hotspots>
              <Recents {...this.props}></Recents>
            </RightWrapper>
          </Content>
        </Page>
      </>
    );
  }
}
