import React from "react";
import "./Modal_invoice.css";
import nofacture from "../../img/facture_logo6.png"
import facture from "../../img/facture_logo5.png"
import {Button} from 'reactstrap';

function Modal_Customer({ setOpenModal, setInvoice , setModalPaymentOpen} ) {


  const toggleModal=()=>{
    setOpenModal(false);
  }

  const invoiceSelected = (boolean)=> {
    setInvoice(boolean) // client waant to get an invoice
    setOpenModal(false); //not display the invoice modal
    setModalPaymentOpen(true)
  }



  return (
    <div className="modalInvoice" >
        <div className="modalBackground" onClick={toggleModal}></div>
        <div className="modalContainerInvoice">
            <div className="titleCloseBtn">
            <button onClick={() => {  setOpenModal(false); }}  >X</button>
            </div>

            <div className="title">
            Etablir une facture ? 开发票吗 ?
            </div>

            <div className="body">
                <Button className="facture" color="success" onClick={() => invoiceSelected(true)} ><img src={facture} height="200vh" width="200vw" alt="facture"></img> </Button>
                <Button className="facture" color="danger" onClick={() => invoiceSelected(false)} ><img src={nofacture} height="200vh" width="200vw" alt="nofacture"></img> </Button>
            </div>

        </div>
    </div>
  );
}

export default Modal_Customer;