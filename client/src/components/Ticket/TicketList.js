import React, {Component} from 'react';
import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
import print_icon from "../../img/print_icon4.png"
import trash_can_icon from "../../img/red_trash_can_icon.png"
import fullTicketDB from "../../database/tickets.json"
import { setDataInLS } from '../../backend/localStorageManager';



class TicketList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            ticketDB : this.props.ticket_data
        });
    }

    toPrint =() =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data : this.state.ticketDB,
                action : "print"
            })
            };

        fetch('http://localhost:5000/tickets', requestOptions)
        // .then(response => response.json())
    }

    delete = () => {
        // console.log("delete this :" , this.state.ticketDB)
        const dataFiltered = fullTicketDB.filter((ticket) => ticket.ticket_id !== this.state.ticketDB.ticket_id)
        setDataInLS("ticketDB", dataFiltered)
        //TO DO :
        // le ticket supprimer doit réapprovisionner les données produits 
 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data : this.state.ticketDB,
                action : "delete",
                full_data : fullTicketDB
            })
            };
        fetch('http://localhost:5000/tickets', requestOptions)
    }

    render() {
        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.ticketDB.image);
        return (
                <div className='ticket_icon'>
                    <div>Ticket N°{this.state.ticketDB.ticket_id} du  {new Date(this.state.ticketDB.date_of_purchase).toLocaleString()} {this.state.ticketDB.TTC}€</div>
                    <Button className='print_icon' style={{marginRight : 10}} onClick={() => this.toPrint()} ><img src={print_icon} height="30px" width="30px" border-radius ="11%" alt="print_icon"></img></Button>
                    <Button className='print_icon'  onClick={() => this.delete()} ><img src={trash_can_icon} height="30px" width="30px" border-radius ="11%" alt="trash_can_icon"></img></Button>
                </div>
            );
    }
}

export default TicketList;