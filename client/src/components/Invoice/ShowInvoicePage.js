import React from "react";
import {  PDFViewer } from '@react-pdf/renderer';
import InvoicePDF from '../Invoice/invoicePDF';
import {useParams} from "react-router-dom";
import invoiceDB from "../../database/invoices.json"
import customerDB from "../../database/customers.json"
import ticketDB from "../../database/tickets.json"

const ShowInvoicePage = () => {

  let {pdfName} = useParams()
  const PDF_ID = Number(pdfName.split("°")[1].split(".")[0])
  const invoice = invoiceDB.filter((inv) => inv.invoice_id === PDF_ID)[0]
  const customer = customerDB.filter((cust) => cust.id === invoice.customer_id)[0]
  const ticket = ticketDB.filter((inv) => inv.ticket_id === invoice.ticket_id)[0]

  return (
    <div style={{ width :"100vw" , height : "100vh", overflow : "hidden"}}>
        <PDFViewer width={"100%"} height={"100%"} showToolbar={true} >
            <InvoicePDF invoiceDB={invoice} customer={customer} ticket={ticket} />
        </PDFViewer>
    </div>
  );
}

export default ShowInvoicePage;