import React, { Component } from "react";
import Axios from "axios";
import { RouteComponentProps } from "react-router-dom";
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

class Numbers extends React.Component<
  RouteComponentProps,
  { total_numbers: any; user_numbers: any }
> {
  constructor(props) {
    super(props);

    this.state = {
      user_numbers: 0,
      total_numbers: 0
    };

    this.update_state = this.update_state.bind(this);
  }

  update_state = () => {
    setInterval(() => {
      this.setState(prevState => {
        return {
          total_numbers: prevState.total_numbers + Math.round(Math.random())
        };
      });
    }, 4000);
  };

  componentDidMount() {
    var fullUrl = `/api/chart_numbers?email=${this.props.location.state.email}`;
    Axios.get(fullUrl).then(res => {
      const chart_numbers = res.data;
      console.log(chart_numbers);
      this.setState({
        user_numbers: chart_numbers["user_numbers"],
        total_numbers: chart_numbers["total_numbers"]
      });
    });
    this.update_state();
  }

  render() {
    return (
      <Card style={this.props.style} {...this.props} className="text-center">
        <CardTitle className="mt-3">
          <h4>Numbers</h4>
        </CardTitle>
        <CardBody>
          <span>
            <h5>Number of Reports You Submitted</h5>
            <p>{this.state.user_numbers}</p>
            <h5>Total Number Of Reports</h5>
            <p className="mb-3">{this.state.total_numbers}</p>
          </span>
        </CardBody>
      </Card>
    );
  }
}

export default Numbers;
