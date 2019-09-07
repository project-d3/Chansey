import React from "react";
import styled from "styled-components";
import TempNavBar from "../components/tempnavbar";
import FeelingSickCard from "../components/feelingsickcard";
import SymptomForm from "../components/symptomform";

const Page = styled("div")`
  width: 100%;
  height: 100vh;
  background: #feffe8;
`;

const Content = styled("div")`
  display: flex;
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
          </Content>
        </Page>
        <SymptomForm show={this.state.showform}></SymptomForm>
      </>
    );
  }
}
