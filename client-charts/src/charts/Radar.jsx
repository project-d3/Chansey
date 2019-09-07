import React, { Component } from 'react';
import Chart from 'chart.js';
import {theme, dropdown_style} from './theme';
import { 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

class Line extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'radar',
            data: {
                labels: this.props.building_array,
                datasets: []
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            return " " + data.labels[item.index] + ": " + data.datasets[item.datasetIndex].data[item.index];
                        }
                    }
                },
            }
        });
        for (let i = 0; i < this.props.symptom_array.length; i++) {
            let symptom = this.props.symptom_array[i];
            this.myChart.data.datasets.push({
                label: symptom.name,
                data: symptom.values,
                borderColor: theme[i],
                backgroundColor: theme[i] + "80"
            })
        }
        this.myChart.update();
    }

    render() {
        return(
            <Card style={this.props.style}>
                <CardTitle className="text-center mt-3">
                    <h4>Radar Graph of the Top 3 Symptoms in the Top Buildings</h4>
                </CardTitle>
                <CardBody>
                    <canvas ref={this.chartRef}></canvas>
                </CardBody>
            </Card>
        );
    }
}

export default Line;