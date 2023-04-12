import React from "react";
import "./Modal2.css";
import CB from "../../img/logo-carte-bleue.png"
import Cash from "../../img/espece-logo.png"
import Cheque from "../../img/bank-cheque-logo.png"
import {Button} from 'reactstrap';

function Modal_payment({ setOpenModal }) {



  return (
    <div className="modalBackground">
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
        </div>
        <div className="body">
          {/* <p>The next page looks amazing. Hope you want to go there!</p> */}
          <Button color="light" style={{marginRight : 10}}><img src={CB} height="120px" width="140px" alt="logo-carte-bleue" ></img></Button>
          <Button color="light" style={{marginRight : 10}}><img src={Cash} height="120px" width="170px" alt="logo-carte-bleue" ></img></Button>
          <Button color="light"> <img src={Cheque} height="120px" width="150px" alt="logo-carte-bleue" ></img></Button>

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

export default Modal_payment;