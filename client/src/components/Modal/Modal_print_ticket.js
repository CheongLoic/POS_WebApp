import React from "react";
import "./Modal_invoice.css";
import print from "../../img/print_icon.png"
import no_print from "../../img/noprint_icon.png"
import {Button} from 'reactstrap';

function Modal_payment({ setOpenModal} ) {


  const toggleModal=()=>{
    setOpenModal(false);
  }

  const toPrint = (boolean)=> {
    if (boolean) {
        //do smth
    }
    setOpenModal(false)
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
                <Button className="ticket" color="success" onClick={() => toPrint(true)} ><img src={print} height="200vh" width="200vw" alt="ticket"></img> </Button>
                <Button className="ticket" color="danger" onClick={() => toPrint(false)} ><img src={no_print} height="200vh" width="200vw" alt="noticket"></img> </Button>
            </div>

        </div>
    </div>
  );
}

export default Modal_payment;