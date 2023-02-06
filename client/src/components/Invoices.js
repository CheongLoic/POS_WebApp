import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";


class Invoices extends Component {
    render() {
        console.log("Hello from Invoices")
        return (
            <div> 
                <h1>Factures 单据</h1>
                <Link to="/"><Button outline color="primary">Retour 返回</Button></Link>
            </div>
        );
    }
}

export default Invoices;