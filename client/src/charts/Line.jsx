import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import { theme, dropdown_style } from "./theme";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

const labels = ["9/2", "9/3", "9/4", "9/5", "9/6", "9/7", "9/8"];

class Line extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();

    this.state = {
      symptoms_array: []
    };
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: []
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(item, data) {
              return (
                " " +
                data.labels[item.index] +
                ": " +
                data.datasets[item.datasetIndex].data[item.index]
              );
            }
          }
        },
        scales: {
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    });
    this.update_chart();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.symptoms_array);
    if (nextProps.symptoms_array.length === null) {
      return;
    }
    console.log("here");
    for (let i = 0; i < nextProps.symptoms_array.length; i++) {
      if (
        this.state.symptoms_array.length === 0 ||
        JSON.stringify(this.state.symptoms_array[i]) !=
          JSON.stringify(nextProps.symptoms_array[i])
      ) {
        this.setState({ symptoms_array: nextProps.symptoms_array });
        setTimeout(this.update_chart, 3000);
        return;
      }
    }
  }

  update_chart = () => {
    // if (this.state.symptoms_array === null) return;
    let i = 0;
    this.myChart.data.datasets = [];
    this.state.symptoms_array.forEach(symptom => {
      this.myChart.data.datasets.push({
        label: symptom.name,
        data: symptom.values,
        borderColor: theme[i % 4]
      });
      i++;
    });
    this.myChart.update();
  };

  render() {
    return (
      <Card style={this.props.style}>
        <CardTitle className="text-center mt-3">
          <h4>Common Symptoms Within the past {labels.length} Days</h4>
        </CardTitle>
        <CardBody>
          <canvas ref={this.chartRef}></canvas>
        </CardBody>
      </Card>
    );
  }
}

Line.propTypes = {
  building_array: PropTypes.array.isRequired
};

export default Line;
