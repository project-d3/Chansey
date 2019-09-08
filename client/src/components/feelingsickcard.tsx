import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

const Card = styled("div")`
  background: #f7a9a8;
  width: 40%;
  height: 70%;
  font-family: "Comfortaa", cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5vw;
  margin-top: 15vh;
  border-radius: 20px;
`;

const Message = styled("p")`
  color: #464655;
  font-size: 4vw;
  font-weight: bold;
  margin-top: 2vh;
`;

const ButtonDiv = styled("div")`
  background: #feffe8;
  margin-bottom: 2vh;
  color: #c4a29e;
  transition: 0.3s;
  text-decoration: none;
  &:hover {
    background: #c4a29e;
    color: #feffe8;
  }
`;

const ButtonText = styled("p")`
  font-weight: bold;
  font-size: 2vw;
  margin: 0px;
  margin: 2.5vh 2.5vw;
  margin-bottom: 2vh;
  letter-spacing: 0.1em;
`;

const OrText = styled("p")`
  text-transform: uppercase;
  color: #feffe8;
  font-weight: bold;
  font-size: 2vw;
  margin-bottom: 2vh;
  margin-top: 2vh;
`;

const ToCharts = styled("div")`
  background: #feffe8;
  margin-bottom: 4vh;
  color: #c4a29e;
  transition: 0.3s;
  text-decoration: none;
  &:hover {
    background: #c4a29e;
    color: #feffe8;
  }
`;

const ChartText = styled("p")`
  font-weight: bold;
  font-size: 2vw;
  margin: 0px;
  margin: 2.5vh 2.5vw;
`;

interface inter {
  funct: any;
}

type comb = inter & RouteComponentProps;

export default class FeelingSickCard extends React.Component<
  comb,
  { email: any }
> {
  constructor(props) {
    super(props);
    this.handleToCharts = this.handleToCharts.bind(this);
  }

  handleToCharts(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/charts",
      state: { email: this.props.location.state.email }
    });
  }

  render() {
    return (
      <>
        <Card>
          <Message>Feeling sick?</Message>
          <ButtonDiv onClick={this.props.funct}>
            <ButtonText>YES</ButtonText>
          </ButtonDiv>
          <OrText>or</OrText>
          <ToCharts onClick={this.handleToCharts}>
            <ChartText>View Statistics</ChartText>
          </ToCharts>
        </Card>
      </>
    );
  }
}
