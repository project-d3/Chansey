import React from "react";
import styled from "styled-components";
import TempNavBar from "../components/tempnavbar";
import FeelingSickCard from "../components/feelingsickcard";
import Hotspots from "../components/hotspots";
import Recents from "../components/recents";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

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

export default class HomePage extends React.Component<
  RouteComponentProps,
  { buildings: any; symptoms: any }
> {
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

  componentWillMount() {
    this.setState({
      buildings: {},
      symptoms: {}
    });
  }

  componentDidMount() {
    axios
      .post("/api/get_home_data", {
        email: this.props.location.state.email
      })
      .then(res => {
        var buildingnum = {};
        for (var building in res.data["buildings"]) {
          if (res.data["buildings"][building] in buildingnum) {
            buildingnum[res.data["buildings"][building]].push(building);
          } else {
            buildingnum[res.data["buildings"][building]] = [building];
          }
        }
        this.setState({ buildings: buildingnum });

        var symptomnum = {};
        for (var symptom in res.data["symptoms"]) {
          if (res.data["symptoms"][symptom] in symptomnum) {
            symptomnum[res.data["symptoms"][symptom]].push(symptom);
          } else {
            symptomnum[res.data["symptoms"][symptom]] = [symptom];
          }
        }
        this.setState({ symptoms: symptomnum });
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
              <Hotspots
                {...this.props}
                buildings={this.state.buildings}
              ></Hotspots>
              <Recents {...this.props} symptoms={this.state.symptoms}></Recents>
            </RightWrapper>
          </Content>
        </Page>
      </>
    );
  }
}
