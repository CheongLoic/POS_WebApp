import React from "react";
import "./Modal_payment.css";
import CB from "../../img/logo-carte-bleue.png"
import Cash from "../../img/espece-logo.png"
import Cheque from "../../img/bank-cheque-logo.png"
import {Button} from 'reactstrap';

function Modal_product({ setOpenModal, settingMeansOfPayment , getTTC, getInvoiceBool, setModalPrintTicketOpen} ) {

  const meansOfPayment = (means_of_payment) => {
    if (means_of_payment === "CB" ) settingMeansOfPayment("CB")
    else if (means_of_payment === "Espèces" ) settingMeansOfPayment("Espèces")
    else settingMeansOfPayment("Chèque")
    setOpenModal(false)
    setModalPrintTicketOpen(true)
  }

  const toggleModal=()=>{
    setOpenModal(false);
  }

  return (
    <div className="modalPayment">
    <div className="modalBackground" onClick={toggleModal}> </div>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Moyens de paiement<br/>支付手段</h3>
          { getInvoiceBool() ? 
          <h2>{ (getTTC() *1.055).toFixed(2)}€</h2>
          :
          <h2>{getTTC().toFixed(2)}€</h2>
          }
          
        </div>
        <div className="body">
          {/* <p>The next page looks amazing. Hope you want to go there!</p> */}
          <Button color="light" style={{marginRight : 10}} onClick={() => meansOfPayment("CB")}><img src={CB} height="120px" width="140px" alt="logo-carte-bleue" ></img></Button>
          <Button color="light" style={{marginRight : 10}} onClick={() => meansOfPayment("Espèces")}><img src={Cash} height="120px" width="170px" alt="logo-carte-bleue" ></img></Button>
          <Button color="light" onClick={() => meansOfPayment("Chèque")}> <img src={Cheque} height="120px" width="150px" alt="logo-carte-bleue" ></img></Button>

        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>

      {/* <Button  color="warning" style={{margin : "10px"}} onClick={() => {setModalPrintOpen(true)}}>Test modal print</Button> */}
      {/* {modalOpen && <Modal_payment setOpenModal={setModalPaymentOpen} />} */}
    
    </div>
  );
}

export default Modal_product;