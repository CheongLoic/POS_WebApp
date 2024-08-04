import React from "react";
import "./ModalBarcodeNotFound.css";
import warning from "../../img/warning-sign-icon.png"


/**
 * 
 * @param {function} setOpenModal : 
 * @returns : A modal with an error message that indicates that the receipt printer is not connected.
 */
function ModalPrinterNotConnected({ setOpenModal} ) {

  const toggleModal=()=>{
    const currentUrl = window.location.href;
    if (currentUrl.includes("addNewTicket2")) {//Only for http://localhost:3000/tickets/addNewTicket2 
      window.location.replace("http://localhost:3000/tickets/addNewTicket") // replace and change the current URL
    } else {
      setOpenModal(false); //close the modal
    }
  }


  return (
    <div className="modalBarcodeNotFound" >
        <div className="modalBackgroundBarcodeNotFound" onClick={toggleModal}></div>
        <div className="modalContainerBarcodeNotFound">
            <div className="titleCloseBtn">
            <button onClick={() => {  setOpenModal(false); }}  >X</button>
            </div>

            <div className="title">
            <h1>Impossible de se connecter à l'imprimante !<br/>无法连接到打印机 !</h1>
            </div>

            <div className="body">
               <img src={warning} width={200} height={200} alt="Warning"></img>
            </div>

        </div>
    </div>
  );
}

export default ModalPrinterNotConnected;