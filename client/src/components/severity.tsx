import React from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
  width: 100%;
  background: #c4a29e;
  color: #feffe8;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
`;

const SeverityTitle = styled("p")`
  font-family: "Comfortaa", sans-serif;
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 3vh;
`;

const Slider = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 5vh;
`;

export default class Severity extends React.Component<
  { funct: any },
  { show: Number }
> {
  constructor(props) {
    super(props);
    this.changeVal = this.changeVal.bind(this);
  }

  SliderChoice = styled("div")`
    width: 2.7vw;
    height: 2.7vw;
    border-radius: 50%;
    border: 5px solid #feffe8;
    background: #c4a29e;
    background: ${props => {
      if (this.state.show >= props.val) {
        return "#feffe8";
      } else {
        return "#c4a29e";
      }
    }};
  `;

  componentWillMount() {
    this.setState({
      show: 0
    });
  }

  changeVal(e) {
    this.setState({
      show: e.target.dataset.val
    });
    this.props.funct(e.target.dataset.val);
  }
  render() {
    return (
      <>
        <Wrapper>
          <SeverityTitle>Severity</SeverityTitle>
          <Slider>
            <this.SliderChoice
              data-val={1}
              onClick={this.changeVal}
              val={1}
            ></this.SliderChoice>
            <this.SliderChoice
              data-val={2}
              onClick={this.changeVal}
              val={2}
            ></this.SliderChoice>
            <this.SliderChoice
              data-val={3}
              onClick={this.changeVal}
              val={3}
            ></this.SliderChoice>
            <this.SliderChoice
              data-val={4}
              onClick={this.changeVal}
              val={4}
            ></this.SliderChoice>
            <this.SliderChoice
              data-val={5}
              onClick={this.changeVal}
              val={5}
            ></this.SliderChoice>
          </Slider>
        </Wrapper>
      </>
    );
  }
}
