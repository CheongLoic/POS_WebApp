import React, { useState, useEffect} from 'react';
// import {Link, Navigate } from "react-router-dom";
import {Link } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button} from 'reactstrap';
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';
import discountDB from "../../database/discounts.json"
// import Modal from "../Modal/Modal2"
import Modal_payment from "../Modal/Modal_payment"

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewTicket = () => {

  let barcodeScan = "";
  // let barcodeScan_history = [];
  let product_list = [];
  // let TOTAL_DISCOUNT_IN_THE_BASKET = 0;
  // let TTC = 0;
  const barCodeAvailable_productID = getDataFromLS("barCodeAvailable_productID");
  const productDB_from_LS = getDataFromLS("productDB");
  const ticketDB = getDataFromLS("ticketDB");
  const [TTC, setTTC] = useState(0); // To display on the screen 
  const [modalOpen, setModalPaymentOpen] = useState(false);
  const [barcodeScanned, setBarcode] = useState([]); // do not use it to compute data because of the UseEffect function ===> useless
  const [count, setCount] = useState(0)
  // const [newTicket, setTicket] = useState([]);
  const [product_list_to_display_on_screen, setProduct_list] = useState([]);
  

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
      console.log("set setBarcode")
      // console.log("At the beginning barcodeScanned :", barcodeScanned) // vide  a la 1ere iteration
      if (barcodeScanned.length === 0 ) setBarcode( [ barcode_string]);
      else  setBarcode((old_barcode_string) => [...old_barcode_string, barcode_string]);
      if (count === 0 ) {
        localStorage.removeItem("barcodes")
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
        let Products_scanned = [] //to return at the end
        let barcode_analyzed = [] //Store all the barcodes analyzed
        let iter = 0
        let TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0 //total discount in the basket
        let TTC_LS = 0
        // console.log("set setProduct_list")
        // console.log("barcodeScanned : ", barcodeScanned, ". Longueur : ", barcodeScanned.length)
        if (barcodeScan_history.length >=0) { 
          console.log("barcodeScanned : ", barcodeScan_history, ". Longueur : ", barcodeScan_history.length)
          for (let i in barcodeScan_history){
            console.log("iteration : ", iter, ", reading barcode : ", barcodeScan_history[i])
            iter += 1
            if (barcode_analyzed.filter((string)=> string === barcodeScan_history[i]).length === 0) { //Does the barcode have been already analyzed ?
              barcode_analyzed.push(barcodeScan_history[i])
              console.log("Analyzed barcode : ", barcode_analyzed)
            

              let barcode_productID = barCodeAvailable_productID.filter((item) => item.barCode === barcodeScan_history[i])
              console.log("barcode_productID : ", barcode_productID)
              if ( barcode_productID.length !== 0  ) {//Is the barcode stored in the database ? If Yes, do the following code below
              
                const productDB = productDB_from_LS.filter((item) => item.product_id === barcode_productID[0].productID)
                console.log("productDB_from_LS : ", productDB_from_LS) 
                console.log("productDB : ", productDB)
                const qte = barcodeScan_history.filter((BARCODE)=> BARCODE === barcodeScan_history[i]).length //quantity of product that the customer had chosen to put in its basket
                const product_tot_price_before_discount = Math.trunc(qte * Number(productDB[0].current_price) *100)/100
                const product_discountDB = discountDB.filter((discount) => discount.product_id === barcode_productID[0].productID)
                let tot_discount = 0 //total discount for the product

                console.log("qte : ", qte)
                console.log("product_tot_price_before_discount : ", product_tot_price_before_discount)
                console.log("product_discountDB : ", product_discountDB)

                if (product_discountDB.length >0) { // Is there a discount for the barcode ? If Yes, do the following code below
                  
                  const qty_for_discount = product_discountDB[0].quantity_for_discount //int <==== condition for the discount, the customer has to get a certain amount of this product to claim the discount
                  const total_discount_when_condition_met_once = product_discountDB[0].total_discount_when_condition_met_once
                  const reste = qte % qty_for_discount //Reste de la division euclidienne
                  const quotient = Math.trunc(qte / qty_for_discount) //Le quotient de la division euclidienne sert de multiplicateur pour calculer le montant de la remise totale
                  console.log('quotient :', quotient)
                  if (quotient >=1 ) {
                    tot_discount += Math.trunc( quotient * total_discount_when_condition_met_once  *100)/100
                    // let  TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
                    TOTAL_DISCOUNT_IN_THE_BASKET_LS += Math.trunc( (TOTAL_DISCOUNT_IN_THE_BASKET_LS + tot_discount ) *100)/100
                    setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)

                    console.log("/!`\` PRODUIT A DISCOUNTER !!! TOTAL DISCOUNT : ", tot_discount)

                  } 
                }
                // let  TTC_LS = getDataFromLS("TTC_LS")
                TTC_LS += Math.trunc((product_tot_price_before_discount - tot_discount) *100)/100
                setDataInLS("TTC_LS", TTC_LS)
                console.log("TTC_LS : ", TTC_LS)
                setTTC(TTC_LS)
                console.log("TTC : ", TTC)

                const product = {
                  product_id: barcode_productID[0].productID,
                  product_full_name: productDB[0].product_full_name,
                  product_name_on_ticket: productDB[0].product_name_on_ticket,
                  quantity: qte.toString(),
                  product_price: productDB[0].current_price,
                  product_total_price_before_discount: product_tot_price_before_discount.toFixed(2),
                  total_discount : tot_discount === 0 ? "" : tot_discount.toString(),
                  type_of_sale : productDB[0].typeOfSale,
                  image : productDB[0].image
                }
                
                Products_scanned.push(product)
                console.log("Products_scanned : ", Products_scanned)
                product_list.push(product)
              } else {
                //the barcode is not stored in the database 
                console.warn("LE BARCODE ", barcodeScan_history[i], "N'EST PAS RECONNU !")
              }

            } else {
              //the barcode has already been annalyzed
              console.log("LE BARCODE ", barcodeScan_history[i], "EST ANALYSE POUR LA ENIEME FOIS !")
       //           let cards = getCards();
                // let index = cards.findIndex(obj => obj.id === card.id);
                // cards[index] = card;
            }
          }//end of for loop
        }

        // console.log('barcodeScanned before handleProduct end :', barcodeScanned) // utiliser barcodeScanned uniquement pour l'afficher sur fenetre
        console.log('barcodeScan_history before handleProduct end :', barcodeScan_history)

        setProduct_list(Products_scanned)
        setDataInLS('product_basket_LS',Products_scanned)
        return Products_scanned // product_list = Products_scanned 
      // });
    }


    const toPrint =() => {
      let  TTC_LS = getDataFromLS("TTC_LS")
      let TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
      // console.log("TTC from toPrint  : ", TTC_LS)
      const HT = Math.round(TTC_LS * 0.945 *100) /100
      const TVA =  Math.round((TTC_LS - HT) *100)/100 

      const dataToSend = {
        ticket_id : ticketDB[ Object.keys(ticketDB).sort().pop() ].ticket_id +1 ,
        date_of_purchase : new Date().toISOString(),
        product_list : product_list,
        PAYMENT_METHOD: "",
        TOTAL_DISCOUNT : TOTAL_DISCOUNT_IN_THE_BASKET_LS.toFixed(2).toString(),
        RECU: "",
        RENDU: "",
        TVA: TVA.toFixed(2).toString(),
        HT: HT.toFixed(2).toString(),
        TTC: TTC_LS.toFixed(2).toString()
      }

      console.log("data to send : ", dataToSend)
      // ticketDB.push(dataToSend)  
      // console.log("ticketDB : ", ticketDB)
      // setDataInLS("ticketDB", ticketDB)


      // const requestOptions = {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //         data : dataToSend,
      //         action : "add"
      //     })
      // };

      // fetch('http://localhost:5000/tickets', requestOptions)
      // .then(response => response.json())
  }


  const goBackButton =() => {
    // localStorage.removeItem("barcodes")
    localStorage.removeItem("TTC_LS")
    localStorage.removeItem("product_basket_LS")
    localStorage.removeItem("barcodeScan_history")
    localStorage.removeItem("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
  }

  // console.log('barcodeScanned before return :', barcodeScanned)
  // console.log('barcodeScan_history before return :', barcodeScan_history)

        return (
            
            <div > 
              <Button  color="success" style={{margin : "10px"}} onClick={() => toPrint()}>Valider</Button>
              <Button  color="warning" style={{margin : "10px"}} onClick={() => {setModalPaymentOpen(true)}}>Test modal paiement</Button>
              <Link to="/tickets"><Button color="danger" onClick={() => goBackButton()} >Annuler 取消 </Button></Link>

              <div className="basket_container">

                <div className="total_price_basket"> 
                  <h4>MONTANT TOTAL A PAYER 支付总额 :</h4>
                  <h2> {TTC.toFixed(2)} € </h2>
                </div>
              
                {/* <p>you entered {count} barcode</p>
                  Barcode scanned :
                    {barcodeScanned} */}


                    <br/>
                    <br/>
                  <p>Produits dans le panier 篮子里的食物产品 :</p>
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

                    <div className='product_in_basket' key={index}>
                       <img src={ product.image.includes('http') ? product.image : './.' + product.image} height="80px" width="80px" border-radius ="20%" align="left" alt={product.product_full_name} />
                      {/* <Basket key={index} index ={index} product_data={product}  /> */}
                    </div>
                  ))
                  }

              {/* <img src={'./../img/Sauce_de_soja_sucree.jpg'} height="100px" width="100px" border-radius ="20%" align="left" alt={'test'} /> */}

              </div>

              {modalOpen && <Modal_payment setOpenModal={setModalPaymentOpen} />}
            </div>
        );
    // }
}

export default AddNewTicket;