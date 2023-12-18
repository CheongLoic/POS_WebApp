import React from "react";
import {  PDFViewer } from '@react-pdf/renderer';
import ReportPDF from '../Report/reportPDF';
import {useParams} from "react-router-dom";
import ticketZDB from "../../database/ticketZ.json"

const ShowReportPage = () => {

  let {pdfName} = useParams()
  const PDF_ID = Number(pdfName.split("°")[1].split(".")[0])
  const report = ticketZDB.filter((inv) => inv.id === PDF_ID)[0]

  return (
    <div style={{ width :"100vw" , height : "100vh", overflow : "hidden"}}>
        <PDFViewer width={"100%"} height={"100%"} showToolbar={true} >
            <ReportPDF report={report} />
        </PDFViewer>
    </div>
  );
}

export default ShowReportPage;