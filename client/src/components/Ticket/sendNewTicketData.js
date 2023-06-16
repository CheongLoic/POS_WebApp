import React, { useState } from "react";
// import loading from "../../img/loading-gif.gif"
import { getDataFromLS } from '../../backend/localStorageManager';
import { Navigate } from "react-router-dom";
// import {goToPage} from "../goToPage"
import loading from "../../img/loading-gif.gif"
import ModalPrinterNotConnected from "../Modal/ModalPrinterNotConnected"


 const SendNewTicketData =() => {
        const [changePage, setChangePage] = useState(false);
        const [modalWarningPrinter, setOpenModal] = useState(false);
        const [showModalPrinterNotConnected, setShowModalPrinterNotConnected] = useState(0);

        if (changePage) {
          return(  <Navigate  to="/tickets/addNewTicket"  replace={true} />)
        }

        if (modalWarningPrinter || showModalPrinterNotConnected >=1) {
          return( <ModalPrinterNotConnected setOpenModal={setOpenModal} />)
        }
    
        const ticketDB = getDataFromLS("newTicketData")
        
        if (ticketDB !== null ) {
          const dataToSend = {
            action : "print",
            data  : ticketDB.ticketData
          }
  
          console.log("dataToSend :",dataToSend)
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dataToSend)
            };
          fetch('http://localhost:5000/tickets', requestOptions)
          .then(response => {
            if (ticketDB.printTicket) {
              // console.log("response :", response)
              response.json()
              .then(res => {
                    console.log("res.printerConnected :", res.printerConnected)
                    if (res.printerConnected === false  && ticketDB.printTicket) {
                      console.warn("Impossible de se connecter à l'imprimante !")
                      setOpenModal(true)
                      setShowModalPrinterNotConnected(1)
                    } else {
                      setChangePage(true)
                    }
                    localStorage.removeItem('newTicketData')
                }
              )
            }
          })
        }
        
        
        return(
          <div className='modalBackgroundBarcodeNotFound'><img  src={loading} alt='loading'/>  </div>
        )


        

}

export default SendNewTicketData;