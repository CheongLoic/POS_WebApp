import React from 'react';
import { Page, Text, View, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';
import no_img from "../../img/no_image.jpg"
import JsBarcode from "jsbarcode";
import msyh from "./../../msyh.ttf" 
// import SourceSansHanSC from "./../../SourceHanSansSC-VF.ttf"

//https://react-pdf.org/styling

Font.register(
  {
    family: '微软雅黑 Light',
    src: msyh,
  },
  // {
  //   family: 'Source Sans Han SC VF',
  //   src: SourceSansHanSC,
  // }
  );
  
const styles = StyleSheet.create({
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
  tableColBorderBottomID: { 
    width: "5%", 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    flexDirection: 'column',
  }, 
  tableColBorderBottomImage: { 
    width: "15%", 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    flexDirection: 'column',
  }, 
  tableColBorderBottomProductName: { 
    width: "50%", 
    borderLeftWidth: 0, 
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    fontFamily : "微软雅黑 Light",
    // fontFamily : 'Source Sans Han SC VF',
    flexDirection: 'column',
  }, 
  tableColBorderBottomPrice: { 
    width: "10%", 
    borderLeftWidth: 0, 
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    flexDirection: 'column',
  }, 
  tableColBorderBottomBarcode: { 
    width: "20%", 
    borderLeftWidth: 0, 
    borderRight : 1,
    borderRightStyle : "solid",
    paddingBottom : 5,
    borderBottomColor : "#C0C0C0",
    borderBottomStyle : "solid",
    borderBottomWidth : 1,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    flexDirection: 'column',
  }, 
  tableColIDHead: { 
    height : 30,
    width: "5%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  }, 
  tableColImageHead: { 
    height : 30,
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  }, 
  tableColProductNameHead: { 
    height : 30,
    width: "50%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  }, 
  tableColProductPriceHead: { 
    height : 30,
    width: "10%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  }, tableColProductBarcodeHead: { 
    height : 30,
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 ,
    backgroundColor : "#C0C0C0",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  }, 
  
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 ,
    // fontWeight : "bolder",
    // display : "flex",
    // justifyContent : "center",
    // alignItems : "center",
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
  image : {
    height : 50,
    width : 50
  },
  barcodeImage : {
    height : 50,
    width : 80
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

});




const ProductsCataloguePDF = ({productsDB}) => (
    
  <Document>
    <Page size="A4" style={styles.body} wrap>
      <View style={{ color: 'black',fontSize: 28, textAlign: 'center', marginBottom : 30 }}>
        <Text>Catalogue des produits</Text>
      </View>
  
      
        <View style={styles.table}> 
            <View style={styles.tableRow} fixed> 
                <View style={styles.tableColImageHead}> 
                    <Text style={styles.tableCell}>Image</Text> 
                </View> 
                <View style={styles.tableColIDHead}> 
                    <Text style={styles.tableCell}>ID</Text> 
                </View> 
                <View style={styles.tableColProductNameHead}> 
                    <Text style={styles.tableCell}>Désignation des produits</Text> 
                </View> 
                <View style={styles.tableColProductPriceHead}> 
                    <Text style={styles.tableCell}>Prix unitaire</Text> 
                </View> 
                <View style={styles.tableColProductBarcodeHead}> 
                    <Text style={styles.tableCell}>Code-barre</Text> 
                </View> 
            </View>


            {productsDB.map((product, index) => {
                return (
                    <View key={index} style={styles.tableRow}> 
                        
                        <View style={styles.tableColBorderBottomImage}> 
                            <View style={styles.tableCell}> 
                                <Image src={`${product.image}` === "" ? no_img : "./."+`${product.image}` } style={styles.image}  />
                                {/* <Image src={`${product.image}` === "" ? no_img : `${product.image}` } style={styles.image}  /> */}
                            </View> 
                        </View> 
                        <View style={styles.tableColBorderBottomID}> 
                            <Text style={styles.tableCell}>{product.product_id}</Text> 
                        </View> 
                        <View style={styles.tableColBorderBottomProductName}> 
                            <Text style={styles.tableCell}>{product.product_full_name} </Text> 
                        </View> 
                        <View style={styles.tableColBorderBottomPrice}>
                            <Text style={styles.tableCell}> {product.typeOfSale === "weight" ? product.current_price+"€/kg" : product.current_price+"€" }</Text> 
                        </View>
                        
                        <View style={styles.tableColBorderBottomBarcode}> 
                            {product.barCode_list.map((barcode, indexB) => {
                                if ( barcode.barCode !== "") {
                                    let canvas;
                                canvas = document.createElement('canvas');
                                let BARCODE;
                                JsBarcode(canvas, barcode.barCode, {format : "EAN13" } )
                                BARCODE = canvas.toDataURL()
                                return <Image key={indexB} style={styles.barcodeImage}  src={BARCODE}/>
                                } else {
                                    return <View key={indexB}></View>
                                }
                                
                           })}
                        </View> 
                    </View>
            )})}
      
            
          
        </View>


      
      
      
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);




export default ProductsCataloguePDF;