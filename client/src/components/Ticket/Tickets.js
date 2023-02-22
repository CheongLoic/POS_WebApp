import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import ticketDB from "../../database/tickets.json"
import TicketList from "../Ticket/TicketList"
import { sortDataTicketID } from '../../backend/localStorageManager';

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            ticketsDB : sortDataTicketID(ticketDB)
        });
    }

    render() {
        // console.log("Hello from Tickets")
        return (
            <div> 
                <h1>Tickets de caisse 收据</h1>
                <Link to="/"><Button  color="primary" style={{marginBottom : 10}}>Retour 返回</Button></Link>
                <div className='ticket_list'>
                {
                        this.state.ticketsDB.map((ticket, index) =>( <TicketList key={index} index ={index} ticket_data={ticket}  />))
                    }
                </div>
            </div>
        );
    }
}

export default Tickets;