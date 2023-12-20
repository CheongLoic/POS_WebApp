import React from 'react';
import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";
import print_icon from "../../img/print_icon4.png"
import eye_logo from "../../img/eye_logo.png"
import { dateFormat } from '../../backend/localStorageManager'; 

function ReportList({ticket_data,setModalWarning, setModalLoading}) {

    const toPrint =() =>{
        console.log("ticket to print : ", ticket_data)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data : ticket_data
            })
            };
        
        setModalLoading(true)

        fetch('http://localhost:5000/reportToPrint', requestOptions)
        .then(response =>
            response.json()
            .then(res => 
                {
                    setModalLoading(false)
                    if (res.printerConnected === false) {
                        console.warn("Impossible de se connecter à l'imprimante !")
                        setModalWarning(true)
                    } 
                }
            )
        )
    }

  
    

    // render() {
        return (
                <div className='ticket_icon'>
                    <div>Ticket n°{ticket_data.id} du  {dateFormat(ticket_data.periodtStart)} {ticket_data.total_TTC}€</div>
                    <Button className='print_icon' style={{marginRight : 50}} onClick={() => toPrint()} ><img src={print_icon} height="30px" width="30px" border-radius ="11%" alt="print_icon"></img></Button>
                    <a href={"/reports/PDF/XH_Rapport_de_caisse_n°".concat(ticket_data.id,".pdf")}  target="_blank" rel="noopener noreferrer">
                        <Button className='print_icon' style={{backgroundColor : "white"}} ><img src={eye_logo} height="30px" width="30px" border-radius ="11%" alt="eye_logo"></img></Button>
                    </a>
                 </div>
            );
    // }
}

export default ReportList;