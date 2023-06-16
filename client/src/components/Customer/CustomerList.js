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
                <li><span style={{textDecoration: 'underline'}}>Entreprise 公司 : </span>{this.state.customerDB.company}</li>
                <li><span style={{textDecoration: 'underline'}}> Adresse 地址 : </span>{this.state.customerDB.address  +" "+ this.state.customerDB.zip_code   +" "+ this.state.customerDB.city  }</li>
                <li><span style={{textDecoration: 'underline'}}>Email : </span>{this.state.customerDB.email} </li>
                <li><span style={{textDecoration: 'underline'}}>TEL : </span>{this.state.customerDB.phone.replace(/(.{2})/g,"$1 ")} </li>
            </ul>
        </div>
            );
    }
}

export default customerList;