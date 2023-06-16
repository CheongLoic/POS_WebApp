import React, { useState } from "react";
import "./ModalPrintTicket.css";
import print from "../../img/print_icon.png"
import no_print from "../../img/noprint_icon.png"
import {Button } from 'reactstrap';
import "./ModalPrintTicket.css"
import { Navigate } from "react-router-dom";
import { setDataInLS } from "../../backend/localStorageManager";


function ModalPrintTicket({ setOpenModal, getCustomer, getTicket,reinitializeData
  // ,setModalLoading, setModalWarningPrinter
} ) {

  
  const [changePage, setChangePage] = useState(false);
  if (changePage) {
    return(  <Navigate  to="/tickets/addNewTicket2"  replace={true} />)
  }

  const toggleModal=()=>{
    setOpenModal(false);
  }

  const toPrint = (boolean)=> {
    // console.log('change page') 
    setChangePage(true)
    
    
    const dataToSend = {
      printTicket : boolean, 
      customerData : getCustomer(),
      ticketData : getTicket()
    }

    setDataInLS("newTicketData",dataToSend)
    // console.log("dataToSend",dataToSend)
    

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    };

    // console.log("reinitializeData")
    reinitializeData()

    fetch('http://localhost:5000/tickets/addNewTicket', requestOptions)
    if (!boolean) setOpenModal(false) // si on ne mettait pas 'if (!boolean)' , le programme ne basculera pas vers la nouvelle page

  }



  return (
    <div className="modalPrintTicket" >
        <div className="modalBackgroundTicket" onClick={toggleModal}></div>
        <div className="modalContainerPrintTicket">
            <div className="titleCloseBtn">
            <button onClick={() => {  setOpenModal(false); }}  >X</button>
            </div>

            <div className="title">
            Imprimer ticket de caisse ? 打印收据吗 ?
            </div>

            <div className="body">
              <Button className="ticket" color="success" onClick={() => toPrint(true)} ><img src={print} height="150vh" width="150vw" alt="ticket"></img> </Button>
              <Button className="ticket" color="danger" onClick={() => toPrint(false)} ><img src={no_print} height="150vh" width="150vw" alt="noticket"></img> </Button>
           
            </div>

        </div>
    </div>
  );
}

export default ModalPrintTicket;