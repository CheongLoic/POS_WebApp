import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import ticketsDB from "../../database/tickets.json"
import TicketList from "../Ticket/TicketList"

class Tickets extends Component {
    

    render() {
        // console.log("Hello from Tickets")
        return (
            <div> 
                <h1>Tickets de caisse 收据</h1>
                <Link to="/"><Button  color="primary" >Retour 返回</Button></Link>
                <div>
                {
                        ticketsDB.map((ticket, index) =>( <TicketList key={index} index ={index} ticket_data={ticket}  />))
                    }
                </div>
            </div>
        );
    }
}

export default Tickets;