import React from "react";
import {  PDFViewer } from '@react-pdf/renderer';
import ReceiptPDF from '../Ticket/receiptPDF';
import {useParams} from "react-router-dom";
import ticketDB from "../../database/tickets.json"

const ShowReceiptPage = () => {

  let {pdfName} = useParams()
  const PDF_ID = Number(pdfName.split("°")[1].split(".")[0])
  const ticket = ticketDB.filter((inv) => inv.ticket_id === PDF_ID)[0]

  return (
    <div style={{ width :"100vw" , height : "100vh", overflow : "hidden"}}>
        <PDFViewer width={"100%"} height={"100%"} showToolbar={true} >
            <ReceiptPDF ticket={ticket} />
        </PDFViewer>
    </div>
  );
}

export default ShowReceiptPage;