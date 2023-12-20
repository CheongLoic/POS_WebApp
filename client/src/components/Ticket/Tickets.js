import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import ticketDB from "../../database/tickets.json"
import TicketList from "../Ticket/TicketList"
import { sortDataTicketID_DESC } from '../../backend/localStorageManager';
import ModalPrinterNotConnected from "../Modal/ModalPrinterNotConnected";
import loading from "../../img/loading-gif.gif"

class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            ticketsDB : sortDataTicketID_DESC(ticketDB),
            modalOpenWarning : false, 
            modalLoading : false
        });
        this.setModalWarning = this.setModalWarning.bind(this);
        this.setModalLoading = this.setModalLoading.bind(this);
    }

    setModalWarning = (bool) => {
        this.setState({ modalOpenWarning : bool})
    }

    setModalLoading = (bool) => {
        this.setState({ modalLoading : bool})
    }

    render() {
        // console.log("Hello from Tickets")
        return (
            <div> 
                {this.state.modalOpenWarning ?   document.body.classList.add('active-modal') :  document.body.classList.remove('active-modal')}
                {this.state.modalLoading ?   document.body.classList.add('active-modal') :  document.body.classList.remove('active-modal')}
                {this.state.modalOpenWarning && <ModalPrinterNotConnected setOpenModal={this.setModalWarning}/>}
                {this.state.modalLoading && <div className='modalBackgroundBarcodeNotFound'><img  src={loading} alt='loading'/>  </div>}

                <div style={{margin : "50px 0"}}>
                <h1>Tickets de caisse 收据</h1>
                <Link to="/tickets/addNewTicket"><Button  color="danger" style={{marginBottom : 10, marginRight : 10}}>+ Créer un nouveau ticket 开新收据</Button></Link>
                <Link to="/"><Button  color="primary" style={{marginBottom : 10}}>Retour 后退</Button></Link>
                </div>

                <div className='ticket_list'>
                {
                        this.state.ticketsDB.map((ticket, index) =>( <TicketList key={index} index ={index} ticket_data={ticket}  
                            setModalWarning={this.setModalWarning} setModalLoading={this.setModalLoading}  />))
                    }
                </div>
            </div>
        );
    }
}

export default Tickets;