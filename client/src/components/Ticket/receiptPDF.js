import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//https://react-pdf.org/styling


const styles = StyleSheet.create({
  body: {
    padding : "20 5"
  },
  table: { 
    display: "table", 
    width: "auto",
    // backgroundColor : 'tomato',
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  },
  tableCell: { 
    margin: "auto", 
    fontSize: 7 ,
    // backgroundColor :"green",
  },
  container: {
    flexDirection: 'row',
    // backgroundColor : "tomato",
  },
  LeftCol: {
    width: "50%",
    // backgroundColor : "yellow",
    fontSize : 7,
  },
  RightCol: {
    width: "50%",
    // backgroundColor : "green",
    textAlign: 'right',
    fontSize : 7,
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

const table_3Col = (leftText,centerText, rightText, WIDTH= ["60%","20%","20%"], position = ["left", "center", "right"]) => {
  return (
    <View style={styles.table}> 
      <View style={styles.tableRow}> 
        <View style={{width : WIDTH[0], textAlign : position[0] }}> 
          <Text style={{fontSize: 7}}>{leftText}</Text> 
        </View> 
        <View style={{width :  WIDTH[1],  textAlign : position[1]}}> 
          <Text style={{fontSize: 7}}>{centerText}</Text> 
        </View> 
        <View style={{width :  WIDTH[2], textAlign : position[2]}}> 
          <Text style={{fontSize: 7}}>{rightText}</Text> 
        </View> 
      </View>
    </View>
  )
}

const receiptHeight = (ticket) => {
  let initialHeight = 241.64-7*1
  let heightToAdd = 0
  for( let i in ticket.product_list){
    if (ticket.product_list[i].type_of_sale !== "weight"  && ticket.product_list[i].total_discount =="" ) {
      heightToAdd += 7
    } else {
      heightToAdd += 14
    }
  }
  return(initialHeight+heightToAdd)
}



const ReceiptPDF = ({ticket}) => (
  <Document title={"XH_Ticket_de_caisse_n°".concat(ticket.ticket_id,".pdf")} >
    <Page size={[209.76, receiptHeight(ticket)]} style={styles.body} wrap>
      
      <View style={{display : "flex",
          justifyContent : "center",
          margin : "2 30", 
          // alignContent : "center",
          alignItems : "center"}}>
          <Text style={{fontSize : 20}}>X.H</Text> 
          <Text style={{fontSize: 7}}>19 RUE CIVIALE</Text>
          <Text style={{fontSize: 7}}>75010 PARIS</Text>
          <Text style={{fontSize: 7}}>TEL : 07.86.31.63.88</Text>
          <Text style={{fontSize: 7}}>SIRET : 887752137 PARIS</Text>
      </View> 
      
      <Text style={{fontSize: 7}}> </Text>
      {leftRight("Date : 21/02/2023 23:30:02", "N°ticket : "+ticket.ticket_id, 7)}
      {leftRight("Caisse n°2", "Vendeur : V1", 7)}
      
      <Text style={{fontSize : 7, fontFamily : 'Courier'}}>------------------------------------------------</Text> 
      {/* {leftRight("TEST1", "TEST2", 7)} */}
      
      {table_3Col("DESIGNATION", "QTExP.U", "MONTANT" )}

      {
        ticket.product_list.map((product, index) => {
          if (product.total_discount !== "") {
            return (
              <View  key={index}>
                <View  style={styles.table}> 
                  <View style={styles.tableRow}> 
                    <View style={{width : "60%", textAlign : "left" }}> 
                      <Text style={{fontSize: 7}}>{product.product_name_on_ticket}</Text> 
                    </View> 
                    <View style={{width : "20%" , textAlign : "center"}}> 
                      <Text style={{fontSize: 7}}>{product.quantity} x {Number(product.product_price).toFixed(2)}€</Text> 
                    </View> 
                    <View style={{width : "20%", textAlign : "right"}}> 
                      <Text style={{fontSize: 7}}>{Number(product.product_total_price_before_discount).toFixed(2)}€</Text> 
                    </View> 
                  </View>
                </View>

                <View  style={styles.table}> 
                  <View style={styles.tableRow}> 
                    <View style={{width : "60%", textAlign : "center" }}> 
                      <Text style={{fontSize: 7}}>REMISE</Text> 
                    </View> 
                    <View style={{width : "20%" , textAlign : "center"}}> 
                      <Text style={{fontSize: 7}}> </Text> 
                    </View> 
                    <View style={{width : "20%", textAlign : "right"}}> 
                      <Text style={{fontSize: 7}}>-{product.total_discount}€</Text> 
                    </View> 
                  </View>
                </View>
              </View>
              
            )
          } else {
            return (
              <View  key={index} style={styles.table}> 
                <View style={styles.tableRow}> 
                  <View style={{width : "60%", textAlign : "left" }}> 
                    <Text style={{fontSize: 7}}>{product.product_name_on_ticket}</Text> 
                  </View> 
                  {product.type_of_sale !=="weight" ? 
                    <View style={{width : "20%" , textAlign : "center"}}> 
                      <Text style={{fontSize: 7}}>{product.quantity} x {Number(product.product_price).toFixed(2)}€</Text> 
                    </View> 
                  : 
                  <View style={{width : "20%" , textAlign : "center"}}> 
                    <Text style={{fontSize: 7}}>{Number(product.quantity).toFixed(3)}kg x {Number(product.product_price).toFixed(2)}€</Text> 
                  </View> 
                  }
                  <View style={{width : "20%", textAlign : "right"}}> 
                    <Text style={{fontSize: 7}}>{Number(product.product_total_price_before_discount).toFixed(2)}€</Text> 
                  </View> 
                </View>
              </View>
            )
            
          }
        })
      }
      

      <Text style={{fontSize : 7, fontFamily : 'Courier'}}>------------------------------------------------</Text> 
      {/* <Text style={{fontSize : 7, fontFamily : 'Courier'}}>------------------------------------------------</Text>  */}
      {/* <Text style={{fontSize: 7}}>TOTAL ARTICLE 2</Text> */}
      {leftRight("TOTAL REMISE", ticket.TOTAL_DISCOUNT +"€", 7)}
      {leftRight("MODE DE PAIEMENT", ticket.PAYMENT_METHOD,7)}
      {leftRight("TOTAL TTC", ticket.TTC +"€",12)}
      {/* <Text style={{fontSize: 7}}> </Text> */}
      {/* <Text style={{fontSize: 7}}> </Text> */}
      

      <Text style={{fontSize: 7}}> </Text>
      {table_3Col("Taux TVA", "TVA", "HT",  ["33.33%","33.33%","33.33%"] )}
      {table_3Col("5.5%", ticket.TVA +"€", ticket.HT+"€",  ["33.33%","33.33%","33.33%"])}
      
      <Text style={{fontSize : 7, fontFamily : 'Courier'}}>------------------------------------------------</Text> 
      <Text style={{fontSize: 7,  textAlign :"center"}}>MERCI DE VOTRE VISITE</Text>
      <Text style={{fontSize: 7,  textAlign :"center"}}>A BIENTOT !</Text>


    </Page>
  </Document>
);




export default ReceiptPDF;