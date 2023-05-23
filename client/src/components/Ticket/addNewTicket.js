import React, { useState, useEffect} from 'react';
// import {Link, Navigate } from "react-router-dom";
import {Link } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';
import discountDB from "../../database/discounts.json"
// import Modal from "../Modal/Modal2"
import ModalPayment from "../Modal/ModalPayment"
import ModalProductWithoutBarcode from "../Modal/ModalProductWithoutBarcode"
import ModalInvoice from "../Modal/ModalInvoice"
import ModalPrintTicket from "../Modal/ModalPrintTicket"
import ModalCustomer from '../Modal/ModalCustomer'
import ModalBarcodeNotFound from '../Modal/ModalBarcodeNotFound'
import ticketDB from "../../database/tickets.json"
import { sortDataTicketID_ASC } from '../../backend/localStorageManager';

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewTicket = () => {

  let barcodeScan = "";
  // let barcodeScan_history = [];
  let product_list = [];
  // let TOTAL_DISCOUNT_IN_THE_BASKET = 0;
  // let TTC = 0;
  const barCodeAvailable_productID = getDataFromLS("barCodeAvailable_productID"); // [{barCode: '4903001014761', productID: 2}, ...]
  const productDB_from_LS = getDataFromLS("productDB");
  // const ticketDB = getDataFromLS("ticketDB");
  const [TTC, setTTC] = useState(0); // To display on the screen 
  const [modalOpenPayment, setModalPaymentOpen] = useState(false);
  const [modalOpenProduct, setModalProductOpen] = useState(false);
  const [modalOpenInvoice, setModalInvoiceOpen] = useState(false);
  const [modalOpenCustomer, setModalCustomerOpen] = useState(false);
  const [modalPrintTicket, setModalPrintTicketOpen] = useState(false);
  const [modalOpenWarning, setModalWarning] = useState(false);
  const [count, setCount] = useState(0)
  const [invoice, setInvoice] = useState(false)
  const [customer, setCustomer] = useState({})
  const [newTicket, setTicket] = useState({})
  const [product_list_to_display_on_screen, setProduct_list] = useState([]);
  // [{
  //   product_id: "",
  //   product_full_name: "",
  //   product_name_on_ticket: "",
  //   quantity: "",
  //   product_price: "",
  //   product_total_price_before_discount: "", 
  //   total_discount : "",
  //   type_of_sale : "",
  //   image : ""
  // }, ...] <==========  THIS IS product_list_to_display_on_screen

  

  useEffect(() => {
    
      function handleKeyDown(e){
          // if key code is 13 ( Enter ) then check if barcodeScan > 3
          if (e.keyCode === 13 && barcodeScan.length > 3 && barcodeScan.length <= 13 && !isNaN(Number(barcodeScan))) {
              // console.log("handleKeyDown : CHECK barcodeScan  : ", barcodeScan)
              // console.log("handleKeyDown : CHECK barcodeScan length : ", barcodeScan.length)
              let newBarcodeScan = barcodeScan
              if (barcodeScan.length < 13) {
                newBarcodeScan = "0".repeat(13-barcodeScan.length) + newBarcodeScan
                // console.log("handleKeyDown : NEW barcodeScan  : ", newBarcodeScan)
              }
              handleScan(newBarcodeScan);
              const test = handleProduct(newBarcodeScan);
              // product_list.push(test)
              console.log('product_list from handleKeyDown : ' , test)
              // console.log('TTC from handleKeyDown : ' , TTC)
              // console.log('barcodeScan_history from handleKeyDown : ' , barcodeScan_history)

              return
          }

          //skip if pressed key is Shift key
          if (e.keyCode === 16) {
            console.log("key shift ")
              return
          }
          
          //push keycode to barcode scan variable
          barcodeScan += e.key;

          setTimeout(() => {
              barcodeScan = ""
          }, 100)

          console.log('------------------------------------------END OF SCANNING-----------------------------------------------------')
      }

      document.addEventListener('keydown', handleKeyDown);

      return function cleanup(){
          document.removeEventListener('keydown', handleKeyDown);
      }
  })

  
  

  /*
  Parameter :
  - barcode_string (string): new barcode scanned 
  */
  const  handleScan = (barcode_string) => {
      // document.querySelector("#last_barcode").innerHTML = scanned_barcode
      // console.log("set setBarcode")
      // console.log("At the beginning barcodeScanned :", barcodeScanned) // vide  a la 1ere iteration
      if (count === 0 ) {
        localStorage.removeItem("barcodeScan_history")
        localStorage.removeItem("product_basket_LS")
        localStorage.removeItem("TTC_LS")
        localStorage.removeItem("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
      }
      setCount(count+1)
      document.title = `You clicked ${count} times`
      let barcodeScan_history = getDataFromLS("barcodeScan_history")
      let product_basket_LS = getDataFromLS("product_basket_LS")
      let TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
      let TTC_LS = getDataFromLS("TTC_LS")
      if (barcodeScan_history === null && product_basket_LS === null && TTC_LS === null && TOTAL_DISCOUNT_IN_THE_BASKET_LS === null) {
        // console.log("check barcodeScan_history value (empty):", barcodeScan_history) //vide au 1er scan
        // console.log("check barcodeScan_history value (not empty):", barcodeScan_history) // pas vide au 1er scan
        // console.log("check product_basket_LS value (null):", product_basket_LS) // pas vide au 1er scan
        barcodeScan_history = [barcode_string]
        setDataInLS("barcodeScan_history", barcodeScan_history)
        product_basket_LS = [];
        TTC_LS = 0;
        TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0
        // console.log("check product_basket_LS value (empty array):", product_basket_LS) // pas vide au 1er scan
        // console.log("check TTC_LS value (not empty):", TTC_LS) // pas vide au 1er scan
        // console.log("check TOTAL_DISCOUNT_IN_THE_BASKET_LS value :", TOTAL_DISCOUNT_IN_THE_BASKET_LS) // pas vide au 1er scan
        setDataInLS("product_basket_LS", product_basket_LS)
        setDataInLS("TTC_LS", TTC_LS)
        setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
      }
      else {
        barcodeScan_history.push(barcode_string)
        setDataInLS("barcodeScan_history", barcodeScan_history)
      }
    //   console.log("after setting barcodeScan_history :", barcodeScan_history) // pas vide au 1er scan
    //  console.log("after setting barcode barcodeScanned :", barcodeScanned) // vide au 1er scan
  }

  

    const handleProduct = (barcode_string) => {
      let barcodeScan_history = getDataFromLS("barcodeScan_history")
      // console.log("barcodeScan_history at the beginning of handleProduct :", barcodeScan_history) // pas vide au 1er scan
      // console.log("barcodeScan1", barcodeScanned) // vide au 1er scan
      // console.log("before set setProduct_list")

      // setProduct_list(() => {
        let Products_scanned = getDataFromLS("product_basket_LS")
        // let TTC_LS = getDataFromLS("TTC_LS")
        
        // let TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
        if (Products_scanned === null  
          // && TOTAL_DISCOUNT_IN_THE_BASKET_LS === null 
          // && TTC_LS === null
          ) {
          Products_scanned = [] //to return at the end
          // TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0
          // TTC_LS = 0 
        } 
        // console.log("TTC_LS at the beginning of handleProduct : ", TTC_LS, 'typeof :', typeof(TTC_LS) )
        // console.log("TOTAL_DISCOUNT_IN_THE_BASKET_LS at the beginning of handleProduct : ", TOTAL_DISCOUNT_IN_THE_BASKET_LS, 'typeof :', typeof(TOTAL_DISCOUNT_IN_THE_BASKET_LS) )
        // let barcode_analyzed = [] //Store all the barcodes analyzed
        // let iter = 0
        //total discount in the basket
        let TTC_LS = 0
        let TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0
        // console.log("set setProduct_list")
        // console.log("barcodeScanned : ", barcodeScanned, ". Longueur : ", barcodeScanned.length)
        // if (barcodeScan_history.length >=0) {// A commenter apres  
          console.log("barcodeScan_history : ", barcodeScan_history, ". Longueur : ", barcodeScan_history.length)
          console.log("barcode scanned : ", barcode_string)
          // for (let i in barcodeScan_history){
            // console.log("iteration : ", iter, ", reading barcode : ", barcodeScan_history[i])
            // iter += 1
            // if (barcode_analyzed.filter((string)=> string === barcodeScan_history[i]).length === 0) { //Does the barcode have been already analyzed ?
              // barcode_analyzed.push(barcodeScan_history[i])
              // console.log("Analyzed barcode : ", barcode_analyzed)
            

              let barcode_productID = barCodeAvailable_productID.filter((item) => item.barCode === barcode_string)
              console.log("barcode_productID : ", barcode_productID)
              if ( barcode_productID.length !== 0  ) {//Is the barcode stored in the database ? If Yes, do the following code below
              
                const productDB = productDB_from_LS.filter((item) => item.product_id === barcode_productID[0].productID)
                console.log("productDB_from_LS : ", productDB_from_LS) 
                console.log("productDB : ", productDB)
                const product_discountDB = discountDB.filter((discount) => discount.product_id === barcode_productID[0].productID)
                let tot_discount = 0 //total discount for the product
                let product_tot_price_before_discount = 0
                let qte = 0

                const Products_scanned_filtered = Products_scanned.filter((product)=> product.product_id === productDB[0].product_id) //quantity of product that the customer had chosen to put in its basket
                if (Products_scanned_filtered.length === 0) {
                  //Produit scanné pour la 1ère fois 
                  qte = 1
                  //  product_tot_price_before_discount = Math.trunc(qte * Number(productDB[0].current_price) *100)/100
                   product_tot_price_before_discount = qte * Number(productDB[0].current_price)
                   product_tot_price_before_discount = Number(product_tot_price_before_discount.toFixed(2))
                } else {
                  //Produit scanné pour la énième fois
                  qte = Number(Products_scanned_filtered[0].quantity) + 1 
                  // product_tot_price_before_discount = Math.trunc(qte * Number(productDB[0].current_price) *100)/100
                  product_tot_price_before_discount = qte * Number(productDB[0].current_price)
                  product_tot_price_before_discount = Number(product_tot_price_before_discount.toFixed(2))
                  console.log("product_tot_price_before_discount :", product_tot_price_before_discount)
                  console.log("product_tot_price_before_discount 2 :", qte * Number(productDB[0].current_price))

                  if (product_discountDB.length >0) { // Is there a discount for the barcode ? If Yes, do the following code below
                  
                    const qty_for_discount = product_discountDB[0].quantity_for_discount //int <==== condition for the discount, the customer has to get a certain amount of this product to claim the discount
                    const total_discount_when_condition_met_once = product_discountDB[0].total_discount_when_condition_met_once
                    // const reste = qte % qty_for_discount //Reste de la division euclidienne
                    const quotient = Math.trunc(qte / qty_for_discount) //Le quotient de la division euclidienne sert de multiplicateur pour calculer le montant de la remise totale
                    console.log('quotient :', quotient)
                    if (quotient >=1 ) {
                      // tot_discount += Math.trunc( quotient * total_discount_when_condition_met_once  *100)/100
                      tot_discount +=  quotient * total_discount_when_condition_met_once  
                      tot_discount = Number(tot_discount.toFixed(2))
                      // TOTAL_DISCOUNT_IN_THE_BASKET_LS = Math.trunc( (TOTAL_DISCOUNT_IN_THE_BASKET_LS + tot_discount ) *100)/100
                      // setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
  
                      console.log("/!\\ PRODUIT A DISCOUNTER !!! TOTAL DISCOUNT : ", tot_discount)
                    } 
                  }
                }
                console.log("qte : ", qte)
                console.log("product_tot_price_before_discount : ", product_tot_price_before_discount, 'typeof : ', typeof(product_tot_price_before_discount))
                console.log("product_discountDB : ", product_discountDB)

                if (Products_scanned_filtered.length === 0) {
                  const product = {
                    product_id: barcode_productID[0].productID,
                    product_full_name: productDB[0].product_full_name,
                    product_name_on_ticket: productDB[0].product_name_on_ticket,
                    quantity: qte.toString(),
                    product_price: productDB[0].current_price,
                    product_total_price_before_discount: product_tot_price_before_discount.toFixed(2), 
                    total_discount : tot_discount === 0 ? "" : tot_discount.toFixed(2),
                    type_of_sale : productDB[0].typeOfSale,
                    image : productDB[0].image
                  }
                  Products_scanned.push(product)
                  // console.log("Products_scanned : ", Products_scanned)
                  product_list.push(product)
                } else {
                  let index = -1 
                  const filteredObj = Products_scanned.find(function(item, i){
                    if(item.product_id === barcode_productID[0].productID ){
                      index = i;
                      return i;
                    }
                  })
                  console.log("filteredObj :", filteredObj) //return undefined but actually is an array
                  console.log("index :", index)

                  Products_scanned[index].quantity = qte.toString()
                  Products_scanned[index].product_total_price_before_discount =  product_tot_price_before_discount.toFixed(2)
                  Products_scanned[index].total_discount = tot_discount === 0 ? "" : tot_discount.toFixed(2)
                }

                for (let i in Products_scanned) {
                  TTC_LS += Number(Products_scanned[i].product_total_price_before_discount)
                  // console.log("TTC_LS before 'if (Products_scanned[i].total_discount !== \"\") ' : ", TTC_LS, 'typeof :', typeof(TTC_LS) )

                   if (Products_scanned[i].total_discount !== "") {
                    TTC_LS -= Number(Products_scanned[i].total_discount)
                    // console.log("TTC_LS after 'if (Products_scanned[i].total_discount !== \"\") ' : ", TTC_LS, 'typeof :', typeof(TTC_LS) )
                    // console.log("TOTAL_DISCOUNT_IN_THE_BASKET_LS : ", TOTAL_DISCOUNT_IN_THE_BASKET_LS, 'typeof :', typeof(TOTAL_DISCOUNT_IN_THE_BASKET_LS) )
                    // console.log("Products_scanned[i].tot_discount : ", Products_scanned[i].total_discount, 'typeof :', typeof(Products_scanned[i].total_discount) )
                    TOTAL_DISCOUNT_IN_THE_BASKET_LS +=  Number(Products_scanned[i].total_discount)
                   }
                }
                console.log("Products_scanned : ", Products_scanned)
                // let  TTC_LS = getDataFromLS("TTC_LS")
                // TTC_LS = getDataFromLS('TTC_LS') + Math.trunc((product_tot_price_before_discount - tot_discount) *100)/100
                setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
                console.log("TOTAL_DISCOUNT_IN_THE_BASKET_LS : ", TOTAL_DISCOUNT_IN_THE_BASKET_LS, 'typeof :', typeof(TOTAL_DISCOUNT_IN_THE_BASKET_LS) )
                setDataInLS("TTC_LS", TTC_LS)
                console.log("TTC_LS : ", TTC_LS, 'typeof :', typeof(TTC_LS) )
                setTTC(TTC_LS)
                console.log("TTC : ", TTC)

                
              } else {
                //the barcode is not stored in the database 
                console.warn("LE BARCODE ", barcode_string, "N'EST PAS RECONNU !")
                setModalWarning(true)

                //TO DO : display  a messega error on the screen
              }

      //       } else {
      //         //the barcode has already been annalyzed
      //         console.log("LE BARCODE ", barcodeScan_history[i], "EST ANALYSE POUR LA ENIEME FOIS !")
      //  //           let cards = getCards();
      //           // let index = cards.findIndex(obj => obj.id === card.id);
      //           // cards[index] = card;
      //       }
          // }//end of for loop
        // }

        // console.log('barcodeScanned before handleProduct end :', barcodeScanned) // utiliser barcodeScanned uniquement pour l'afficher sur fenetre
        console.log('barcodeScan_history before handleProduct end :', barcodeScan_history)

        setProduct_list(Products_scanned)
        setDataInLS('product_basket_LS',Products_scanned)
        return Products_scanned // product_list = Products_scanned 
      // });
    }


    const saveTicket =(invoiceBool, methodePaiement) => {

      let  TTC_LS = getDataFromLS("TTC_LS") // TTC stored in local storage
      let TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
      // console.log("TTC from toPrint  : ", TTC_LS)
      // const HT = Math.round(TTC_LS / 1.055 *100) /100 //
      // const TVA =  Math.round((TTC_LS - HT) *100)/100 // TVA 5.5%

      let HT,TVA, TTC_invoice = 0

      if (invoiceBool) {
        HT = TTC_LS
        TTC_invoice = HT * 1.055
        TVA = TTC_invoice - HT
      } else {
        HT = Math.round(TTC_LS / 1.055 *100) /100 
        TVA = Math.round((TTC_LS - HT) *100)/100 // TVA 5.5%
      }

      let sortedTickedDB_ID_ASC = sortDataTicketID_ASC(ticketDB)
      
      const newTicketDB = {
        // ticket_id : ticketDB[ Object.keys(ticketDB).sort().pop() ].ticket_id +1 ,
        ticket_id : sortedTickedDB_ID_ASC[ sortedTickedDB_ID_ASC.length -1 ].ticket_id + 1 ,
        invoice : invoiceBool, //boolean, ticket de caisse avec facture ?
        date_of_purchase : new Date().toISOString(),
        product_list : product_list_to_display_on_screen,//vide pour le moment
        PAYMENT_METHOD: methodePaiement,
        TOTAL_DISCOUNT : TOTAL_DISCOUNT_IN_THE_BASKET_LS.toFixed(2).toString(),
        RECU: "",
        RENDU: "",
        TVA: TVA.toFixed(2), //string
        HT: HT.toFixed(2), //string
        TTC: invoiceBool ? TTC_invoice.toFixed(2) : TTC_LS.toFixed(2) //string
      }

      setTicket(newTicketDB)
      // console.log("newTicketDB : ", newTicketDB)
      // console.log("newTicket : ", newTicket)
  }


  const goBackButton =() => {
    // localStorage.removeItem("barcodes")
    localStorage.removeItem("TTC_LS")
    localStorage.removeItem("product_basket_LS")
    localStorage.removeItem("barcodeScan_history")
    localStorage.removeItem("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
  }

  const getTTC = () =>{
    return TTC
  }

  const getInvoiceBool = () => {
    return invoice
  }

  const getCustomer = () => {
    return customer
  }

  const getTicket = () => {
    return newTicket
  }

  

  const removeProductButton =(index) => {
    // localStorage.removeItem("barcodes")
    // localStorage.removeItem("TTC_LS")
    // localStorage.removeItem("product_basket_LS")
    // localStorage.removeItem("barcodeScan_history")
    // localStorage.removeItem("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
    let product_list_chg = product_list_to_display_on_screen
    const product_id_to_delecte = product_list_chg[index].product_id
    product_list_chg = product_list_chg.filter((product) => product.product_id !== product_id_to_delecte)

    let TTC_LS = 0
    let TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0

    for (let i in product_list_chg) {
      TTC_LS += Number(product_list_chg[i].product_total_price_before_discount)
      TTC_LS -= product_list_chg[i].total_discount
      TOTAL_DISCOUNT_IN_THE_BASKET_LS +=  product_list_chg[i].total_discount
      }
      console.log("/!\\ PRODUIT A DISCOUNTER !!! TOTAL DISCOUNT : ", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
    

    console.log("Products_scanned : ", product_list_chg)
    setDataInLS("TTC_LS", TTC_LS)
    setDataInLS('product_basket_LS',product_list_chg)
    setDataInLS('TOTAL_DISCOUNT_IN_THE_BASKET_LS',TOTAL_DISCOUNT_IN_THE_BASKET_LS) // TO DO
    setTTC(TTC_LS)
    setProduct_list(product_list_chg)

  }
 
  // const [quantityOnScreen, setQtyOnScreen] = useState({});
  const changeHandler = (e) => {
    // console.log(e.target.value)  
    
    const { name, value } = e.target; // couple (index, value) where name = index
    let product_list_chg = product_list_to_display_on_screen
      // [{
  //   product_id: "",
  //   product_full_name: "",
  //   product_name_on_ticket: "",
  //   quantity: "",
  //   product_price: "",
  //   product_total_price_before_discount: "", 
  //   total_discount : "",
  //   type_of_sale : "",
  //   image : ""
  // }, ...] <==========  THIS IS product_list_to_display_on_screen
    
    
    // console.log('product_list_chg :', product_list_chg)
    // if (product_list_chg[name].type_of_sale === "unit" && value[value.length] ===".") {console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!")}
    // if (value === "") {console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!")}

    if (value.includes('.')) {
      if (product_list_chg[name].type_of_sale === "weight") {
        const valueArray =  value.split('.')
        let newValue = ""
        if (valueArray[1] === "") {
          newValue = value.split('.')[0] 
        } else {
          newValue = value.split('.')[0] + "." + value.split('.')[1].substr(0,2)
        }
        product_list_chg[name].quantity = newValue 
        // setQtyOnScreen((qty) => ({ ...qty, [name]: newValue }));
      } else {
        const newValue = value.split('.')[0] 
        product_list_chg[name].quantity = newValue 
        // setQtyOnScreen((qty) => ({ ...qty, [name]: newValue }));
      }
    } else {
      product_list_chg[name].quantity = value
      // setQtyOnScreen((qty) => ({ ...qty, [name]: value }));
    }

    // console.log('quantityOnScreen :', quantityOnScreen)
    // console.log('e.target :', e.target)
     
    product_list_chg[name].product_total_price_before_discount = (Number(product_list_chg[name].quantity) * Number(product_list_chg[name].product_price) ).toFixed(2)
    // console.log('product_list_chg :', product_list_chg)

    // if (value === "0" ) {
    //   console.log('Trying to delete data from product_scanned :', product_list_chg)
    //   product_list_chg = product_list_chg.filter((product) => product.quantity !== "0")
    //   console.log('data from product_scanned deleted :', product_list_chg)
    // } 

    let TTC_LS = 0
    let TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0

    for (let i in product_list_chg) {
      TTC_LS += Number(product_list_chg[i].product_total_price_before_discount)
      let tot_discount = 0 //total discount for the product
      product_list_chg[i].total_discount = ""
      const product_discountDB = discountDB.filter((discount) => discount.product_id === product_list_chg[i].product_id)

      if (product_discountDB.length >0) { // Is there a discount for the barcode ? If Yes, do the following code below
        const qty_for_discount = product_discountDB[0].quantity_for_discount //int <==== condition for the discount, the customer has to get a certain amount of this product to claim the discount
        const total_discount_when_condition_met_once = product_discountDB[0].total_discount_when_condition_met_once
        // const reste = qte % qty_for_discount //Reste de la division euclidienne
        const quotient = Math.trunc(Number(product_list_chg[i].quantity) / qty_for_discount) //Le quotient de la division euclidienne sert de multiplicateur pour calculer le montant de la remise totale
        // console.log('quotient :', quotient)
        if (quotient >=1 ) {
          // tot_discount += Math.trunc( quotient * total_discount_when_condition_met_once  *100)/100
          tot_discount += quotient * total_discount_when_condition_met_once
          tot_discount = Number(tot_discount.toFixed(2))

          // TOTAL_DISCOUNT_IN_THE_BASKET_LS = Math.trunc( (TOTAL_DISCOUNT_IN_THE_BASKET_LS + tot_discount ) *100)/100
          // setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
          product_list_chg[i].total_discount = tot_discount
          TTC_LS -= tot_discount
          TOTAL_DISCOUNT_IN_THE_BASKET_LS +=  tot_discount
          console.log("/!\\ PRODUIT A DISCOUNTER !!! TOTAL DISCOUNT : ", tot_discount)
        } 
      }
    }
    // console.log("TTC_LS : ", TTC_LS)
    console.log("Products_scanned : ", product_list_chg)
    setDataInLS("TTC_LS", TTC_LS)
    setDataInLS('product_basket_LS',product_list_chg)//product_list_to_display_on_screen
    setDataInLS('TOTAL_DISCOUNT_IN_THE_BASKET_LS',TOTAL_DISCOUNT_IN_THE_BASKET_LS) // TO DO
    setTTC(TTC_LS)
    setProduct_list(product_list_chg)//product_list_to_display_on_screen
};

const submit =() => {
  if (product_list_to_display_on_screen.length !== 0 && product_list_to_display_on_screen.filter((product) => product.quantity === "").length === 0 ) {
    setModalInvoiceOpen(true)
  }
}

const reinitializeData = () => {
  //DELETE ALL DATA IN THE BASKET
  setCount(0)
  setTTC(0)
  setProduct_list([])
  setInvoice(false)
  setCustomer({})
  setTicket({})
  setDataInLS("barcodeScan_history", [])
  setDataInLS("product_basket_LS", [])
  setDataInLS("TTC_LS", 0)
  setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", 0)
}

  // console.log('barcodeScanned before return :', barcodeScanned)
  // console.log('barcodeScan_history before return :', barcodeScan_history)

        return (
            
            <div > 
              
              <div className="basket_container">
              <Button  color="success" style={{margin : "10px"}} onClick={() =>  submit()}>Valider 确认</Button>
              {/* <Button  color="warning" style={{margin : "10px"}} onClick={() => {setModalPaymentOpen(true)}}>Test modal paiement</Button> */}
              <Button  color="light" style={{margin : "10px"}} onClick={() => {setModalProductOpen(true)}}>Choisir un produit sans code-barres 选择没有条形码的食品</Button>
              {/* <Button  color="light" style={{margin : "10px"}} onClick={() => {setChangePage(true); test()}}> test</Button> */}
              <Link to="/tickets"><Button color="danger" onClick={() => goBackButton()} >Annuler 取消 </Button></Link>


                <div className="total_price_basket"> 
                  <h4>MONTANT TOTAL A PAYER 支付总额 :</h4>
                  <h1> {TTC.toFixed(2)} € </h1>
                  {/* <h4>REMISE OFFERTE :</h4>  */}
                </div>
              
                {/* <p>you entered {count} barcode</p>
                  Barcode scanned :
                    {barcodeScanned} */}


                    <br/>
                    <br/>
                  <p>Produits choisis par le client 客户选择的食物产品 :</p>
                  {/* {console.log("product_list : ", product_list)
                  //console.log("barcodeScan_history : ", barcodeScan_history)
                } */}
                  {
                  
                  product_list_to_display_on_screen.map((product, index) => ( 
                    //  product = {
                    //   product_id: barcode_productID.productID,
                    //   product_full_name: productDB.product_full_name,
                    //   product_name_on_ticket: productDB.product_name_on_ticket,
                    //   quantity: qte.toString(),
                    //   product_price: productDB.current_price,
                    //   product_total_price_before_discount: product_tot_price_before_discount.toString(),
                    //   total_discount : tot_discount === 0 ? "" : tot_discount.toString(),
                    //   type_of_sale : productDB.typeOfSale
                    // }
                    product.quantity !== "" ? (
                  
                    <div className='product_in_basket' key={index}>
                      {console.log("barcodeList in map ", product_list_to_display_on_screen)}
                      <a href={product.image.includes('http') ? product.image : './.' + product.image} target="_blank" rel="noopener noreferrer">
                      <img src={ product.image.includes('http') ? product.image : './.' + product.image} style={{marginRight:5, marginLeft:10}} height="55px" width="55px" border-radius ="20%" align="left" alt={product.product_full_name}  />
                      </a>
                      <Form >
                        <FormGroup row>
                          <Label  style={{fontSize: "60%", width :'55%', height: '40px', verticalAlign : 'middle',  marginLeft:"0px", marginRight:"1%", marginTop : "5px"}} >{product.product_full_name }</Label>
                          {/* <Col sm={2} style={{ marginRight:"0px", backgroundColor :'red'}}> */}
                          <Input type="number" style={{marginTop : "5px", width :'7%', height : '40px', textAlign:"center"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" />
                          {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}

                          {/* </Col> */}
                          {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}
                          {/* <Col sm={3} style={{ marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", backgroundColor :'green'}}> */}
                            
                          {/* <Input type="number" style={{marginTop : "5px"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" /> */}
                          <Label  style={{fontSize: "70%", width :'25%',  marginRight:"1%",marginLeft:"1%", marginTop : "5px" }} >x {product.product_price}€ = {product.product_total_price_before_discount }€ {product.total_discount !== "" ?  "(-"+ product.total_discount+"€)"  : ""}</Label>

                          {/* </Col> */}
                          <Button  color='danger' style={{width: "5%", height : "40px",  marginTop : "5px" }} onClick={() => removeProductButton(index)} >X</Button>
                        </FormGroup>
                      </Form>
                    </div>)
                    : (
                    <div className='product_in_basket_wrong' key={index}>
                      <a href={product.image.includes('http') ? product.image : './.' + product.image} target="_blank" rel="noopener noreferrer">
                      <img src={ product.image.includes('http') ? product.image : './.' + product.image} style={{marginRight:5, marginLeft:10}} height="55px" width="55px" border-radius ="20%" align="left" alt={product.product_full_name}  />
                      </a>
                      <Form >
                        <FormGroup row>
                          <Label  style={{fontSize: "60%", width :'55%', height: '40px', verticalAlign : 'middle',  marginLeft:"0px", marginRight:"1%", marginTop : "5px"}} >{product.product_full_name }</Label>
                          {/* <Col sm={2} style={{ marginRight:"0px", backgroundColor :'red'}}> */}
                          <Input type="number" style={{marginTop : "5px", width :'7%', height : '40px', textAlign:"center"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" />
                          {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}

                          {/* </Col> */}
                          {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}
                          {/* <Col sm={3} style={{ marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", backgroundColor :'green'}}> */}
                            
                          {/* <Input type="number" style={{marginTop : "5px"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" /> */}
                          <Label  style={{fontSize: "70%", width :'25%',  marginRight:"1%",marginLeft:"1%", marginTop : "5px" }} >x {product.product_price}€ = {product.product_total_price_before_discount }€ {product.total_discount !== "" ?  "(-"+ product.total_discount+"€)"  : ""}</Label>

                          {/* </Col> */}
                          <Button  color='danger' style={{width: "5%", height : "40px",  marginTop : "5px" }} onClick={() => removeProductButton(index)} >X</Button>
                        </FormGroup>
                      </Form>
                    </div>
                    )
                  ))
                  }

              </div>

              {modalOpenProduct && <ModalProductWithoutBarcode setOpenModal={setModalProductOpen}  setProductList={setProduct_list} setTTC={setTTC} />}
              {modalOpenWarning && <ModalBarcodeNotFound setOpenModal={setModalWarning}/>}

              {modalOpenInvoice && <ModalInvoice setOpenModal={setModalInvoiceOpen} setInvoice={setInvoice}  setModalPaymentOpen={setModalPaymentOpen} setModalCustomerOpen={setModalCustomerOpen} setCustomer={setCustomer}  />} 
              {modalOpenCustomer && <ModalCustomer setOpenModal={setModalCustomerOpen} setCustomer={setCustomer}  setModalPaymentOpen={setModalPaymentOpen}  />}
              {modalOpenPayment && <ModalPayment setOpenModal={setModalPaymentOpen}  getTTC={getTTC}  getInvoiceBool={getInvoiceBool} setModalPrintTicketOpen={setModalPrintTicketOpen} saveTicket={saveTicket} />}
              {modalPrintTicket && <ModalPrintTicket setOpenModal={setModalPrintTicketOpen} getCustomer={getCustomer} getTicket={getTicket} reinitializeData={reinitializeData} />}
              
            </div>
        );
    // }
}

export default AddNewTicket;