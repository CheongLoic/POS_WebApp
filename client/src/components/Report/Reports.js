import React, { useState}  from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import ticketZDB from "../../database/ticketZ.json"
import ModalPrinterNotConnected from "../Modal/ModalPrinterNotConnected";
import ReportList from "../Report/ReportList"
import loading from "../../img/loading-gif.gif"

const Reports=() => {

    const [modalOpenWarning, setModalWarning] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    // render() {
        console.log("Hello from Reports");
        return (
            <div> 
                {modalOpenWarning ?   document.body.classList.add('active-modal') :  document.body.classList.remove('active-modal')}
                {modalLoading ?   document.body.classList.add('active-modal') :  document.body.classList.remove('active-modal')}
                {modalOpenWarning && <ModalPrinterNotConnected setOpenModal={setModalWarning}/>}
                {modalLoading && <div className='modalBackgroundBarcodeNotFound'><img  src={loading} alt='loading'/>  </div>}
                
                <h1>Rapports 报告</h1>
                <Link to="/"><Button outline color="primary">Retour 返回</Button></Link>

                {/* <Button outline color="primary" onClick={rapportJour}> Imprimer rapport journalier</Button> */}
                {/* {ticketZDB.map((truc, index) => <h1 key={index}>{truc.id}</h1>)} */}

                <div className='ticket_list'>
                {
                        ticketZDB.map((ticket, index) =>( <ReportList key={index} index ={index} ticket_data={ticket}  
                            setModalWarning={setModalWarning} setModalLoading={setModalLoading}  />))
                    }
                </div>
                
            </div>
        );
    // }
}

export default Reports;