import React, {Component} from 'react';
import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
import print_icon from "../../img/print_icon4.png"
import eye_logo from "../../img/eye_logo.png"
import trash_can_icon from "../../img/red_trash_can_icon.png"
import fullTicketDB from "../../database/tickets.json"
import { setDataInLS } from '../../backend/localStorageManager';




class TicketList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            ticketDB : this.props.ticket_data,
            
        });
        
    }

    toPrint =() =>{
        // console.log("ticket to print : ", this.state.ticketDB)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data : this.state.ticketDB,
                action : "print"
            })
            };
        
        this.props.setModalLoading(true)

        fetch('http://localhost:5000/tickets', requestOptions)
        .then(response =>
            response.json()
            .then(res => 
                {
                    this.props.setModalLoading(false)
                    if (res.printerConnected === false) {
                        console.warn("Impossible de se connecter à l'imprimante !")
                        this.props.setModalWarning(true)
                    } 
                }
            )
        )
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
        return (
                <div className='ticket_icon'>
                    <div>Ticket n°{this.state.ticketDB.ticket_id} du  {new Date(this.state.ticketDB.date_of_purchase).toLocaleString()} {this.state.ticketDB.TTC}€</div>
                    <Button className='print_icon' style={{marginRight : 50}} onClick={() => this.toPrint()} ><img src={print_icon} height="30px" width="30px" border-radius ="11%" alt="print_icon"></img></Button>
                    <a href={"/tickets/PDF/XH_Ticket_de_caisse_n°".concat(this.state.ticketDB.ticket_id,".pdf")}  target="_blank" rel="noopener noreferrer">
                        <Button className='print_icon' style={{marginRight : 50, backgroundColor : "white"}} ><img src={eye_logo} height="30px" width="30px" border-radius ="11%" alt="eye_logo"></img></Button>
                    </a>
                    <Button className='print_icon'  onClick={() => this.delete()} ><img src={trash_can_icon} height="30px" width="30px" border-radius ="11%" alt="trash_can_icon"></img></Button>
                </div>
            );
    }
}

export default TicketList;