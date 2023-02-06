import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";


class Customers extends Component {
    render() {
        console.log("Hello from Customers")
        return (
            <div> 
                <h1>Clients 客户</h1>
                <Link to="/"><Button outline color="primary">Retour 返回</Button></Link>
            </div>
        );
    }
}

export default Customers;