import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    CardTitle
} from 'reactstrap';

const labels = ["Week 0", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9"];

class Line extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        
        this.state = {
            dropdownOpen: false,
            building: 0
        }
        
        this.toggle = this.toggle.bind(this);

        this.change_building = this.change_building.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }



    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Symptoms Count",
                    data: this.props.building_array[this.state.building].values,
                    borderColor: theme[0],
                    backgroundColor: theme[0] + "80",
                    fill: false
                }]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            return " " + data.labels[item.index] + ": " + data.datasets[item.datasetIndex].data[item.index];
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    change_building = (event) => {
        let building_number = event.target.value;
        this.setState({
            building: building_number
        })
        let building = this.props.building_array[building_number];
        this.myChart.data.datasets[0].data = building.values;
        this.myChart.update();
    }

    get_building_options = () => {
        let building_options = [];
        for (let i = 0; i < this.props.building_array.length; i++) {
            building_options.push(
               <DropdownItem key={i} value={i} onClick={this.change_building}>{this.props.building_array[i].name}</DropdownItem> 
            );
        }
        return building_options;
    }
    
    get_dropdown = () => {
        return( 
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle color="link" caret style={dropdown_style} className="btn-lg">
                    {this.props.building_array[this.state.building].name}
                </DropdownToggle>
                <DropdownMenu>
                    {this.get_building_options()}
                </DropdownMenu>
            </Dropdown>
        );
    }


    render() {
        return(
            <Card style={this.props.style}>
                <CardTitle className="text-center mt-3">
                    <h4>10 Week Record of Total Symptoms of {this.get_dropdown()}</h4>
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
}

export default Line;