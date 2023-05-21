import React from "react";
import "./ModalPrintTicket.css";
import print from "../../img/print_icon.png"
import no_print from "../../img/noprint_icon.png"
import {Button } from 'reactstrap';
import "./ModalPrintTicket.css"


function ModalPrintTicket({ setOpenModal, getCustomer, getTicket,reinitializeData} ) {

  

  const toggleModal=()=>{
    setOpenModal(false);
  }

  const toPrint = (boolean)=> {
    
    const dataToSend = {
      printTicket : boolean, 
      customerData : getCustomer(),
      ticketData : getTicket()
    }

    console.log("dataToSend",dataToSend)
    setOpenModal(false)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    };

    fetch('http://localhost:5000/tickets/addNewTicket', requestOptions)
    .then(response => response.json())

    reinitializeData()
  }



  return (
    <div className="modalPrintTicket" >
        <div className="modalBackground" onClick={toggleModal}></div>
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