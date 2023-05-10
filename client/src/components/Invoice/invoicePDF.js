import React from 'react';
import { Page, Text, View, Font , Document, StyleSheet } from '@react-pdf/renderer';
import msyh from "./../../msyh.ttf" 

//https://react-pdf.org/styling

Font.register({
  family: '微软雅黑 Light',
  src: msyh,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 ,
    borderBottom : 1,
    borderBottomStyle :1,
    marginLeft : 20,
    marginRight : 20
    
  }, 
  miniTable: { 
    display: "table", 
    width: "29.6%", 
    borderStyle: "solid", 
    borderLeftWidth: 1, 
    marginRight : 20
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  },
  tableColBorderPrice: { 
    width: "15%", 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    borderRight : 1,
    borderRightStyle : "solid",
    borderLeftt : 1,
    borderLeftStyle : "solid",
    paddingBottom : 5
  }, 
  tableColBorderBottomProductName: { 
    width: "60%", 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1,
    fontFamily : "微软雅黑 Light"
  }, 
  tableColNoBorderBottomProductName: { 
    width: "60%", 
    borderLeftWidth: 0, 
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    fontFamily : "微软雅黑 Light"
  }, 
  tableColBorderBottomQty: { 
    width: "10%", 
    borderLeftWidth: 0, 
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1
  }, 
  tableColBorderBottomPrice: { 
    width: "15%", 
    borderLeftWidth: 0, 
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1
  }, 
  tableColNoBorderBottomQty: { 
    width: "10%", 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5
  },
  tableColNoBorderBottomPrice: { 
    width: "15%", 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5
  },
  tableColProductNameHead: { 
    height : 30,
    width: "60%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0",
    // textAlign : "center"
  }, 
  tableColQtyHead: { 
    height : 30,
    width: "10%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0"
  }, 
  tableColProductPriceHead: { 
    height : 30,
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0"
  }, 
  tableColTotal: { 
    // height : 30,
    width: "50%", 
    borderStyle: "solid", 
    // borderWidth: 1, 
    borderRightWidth: 1, 
    borderBottomWidth: 1,
    paddingTop : 7,
    paddingBottom : 7,
    // borderTopWidth: 0 ,
    // backgroundColor : "#C0C0C0"
  }, 
  
  
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 ,
    // fontWeight : "bolder",
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor : "tomato",
    maxHeight  : 100,
    marginBottom : 20
  },
  leftColumn: {
    flexDirection: 'column',
    width: 300,
    // paddingTop: 30,
    paddingRight: 15,
    marginLeft : 20,
    // backgroundColor : "yellow",
  },
  rightColumn: {
    flexDirection: 'column',
    width: 300,
    // paddingTop: 10,
    // paddingRight: 15,
    marginLeft : 15,
    marginRight : 25,
    // marginBottom : 20,
    // backgroundColor : "green",
    border : 2,
    borderStyle : "solid",
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    borderBottomRightRadius : 20, 
    borderBottomLeftRadius : 20,
    // textAlign: 'center',
    display : "flex",
    justifyContent : "center",
    // alignContent : "center",
    alignItems : "center",
  },
});

// const number = 123456.789;
// console.log(new Intl.NumberFormat("de-DE").format(number));
// 123.456,789
// ==> replaceAll()


