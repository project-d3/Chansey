import React from "react";
import styled from "styled-components";
import TempNavBar from "../components/tempnavbar";
import FeelingSickCard from "../components/feelingsickcard";
import SymptomForm from "../components/symptomform";
import Hotspots from "../components/hotspots";
import Recents from "../components/recents";

const Page = styled("div")`
  width: 100%;
  height: 100vh;
  background: #feffe8;
`;

const Content = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const RightWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 55%;
  margin-right: auto;
  margin-left: auto;
`;

export default class HomePage extends React.Component<
  {},
  { showform: Boolean }
> {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
  }
  componentWillMount() {
    this.setState({
      showform: false
    });
  }

  showForm() {
    this.setState({
      showform: true
    });
  }

  render() {
    return (
      <>
        <Page>
          <TempNavBar />
          <Content>
            <FeelingSickCard view={this.showForm.bind(this)}></FeelingSickCard>
            <RightWrapper>
              <Hotspots {...this.props}></Hotspots>
              <Recents {...this.props}></Recents>
            </RightWrapper>
          </Content>
        </Page>
        <SymptomForm show={this.state.showform}></SymptomForm>
      </>
    );
  }
}
