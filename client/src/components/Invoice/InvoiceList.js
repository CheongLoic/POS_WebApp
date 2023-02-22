import React, {Component} from 'react';
import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
import print_icon from "../../img/print_icon4.png"
import trash_can_icon from "../../img/red_trash_can_icon.png"
// import fullInvoiceDB from "../../database/invoices.json"
// import { setDataInLS } from '../../backend/localStorageManager';
import customersDB from "../../database/customers.json"
// import invoicesDB from "../../database/invoices.json"



class InvoiceList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            invoiceDB : this.props.invoice_data,
            customer : customersDB.filter((client) => client.id === this.props.invoice_data.customer_id )
        });
    }

    submit =() =>{
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         data : this.state.invoiceDB,
        //         action : "print"
        //     })
        //     };

        // fetch('http://localhost:5000/invoices', requestOptions)
        // .then(response => response.json())
    }

    delete = () => {
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
    }

    render() {
        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.invoiceDB.image);
        return (
                <div className='invoice_icon'> 
                {/* {console.log(this.state.customer[0].gender )} */}
                    <div>Facture N°{this.state.invoiceDB.invoice_id} du  {new Date(this.state.invoiceDB.date).toLocaleString()}</div>
                    <div>de {this.state.customer[0].gender } {this.state.customer[0].last_name } {this.state.customer[0].first_name }</div>
                    <Button className='print_icon' style={{marginRight : 10}} onClick={() => this.submit()} ><img src={print_icon} height="30px" width="30px" border-radius ="11%" alt="print_icon"></img></Button>
                    <Button className='print_icon'  onClick={() => this.delete()} ><img src={trash_can_icon} height="30px" width="30px" border-radius ="11%" alt="trash_can_icon"></img></Button>
                </div>
            );
    }
}

export default InvoiceList;