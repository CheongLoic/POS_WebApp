import React, {Component} from 'react';
import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
// import print_icon from "../../img/print_icon4.png"
// import trash_can_icon from "../../img/red_trash_can_icon.png"
// import download_logo from "../../img/download-logo.png"
// import loading_gif from "../../img/loading-gif.gif"
import eye_logo from "../../img/eye_logo.png"
// import fullInvoiceDB from "../../database/invoices.json"
// import { setDataInLS } from '../../backend/localStorageManager';
import customersDB from "../../database/customers.json"
import ticketDB from "../../database/tickets.json"
// import invoicesDB from "../../database/invoices.json"
// import InvoicePDF from './invoicePDF';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import { dateFormat } from '../../backend/localStorageManager';


class InvoiceList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            invoiceDB : this.props.invoice_data,
            customer : customersDB.filter((client) => client.id === this.props.invoice_data.customer_id ),
            ticket : ticketDB.filter((ticket) => ticket.ticket_id === this.props.invoice_data.ticket_id)
        });
    }


    // delete = () => {
        // console.log("delete this :" , this.state.invoiceDB)
        // const dataFiltered = fullinvoiceDB.filter((invoice) => invoice.invoice_id !== this.state.invoiceDB.invoice_id)
        // setDataInLS("invoiceDB", dataFiltered)
        // //TO DO :
        // // le invoice supprimer doit réapprovisionner les données produits 
 
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         data : this.state.invoiceDB,
        //         action : "delete",
        //         full_data : fullinvoiceDB
        //     })
        //     };
        // fetch('http://localhost:5000/invoices', requestOptions)
    // }


    render() {
        return (
                <div className='invoice_icon'> 
                    <div>Facture N°{this.state.invoiceDB.invoice_id} du  {dateFormat(this.state.invoiceDB.purchase_date)}</div>
                    <div>de {this.state.customer[0].company } | Montant : {this.state.ticket[0].TTC}€</div>
                    
                    {/* <PDFDownloadLink document={<InvoicePDF invoiceDB={this.state.invoiceDB} customer={this.state.customer[0]} ticket={this.state.ticket[0]} />} fileName={"XH_Facture_n°".concat(this.state.invoiceDB.invoice_id,".pdf")}>
                    {({loading}) => (loading ? 
                        <img src={loading_gif} height="30px" width="30px" border-radius ="11%" alt="loading_gif"></img>
                        : 
                        <Button className='print_icon'  color="light" ><img src={download_logo} height="30px" width="30px" border-radius ="11%" alt="download_logo"></img></Button>)}
                    </PDFDownloadLink> */}

                    <a href={"/invoices/PDF/XH_Facture_n°".concat(this.state.invoiceDB.invoice_id,".pdf")}  target="_blank" rel="noopener noreferrer">
                        <Button className='print_icon' style={{backgroundColor : "white"}} ><img src={eye_logo} height="30px" width="30px" border-radius ="11%" alt="eye_logo"></img></Button>
                    </a>
                    {/* <Button className='print_icon' style={{marginLeft : 50}} onClick={() => this.delete()} ><img src={trash_can_icon} height="30px" width="30px" border-radius ="11%" alt="trash_can_icon"></img></Button> */}
                    
                </div>
            );
    }
}

export default InvoiceList;