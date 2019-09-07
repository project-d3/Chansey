import React, {Component} from 'react';
import {
    Container,
    Col,
    Row
} from 'reactstrap';

import Doughnut from './charts/Doughnut';
import Line from './charts/Line';
import Radar from './charts/Radar';
import Bar from './charts/Bar';

//The data for a bar and a doughnut graph can actually be graphed exactly the same way
const building_array_doughnut_bar = [
  {
      name: "Building 1",
      labels: ["Runny Nose", "Cough", "Sore Throat", "Headache", "Stomach Ache"],
      values: [156, 143, 122, 88, 12]
  },
  {
      name: "Building 2",
      labels: ["Runny Nose", "Cough", "Sore Throat", "Headache", "Stomach Ache"],
      values: [102, 95, 76, 32, 3]
  },
];

//Examples how the data for a line would be formatted
const building_array_line = [
  {
    name: "Building 1",
    values: [156, 143, 122, 88, 12, 12, 1, 2, 3, 4, 5, 1, 2, 3]
  },
  {
    name: "Building 2",
    values: [102, 95, 76, 32, 3]
  }
]

//Examples how the data for a radar would be formatted
const symptom_array_radar = [
  {
    name: "Symptom 1",
    values: [20, 10, 32, 14, 54 ,5]
  },
  {
    name: "Symptom 2",
    values: [9, 19, 29, 39, 12, 14]
  },
  {
    name: "Symptom 3",
    values: [7, 12, 11, 5, 23, 45]
  }
]

const building_array_radar = ["Building 1", "Building 2", "Building 3", "Building 4", "Building 5", "Building 6"];

class Charts extends Component {

    componentDidMount() {
        document.body.style.backgroundColor = "#C4829E";
    }


    render() {
        return(
            <Container fluid>
                <Row className="m-3 p-3">
                    <Col lg="6">
                        <Line style={{height:"100%", backgroundColor: "#FEFFE8"}} building_array={building_array_line}></Line>
                    </Col>
                    <Col lg="6">
                        <Bar style={{height:"100%", backgroundColor: "#FEFFE8"}}  building_array={building_array_doughnut_bar}></Bar>
                    </Col>
                </Row>
                <Row className="m-3 p-3">
                    <Col lg="6">
                        <Radar style={{height:"100%", backgroundColor: "#FEFFE8"}} symptom_array={symptom_array_radar} building_array={building_array_radar}></Radar>
                    </Col>
                    <Col lg="6">
                        <Doughnut style={{height:"100%", backgroundColor: "#FEFFE8"}} building_array={building_array_doughnut_bar}></Doughnut>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Charts;