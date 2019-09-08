import React, {Component} from "react";
import { Input } from 'reactstrap';
import Axios from 'axios';

class SignupSchools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school_list: []
        }
    }

    componentDidMount() {
        Axios.get("/api/additional_info_form")
            .then(res => {
                const schools = Object.keys(res.data);
                this.setState({school_list: schools});
            });
    }



    render() {
        return(
            <Input type="select" name="select">
                {this.state.school_list.map(school => <option>{school}</option>)}
            </Input>
        );
    }
}

export default SignupSchools