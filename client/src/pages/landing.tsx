import React from "react";
import styled from "styled-components";
import NavBar from "../components/navbar";
import ChanseyPIC from "../components/chansey.png";
import Typing from "react-typing-animation";

const Page = styled("div")`
  width: 100%;
  height: 100vh;
  background: #feffe8;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChanseyDiv = styled("div")`
  background: url(${ChanseyPIC});
  background-size: cover;
  height: 70vh;
  width: 70vh;
  position: absolute;
  top: 20vh;
  left: 3vw;
`;

const SloganDiv = styled("div")`
  /* background: #c4a29e; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  opacity: 0.6;
  width: 55%;
  position: relative;
  right: 2vw;
  top: 10vh;
`;

const SloganText = styled(Typing)`
  color: #c4a29e;
  padding: 5vw;
  font-family: "Quicksand", sans-serif;
  font-size: 4vw;
  font-weight: bold;
`;

export default class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Page>
          <NavBar loggedin={false}></NavBar>
          <ChanseyDiv></ChanseyDiv>
          <SloganDiv>
            <SloganText loop={true} speed={60} startDelay={20}>
              <span>Detect diseases on campus</span>
              <Typing.Backspace count={25} delay={1500} speed={-10} />
              <span>Get alerts of new outbreaks</span>
              <Typing.Backspace count={30} delay={1500} speed={-10} />
              <span>Keep track of your symptoms</span>
              <Typing.Backspace count={28} delay={1500} speed={-10} />
              <span>View trends in illnesses</span>
              <Typing.Backspace count={28} delay={1500} speed={-10} />
              <span>Avoid contaminated spaces</span>
              <Typing.Backspace count={25} delay={1500} speed={-10} />
            </SloganText>
          </SloganDiv>
        </Page>
      </>
    );
  }
}
