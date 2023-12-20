import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { dateFormat } from '../../backend/localStorageManager'; 

//https://react-pdf.org/styling


const styles = StyleSheet.create({
  body: {
    padding : "20 5"
  },
  container: {
    flexDirection: 'row',
    // backgroundColor : "tomato",
  },
});

// const number = 123456.789;
// console.log(new Intl.NumberFormat("de-DE").format(number));
// 123.456,789
// ==> replaceAll()
const leftRight = (leftText, rightText, FontSize) => {
  return(
        <View style={styles.container}> 
          <View style={{width: "50%", fontSize : FontSize}}> 
            <Text >{leftText}</Text> 
          </View> 
          <View style={{width: "50%", textAlign: 'right', fontSize : FontSize}}> 
            <Text>{rightText}</Text> 
          </View> 
        </View>
  )
}



const ReportPDF = ({report}) => (
  <Document title={"XH_Rapport_de_caisse_n°".concat(report.id,".pdf")} >
    <Page size={[209.76, 220]} style={styles.body} wrap>
      
      <View style={{display : "flex",
          justifyContent : "center",
          margin : "2 30", 
          // alignContent : "center",
          alignItems : "center"}}>
          <Text style={{fontSize : 20}}>X.H</Text> 
          <Text style={{fontSize: 7}}>19 RUE CIVIALE</Text>
          <Text style={{fontSize: 7}}>75010 PARIS</Text>
          <Text style={{fontSize: 7}}>TEL : 07.86.31.63.88</Text>
          <Text style={{fontSize: 7, fontFamily : 'Courier'}}>--------------------</Text>
          <Text style={{fontSize: 10}}>Ticket Z</Text>
          <Text style={{fontSize: 9}}>Rapport journalier</Text>
          <Text style={{fontSize: 7}}>Rapport n°{report.id}</Text>
          <Text style={{fontSize: 7}}>Période imprimée : </Text>
          <Text style={{fontSize: 7}}>{dateFormat(report.periodtStart)} au {dateFormat(report.periodEnd)}</Text>
          <Text style={{fontSize: 7, fontFamily : 'Courier'}}>--------------------</Text>
      </View> 
{/* 
              // console.log("Nombre de tickets : ", tickets.length)
              // console.log("Total TTC : ", tickets.map((ticket) => Number(report.TTC) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
              // console.log("Total HT : ", tickets.map((ticket) => Number(report.HT) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
              // console.log("Total TVA 5.5% : ", tickets.map((ticket) => Number(report.TVA) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
              // console.log("")
              // console.log("Espèces : ", tickets.filter((ticket) => report.PAYMENT_METHOD === "Espèces").length === 0 ? 0 : tickets.filter((ticket) => report.PAYMENT_METHOD === "Espèces").map((ticket) => Number(report.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
              // console.log("Cartes bancaires : ", tickets.filter((ticket) => report.PAYMENT_METHOD === "CB").length === 0 ? 0 : tickets.filter((ticket) => report.PAYMENT_METHOD === "CB").map((ticket) => Number(report.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
              // console.log("Chèques : " , tickets.filter((ticket) => report.PAYMENT_METHOD === "Chèque").length === 0 ? 0 : tickets.filter((ticket) => report.PAYMENT_METHOD === "Chèque").map((ticket) => Number(report.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
              // console.log("") */}
      
      <Text style={{fontSize: 7}}></Text>
      {leftRight("Nombre de tickets : ",report.total_ticket, 7)}
      {leftRight("Total TTC : ", report.total_TTC+"€", 7)}
      {leftRight("Total HT : ", report.total_HT+"€", 7)}
      {leftRight("Total TVA 5.5% : ", report.total_TVA+"€", 7)}
      
      {leftRight("Total cumul TTC : ", report.total_cumul+"€", 7)}

      {leftRight("Espèces : ", report.total_Espece+"€", 7)}
      {leftRight("Cartes bancaires : ", report.total_CB+"€", 7)}
      {leftRight("Chèques : ", report.total_Cheque+"€", 7)}
      <Text style={{fontSize: 7}}></Text>
      
      {/* <Text style={{fontSize : 7, fontFamily : 'Courier'}}>------------------------------------------------</Text> 
      <Text style={{fontSize: 7,  textAlign :"center"}}>MERCI DE VOTRE VISITE</Text>
      <Text style={{fontSize: 7,  textAlign :"center"}}>A BIENTOT !</Text> */}


    </Page>
  </Document>
);




export default ReportPDF;