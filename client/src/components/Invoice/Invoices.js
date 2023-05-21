import React, {Component} from 'react';
// import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import invoicesDB from "../../database/invoices.json"
// import customerDB from "../../database/customers.json"
// import ticketDB from "../../database/tickets.json"
import InvoiceList from "./InvoiceList"
// import { sortDataInvoiceID_desc ,setDataInLS, sortDataInvoiceID_asc} from '../../backend/localStorageManager';
import { sortDataInvoiceID_desc } from '../../backend/localStorageManager';



class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            All_invoices : sortDataInvoiceID_desc(invoicesDB),
            // show_invoice : false,
            // customerSelected : "N°" +customerDB[0].id + " "+customerDB[0].gender+ " "+customerDB[0].last_name+ " "+customerDB[0].first_name,
            // ticketSelected : "N°" +ticketDB[0].ticket_id + " "+ new Date(ticketDB[0].date_of_purchase).toLocaleString() + " "+ticketDB[0].TTC + "€",
        };
        // this.handleCustomer = this.handleCustomer.bind(this);
        // this.handleTicket = this.handleTicket.bind(this);
        // this.addInvoice = this.addInvoice.bind(this);
        // this.showForm = this.showForm.bind(this);
        // this.cancel = this.cancel.bind(this);
    }

    // handleCustomer =(e) => {
    //   this.setState({ customerSelected : e.target.value})
    //   // console.log(e.target.value)
    // }

    // handleTicket =(e) => {
    //   this.setState({ticketSelected : e.target.value})
    //   // console.log(e.target.value)
    // }

    // showForm = () =>{
    //     this.setState({show_invoice : true})
    // }

    // cancel =() => {
    //     this.setState({show_invoice : false})
    // }

    // addInvoice = () => {
    //   // console.log(this.state.customerSelected)
    //   const current_date = new Date().toISOString()
    //   const invoicesDB_asc = sortDataInvoiceID_asc(invoicesDB) //le JSON est recu décroissant ! 
    //   const ticketID_selected = this.state.ticketSelected.split(' ')[0].substring(2)
    //   const customerID_selected = this.state.customerSelected.split(' ')[0].substring(2)

    //   // TO DO : 
    //   // A BLINDER : le couple (ticketID_selected, customerID_selected) ne doit pas  être déjà dans les données !
    //   const dataToSend = {
    //     invoice_id : Number(invoicesDB_asc[invoicesDB_asc.length -1].invoice_id) +1 ,
    //     ticket_id : Number(ticketID_selected)  ,
    //     customer_id : Number(customerID_selected) ,
    //     date : current_date

    //   }
      
    //   // console.log("dataToSend : ", dataToSend)
    //   // console.log("invoicesDB_asc : ", invoicesDB_asc)
    //   // const newData = invoicesDB_asc.push(dataToSend)  ///===> NE JAMAIS FAIRE CA, IL VA RENVOYER LA LONGUEUR DU TABLEAU
    //   invoicesDB_asc.push(dataToSend)  ///===> NE JAMAIS FAIRE CA, IL VA RENVOYER LA LONGUEUR DU TABLEAU
    //   // console.log("newData : ", newData)
    //   setDataInLS("invoiceDB", invoicesDB_asc)
      
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(invoicesDB_asc)
    //     };

    //   fetch('http://localhost:5000/invoices', requestOptions)

    //   this.setState({show_invoice : false})
    // }
 

    render() {
        // console.log("Hello from Invoices")
        return (
            <div> 
                <h1>Factures 发票</h1>
                <div>
                    {/* {this.state.show_invoice ? 
                      <Form>
                        <FormGroup row>
                          <Label sm={3} style={{fontSize: "70%"}}>Choisissez un client 请选一个客户</Label>
                          <Col sm={8}>
                          <Input type="select" name="customerSelected" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                          onChange={this.handleCustomer} value={this.state.customerSelected}  >
                            {customerDB.map((customer, index) => {return <option key={index}>N°{customer.id} {customer.gender} {customer.last_name} {customer.first_name}</option>} )}
                          </Input>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label sm={3} style={{fontSize: "70%"}}>Choisissez un ticket 请选一个收据</Label>
                          <Col sm={8}>
                          <Input type="select" name="ticketSelected" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                          onChange={this.handleTicket} value={this.state.ticketSelected}  >
                            {ticketDB.map((ticket, index) => {return <option key={index}>N°{ticket.ticket_id} {new Date(ticket.date_of_purchase).toLocaleString()} {ticket.TTC}€</option>} )}
                          </Input>
                          </Col>
                        </FormGroup>
                        <Button  color="success" style={{marginBottom : 40, marginRight : 5, width: "35%"}} onClick={this.addInvoice} >+ Ajouter un facture 加发票</Button>
                        <Button  color="danger" style={{marginBottom : 40,width: "35%"}} onClick={this.cancel} >Annuler 取消</Button>
                      </Form>
                    : 
                    <Button  color="danger" style={{marginBottom : 5, marginTop : 30, width: "35%"}} onClick={this.showForm} >+ Ajouter un facture 加发票</Button>
                    } */}
                
                </div>
                <div><Link to="/"><Button  color="primary" style={{marginBottom : 40, width: "35%"}} >Retour 返回</Button></Link> </div>
                
                <div className='invoice_list'>
                    {
                        this.state.All_invoices.map((invoice, index) =>( <InvoiceList key={index} index ={index} invoice_data={invoice}  />))
                    }
                </div>
            </div>
        );
    }
}

export default Invoices;