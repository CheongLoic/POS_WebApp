import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";


class Tickets extends Component {

    render() {
        console.log("Hello from Tickets")
        return (
            
            
            <div> 
                <h1>Tickets de caisse 发票</h1>
                <Link to="/"><Button outline color="primary">Retour 返回</Button></Link>
            </div>
        );
    }
}

export default Tickets;