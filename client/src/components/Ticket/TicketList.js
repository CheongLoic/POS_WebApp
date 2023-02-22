import React, {Component} from 'react';
import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
import print_icon from "../../img/print_icon4.png"


class TicketList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            ticketDB : this.props.ticket_data
        });
    }

    submit =() =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.ticketDB)
            };

        fetch('http://localhost:5000/tickets', requestOptions)
        // .then(response => response.json())
    }

    render() {
        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.ticketDB.image);
        return (
            <div >
                <div className='ticket_icon'>
                    <div>Ticket N°{this.state.ticketDB.ticket_id} du  {new Date(this.state.ticketDB.date_of_purchase).toLocaleString()} {this.state.ticketDB.TTC}€</div>
                    <Button className='print_icon'  onClick={() => this.submit()} ><img src={print_icon} height="30px" width="30px" border-radius ="11%" alt="print_icon"></img></Button>
                </div>
            </div>
            );
    }
}

export default TicketList;