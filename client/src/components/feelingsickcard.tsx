import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

const Card = styled("div")`
  background: #f7a9a8;
  width: 40%;
  height: 60%;
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
`;

const ButtonDiv = styled("div")`
  background: #feffe8;
  margin-bottom: 5vh;
  border-radius: 25px;
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
  font-size: 4vw;
  margin: 0px;
  margin: 5vh 5vw;
`;

export default class FeelingSickCard extends React.Component<
  { funct: any },
  { email: any }
> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Card>
          <Message>Feeling sick?</Message>
          <ButtonDiv onClick={this.props.funct}>
            <ButtonText>YES</ButtonText>
          </ButtonDiv>
        </Card>
      </>
    );
  }
}