const InvoicePDF = ({invoiceDB, customer, ticket}) => (
  <Document>
    <Page size="A4" style={styles.body} wrap>
      <View style={{ color: 'black',fontSize: 28, textAlign: 'center', marginBottom: 30 }}>
        <Text>FACTURE n°{invoiceDB.invoice_id}</Text>
      </View>
      
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text >X.H.</Text>
          <Text style={{fontSize: 12}}>19 Rue Civiale</Text>
          <Text style={{fontSize: 12}}>75010 PARIS</Text>
          <Text style={{fontSize: 12}}>TEL : 07.86.31.63.88</Text>
          <Text style={{fontSize: 12}}>SIRET : 887752137 PARIS</Text>
      	</View>
        
        <View style={styles.rightColumn}>
          <Text >{customer.company}</Text>
          <Text style={{fontSize: 12}}>{customer.address}</Text>
          <Text style={{fontSize: 12}}>{customer.zip_code} {customer.city}</Text>
          <Text style={{fontSize: 12}}>TEL : {customer.phone.replace(/(.{2})/g,"$1 ")}</Text>
          <Text style={{fontSize: 12}}>{customer.email}</Text>
        </View>
      </View>
      
      <Text style={{fontSize: 12, marginLeft : 20, marginBottom : 10}}>Date de facturation : {new Date(invoiceDB.date).toLocaleString().substring(0,10)}</Text>
      <Text style={{fontSize: 12, marginLeft : 20, marginBottom : 20}}>Mode de paiement : {ticket.PAYMENT_METHOD}</Text>
      
      <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableColProductNameHead}> 
            <Text style={styles.tableCell}>Désignation des produits</Text> 
          </View> 
          <View style={styles.tableColQtyHead}> 
            <Text style={styles.tableCell}>Quantité</Text> 
          </View> 
          <View style={styles.tableColProductPriceHead}> 
            <Text style={styles.tableCell}>Prix unitaire HT</Text> 
          </View> 
          <View style={styles.tableColProductPriceHead}> 
            <Text style={styles.tableCell}>TOTAL HT</Text> 
          </View> 
        </View>


        {ticket.product_list.map((product, index) => { return (
          product.total_discount !== "" ? (
            <View key={index}> 
              <View  style={styles.tableRow}> 
                <View style={styles.tableColNoBorderBottomProductName}> 
                  <Text style={styles.tableCell}>{product.product_full_name}</Text> 
                </View> 
                <View style={styles.tableColNoBorderBottomQty}> 
                  <Text style={styles.tableCell}>{product.quantity} {product.type_of_sale === "weight" ? "kg" : "pc(s)" }</Text> 
                </View> 
                <View style={styles.tableColNoBorderBottomPrice}>
                  <Text style={styles.tableCell}> {product.type_of_sale === "weight" ? product.product_price+"€/kg" : product.product_price+"€" }</Text> 
                </View>
                <View style={styles.tableColNoBorderBottomPrice}> 
                  <Text style={styles.tableCell}>{product.product_total_price_before_discount}€</Text> 
                </View> 
              </View> 

              <View style={styles.tableRow}> 
                <View style={styles.tableColBorderBottomProductName}> 
                  <Text style={styles.tableCell}>REMISE</Text> 
                </View> 
                <View style={styles.tableColBorderBottomQty}> 
                  <Text style={styles.tableCell}>X</Text> 
                </View> 
                <View style={styles.tableColBorderBottomPrice}>
                  <Text style={styles.tableCell}>X</Text> 
                </View>
                <View style={styles.tableColBorderBottomPrice}> 
                  <Text style={styles.tableCell}>-{product.total_discount}€</Text> 
                </View> 
              </View> 
           </View> 
          )
          :
          (
          <View key={index} style={styles.tableRow}> 
            <View style={styles.tableColBorderBottomProductName}> 
              <Text style={styles.tableCell}>{product.product_full_name}</Text> 
            </View> 
            <View style={styles.tableColBorderBottomQty}> 
              <Text style={styles.tableCell}>{product.quantity} {product.type_of_sale === "weight" ? "kg" : "pc(s)" }</Text> 
            </View> 
            <View style={styles.tableColBorderBottomPrice}>
              <Text style={styles.tableCell}> {product.type_of_sale === "weight" ? product.product_price+"€/kg" : product.product_price+"€" }</Text> 
            </View>
            <View style={styles.tableColBorderBottomPrice}> 
              <Text style={styles.tableCell}>{product.product_total_price_before_discount}€</Text> 
            </View> 
          </View> 
          )
        )
        })}
      </View>

      
      <View style={{left : 408, marginRight : 30}}>
        <View style={styles.miniTable}> 
          <View style={styles.tableRow}> 
            <View style={styles.tableColTotal}> 
            	<Text style={styles.tableCell}>TOTAL HT</Text> 
          	</View> 
            <View style={styles.tableColTotal}> 
            	<Text style={styles.tableCell}>{new Intl.NumberFormat("de-DE").format(ticket.HT).replaceAll(".", " ")}€</Text> 
         	</View> 
          </View>
          <View style={styles.tableRow}> 
            <View style={styles.tableColTotal}> 
            	<Text style={styles.tableCell}>TVA 5.5%</Text> 
          	</View> 
            <View style={styles.tableColTotal}> 
            	<Text style={styles.tableCell}>{new Intl.NumberFormat("de-DE").format(ticket.TVA).replaceAll(".", " ")}€</Text> 
         	</View> 
          </View>
          <View style={{backgroundColor : "#C0C0C0" }}>
            <View style={styles.tableRow}> 
              <View style={styles.tableColTotal}> 
                <Text style={styles.tableCell}>TOTAL TTC</Text> 
                <Text style={styles.tableCell}>A PAYER</Text>
              </View> 
              <View style={styles.tableColTotal}> 
                  <Text style={{margin : "auto", marginTop: 10, fontSize: 10 }}>{new Intl.NumberFormat("de-DE").format(ticket.TTC).replaceAll(".", " ")}€</Text> 
              </View> 
          	</View> 
          </View>
      	</View>
      </View>
      
      
      
      <View style={{ color: 'black' ,  position: 'absolute', bottom :40,left: 0,
    right: 0, fontSize: 10, textAlign: 'center', marginRight : 30,marginLeft : 30  }}>
        <Text>En cas de retard de paiement, il sera appliqué des pénalités égales à trois fois la taux de l'intérêt légal ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40€ (Code de commerce Article L441-6 / Décret n°2012-1115 du 2 octobre 2012).</Text>
      </View>
      
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);




export default InvoicePDF;