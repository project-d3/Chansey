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

class Bar extends Component {

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
            type: 'bar',
            data: {
                labels: this.props.building_array[this.state.building].labels,
                datasets: [{
                    data: this.props.building_array[this.state.building].values,
                    backgroundColor: theme
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
                legend: {
                    display: false
                }
            }
        });
    }

    change_building = (event) => {
        let building_number = event.target.value;
        this.setState({
            building: building_number
        })

        //Update chart
        let building = this.props.building_array[building_number];
        this.myChart.data.labels = building.labels;
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
                    <h4>Bar Chart Breakdown of {this.get_dropdown()}</h4>
                </CardTitle>
                <CardBody>
                    <canvas ref={this.chartRef}></canvas>
                </CardBody>
            </Card>
        );
    }
}

Bar.propTypes = {
    building_array: PropTypes.array.isRequired
}

export default Bar;