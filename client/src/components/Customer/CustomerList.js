import React, {Component} from 'react';
// import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
import "./Customer.css"

class customerList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            customerDB : this.props.customer_data
        });
    }

    render() {
        // console.log("Hello world from CustomerList" + this.props.index);
        return (
            <div className="box">
            <ul style={{fontSize : "70%"}}>
                <li><span className="labelInfoBox">Prénom Nom : </span>{this.state.customerDB.gender +" "+ this.state.customerDB.first_name +" "+ this.state.customerDB.last_name}</li>
                <li><span className="labelInfoBox"> Adresse: </span>{this.state.customerDB.address  +" "+ this.state.customerDB.zip_code   +" "+ this.state.customerDB.city  }</li>
                <li><span className="labelInfoBox">Email: </span>{this.state.customerDB.email} </li>
                <li><span className="labelInfoBox">Phone: </span>{this.state.customerDB.phone} </li>
            </ul>
        </div>
            );
    }
}

export default customerList;