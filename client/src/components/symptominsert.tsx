import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Wrapper = styled("div")`
  background: #c4a29e;
  color: #feffe8;
  height: 70vh;
  margin-bottom: auto;
  margin-top: auto;
  border-radius: 50px;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8vw;
`;

const Title = styled("p")`
  font-family: "Comfortaa", cursive;
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 3vh;
`;

const SymptomDropdown = styled("select")`
  width: 60%;
  margin: auto;
  margin-bottom: 10px;
  position: relative;
  left: 20%;
  font-size: 1.5vw;
`;
const SymptomOption = styled("option")`
  font-size: 1.5vw;
  font-family: "Quicksand", sans-serif;
  color: #464655;
  background: #feffe8;
`;

const DropdownDiv = styled("div")`
  overflow: auto;
  align-items: center;
  height: 60%;
  width: 70%;
  flex-wrap: nowrap;
`;

const ButtonDiv = styled("div")`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  width: 80%;
`;

const Plus = styled(FaPlusCircle)`
  height: 2em;
  width: 2em;
`;

const Minus = styled(FaMinusCircle)`
  height: 2em;
  width: 2em;
  margin-right: 10px;
`;

var symptomslist = [
  "Red Eyes",
  "Stuffy Nose",
  "Diarrhea",
  "Cough",
  "Fever",
  "Lethargic",
  "Sore",
  "Headache",
  "Nausea",
  "Sneezing",
  "Chills",
  "Rash"
];

export default class SymptomInsert extends React.Component<
  { funct: any },
  { numSym: number }
> {
  constructor(props) {
    super(props);
    this.renderDrops = this.renderDrops.bind(this);
    this.renderOpts = this.renderOpts.bind(this);
    this.addOne = this.addOne.bind(this);
    this.subOne = this.subOne.bind(this);
    this.updateSyms = this.updateSyms.bind(this);
  }

  symptoms = [];

  componentWillMount() {
    this.setState({
      numSym: 1
    });
  }

  updateSyms(e) {
    this.symptoms[e.target.dataset.val] = e.target.value;
    this.props.funct(this.symptoms);
  }

  renderDrops() {
    var ret = [];
    for (var i = 0; i < this.state.numSym; i++) {
      ret.push(
        <SymptomDropdown data-val={i} onChange={this.updateSyms}>
          {this.renderOpts()}
        </SymptomDropdown>
      );
    }
    return ret;
  }

  renderOpts() {
    return symptomslist.map(symptom => (
      <SymptomOption value={symptom}>{symptom}</SymptomOption>
    ));
  }

  addOne() {
    this.setState({
      numSym: this.state.numSym + 1
    });
    this.symptoms.push(symptomslist[0]);
    this.props.funct(this.symptoms);
  }

  subOne() {
    if (this.state.numSym > 1) {
      this.setState({
        numSym: this.state.numSym - 1
      });
      this.symptoms.pop();
      this.props.funct(this.symptoms);
    }
  }

  render() {
    return (
      <>
        <Wrapper>
          <Title>Symptoms</Title>
          <DropdownDiv>{this.renderDrops()}</DropdownDiv>
          <ButtonDiv>
            <Minus onClick={this.subOne} />
            <Plus onClick={this.addOne} />
          </ButtonDiv>
        </Wrapper>
      </>
    );
  }
}
