import React, { useState, useEffect} from 'react';
import {Link, Navigate } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button} from 'reactstrap';
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';
import discountDB from "../../database/discounts.json"

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewTicket = () => {

    let barcodeScan = "";
    let barcodeScan2 = [];
    useEffect(() => {
        function handleKeyDown(e){
            // if key code is 13 ( Enter ) then check if barcodeScan > 3
            if (e.keyCode === 13 && barcodeScan.length > 3) {
                handleScan(barcodeScan);
                handleProduct(barcodeScan);
                return
            }

            //skip if pressed key is Shift key
            if (e.keyCode === 16) {
              console.log("key shift ")
                return
            }
            
            //push keycode to barcode scan ariable
            barcodeScan += e.key;

            setTimeout(() => {
                barcodeScan = ""
            
            }, 100)
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup(){
            document.removeEventListener('keydown', handleKeyDown);
        }
    })

    let TOTAL_DISCOUNT_IN_THE_BASKET = 0;
    let TTC = 0;
    const [barcodeScanned, setBarcode] = useState([]);
    // const [newTicket, setTicket] = useState([]);
    const [product_list, setProduct_list] = useState([]);
    const product_with_barcode = getDataFromLS("product_with_barcode");
    const productDB_from_LS = getDataFromLS("productDB")
    const ticketDB = getDataFromLS("ticketDB")

    const  handleScan = (barcode_string) => {
        // document.querySelector("#last_barcode").innerHTML = scanned_barcode
        console.log("set setBarcode")
        console.log("after setting barcode barcodeScanned :", barcodeScanned)
        if (barcodeScanned.length ===0 ) setBarcode( [ barcode_string]);
        else  setBarcode((old_barcode_string) => [...old_barcode_string, barcode_string]);
        if (count ===0 ) localStorage.removeItem("barcodes")
        setCount(count+1)
        document.title = `You clicked ${count} times`
        const barcodes = getDataFromLS("barcodes")
        if (barcodes === null) setDataInLS("barcodes", [barcode_string])
        else {
          barcodes.push(barcode_string)
          setDataInLS("barcodes", barcodes)

        }
        console.log("after setting barcodes :", barcodes)
      //  console.log("after setting barcode barcodeScanned :", barcodeScanned)
    }
const [count, setCount] = useState(0)

    const handleProduct = (barcodeScan) => {
      barcodeScan2.push(barcodeScan)
      console.log("barcodeScan2", barcodeScan2)
      console.log("barcodeScan1", barcodeScanned)
      console.log("before set setProduct_list")
      setProduct_list(() => {
        let Products_scanned = [] //to return at the end
        let barcode_analyzed = []
        let iter = 0
        console.log("set setProduct_list")
        console.log("barcodeScanned : ", barcodeScanned, ". Longueur : ", barcodeScanned.length)
        if (barcodeScanned.length >=0) { 
          console.log("barcodeScanned : ", barcodeScanned, ". Longueur : ", barcodeScanned.length)
          for (let i in barcodeScanned){
            console.log("iteration : ", iter, ", reading barcode : ", barcodeScanned[i])
            iter += 1
            if (barcode_analyzed.filter((string)=> string === barcodeScanned[i]).length === 0) { //Does the barcode have been already annalyzed ?
              barcode_analyzed.push(barcodeScanned[i])
              console.log("Analyzed barcode : ", barcode_analyzed)
            

              const barcode_productID = product_with_barcode.filter((item) => item.barCode === barcodeScanned[i])
              if ( barcode_productID.length !== 0  ) {//Is the barcode stored in the database ? If Yes, do the following code below
              
                const productDB = productDB_from_LS.filter((item) => item.product_id ===  barcode_productID.productID)
                const qte = barcodeScanned.filter((BARCODE)=> BARCODE === barcodeScanned[i]).length //quantity of product that the customer had chosen to put in its basket
                const product_tot_price_before_discount = Math.round(qte * Number(productDB.current_price) *100)/100
                const product_discountDB = discountDB.filter((discount) => discount.product_id === barcode_productID.productID)
                let tot_discount = 0 //total discount for the product

                if (product_discountDB.length >0) { // Is there a discount for the barcode ? If Yes, do the following code below
                  const qty_for_discount = product_discountDB.quantity_for_discount //int <==== condition for the discount, the customer has to get a certain amount of this prodcut to claim the discount
                  const total_discount_when_condition_met_once = product_discountDB.total_discount_when_condition_met_once
                  const reste = qte % qty_for_discount
                  if (reste >=1 ) {
                    const quotient = Math.round(qte / qty_for_discount) //Le quotient de la division euclidienne sert de multiplicateur pour calculer le montant de la remise totale
                    tot_discount = Math.round( product_tot_price_before_discount - quotient * total_discount_when_condition_met_once  *100)/100
                    TOTAL_DISCOUNT_IN_THE_BASKET = Math.round( TOTAL_DISCOUNT_IN_THE_BASKET + tot_discount  *100)/100
                  } 
                }
                
                TTC =  Math.round(product_tot_price_before_discount - tot_discount *100)/100
                const product = {
                  product_id: barcode_productID.productID,
                  product_name: productDB.product_name_on_ticket,
                  quantity: qte.toString(),
                  product_price: productDB.current_price,
                  product_total_price_before_discount: product_tot_price_before_discount.toString(),
                  total_discount : tot_discount === 0 ? "" : tot_discount.toString(),
                  type_of_sale : productDB.typeOfSale
                }
                
                Products_scanned.push(product)
                console.log("Products_scanned : ", Products_scanned)
              } else {
                //the barcode is not stored in the database 
                console.warn("LE BARCODE ", barcodeScanned[i], "N'EST PAS RECONNU !")
              }

            } else {
              //the barcode has already been annalyzed
              console.log("LE BARCODE ", barcodeScanned[i], "EST ANALYSE POUR LA ENIEME FOIS !")
       //           let cards = getCards();
                // let index = cards.findIndex(obj => obj.id === card.id);
                // cards[index] = card;
            }

            
          }//end of for loop
        }
        return Products_scanned //product_list
      });
    }


    const toPrint =() => {
      
      const HT = Math.round(TTC * 0.945 *100) /100
      const TVA =  Math.round((TTC - HT) *100)/100 

      const dataToSend = {
        ticket_id : ticketDB[ Object.keys(ticketDB).sort().pop() ].ticket_id +1 ,
        date_of_purchase : new Date().toISOString(),
        product_list : product_list,
        PAYMENT_METHOD: "",
        TOTAL_DISCOUNT : TOTAL_DISCOUNT_IN_THE_BASKET,
        RECU: "",
        RENDU: "",
        TVA: TVA.toString(),
        HT: HT.toString(),
        TTC: TTC.toString()
      }

      ticketDB.push(dataToSend)  
      console.log("ticketDB : ", ticketDB)
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

  console.log(barcodeScanned)

        return (
            
            <div > 
              <Button  color="success" style={{margin : "10px"}} onClick={() => toPrint()}>Valider</Button>
              <Link to="/tickets"><Button color="danger">Annuler 取消 </Button></Link>

              <div className="scanned_barcode">
                <p>you entered {count} barcode</p>
                  Barcode scanned :
                    {barcodeScanned}
                </div>
            </div>
        );
    // }
}

export default AddNewTicket;