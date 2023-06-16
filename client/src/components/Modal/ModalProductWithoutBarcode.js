import React from "react";
import "./ModalProductWithoutBarcode.css";
import no_img from "../../img/no_image.jpg"
import {Button} from 'reactstrap';
import { getDataFromLS,setDataInLS } from '../../backend/localStorageManager';
import productDB from "../../database/products.json"
import { sortDataByFullName } from "../../backend/localStorageManager";

function ModalProductWithoutBarcode({ setOpenModal, setProductList, setTTC } ) {
  const product_with_no_barcode = sortDataByFullName(productDB.filter((product) => product.barCode_available === false ))
  let product_basket_LS = getDataFromLS("product_basket_LS")
  let product_with_no_barcode_filtered = product_with_no_barcode
  if (product_basket_LS !== null ) {
    if (product_basket_LS.length !==0) {
      // console.log(product_basket_LS)
      for (let i in product_basket_LS) {
        product_with_no_barcode_filtered = product_with_no_barcode_filtered.filter((product) => product.product_id !== product_basket_LS[i].product_id )
      }
      // console.log(product_with_no_barcode_filtered)
    }
  } else {
    product_basket_LS = [];
    setDataInLS("product_basket_LS", product_basket_LS)
  }


  const productClicked = (index) => {
    let barcodeScan_history = getDataFromLS("barcodeScan_history")
    
    let TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
    let TTC_LS = getDataFromLS("TTC_LS")
    if (barcodeScan_history === null  && TTC_LS === null && TOTAL_DISCOUNT_IN_THE_BASKET_LS === null) {
      barcodeScan_history = []
      TTC_LS = 0;
      TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0
      setDataInLS("barcodeScan_history", barcodeScan_history)
      
      setDataInLS("TTC_LS", TTC_LS)
      setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
    }

    let productc_list = [...product_basket_LS]
    // console.log("productInBasket before : ", productc_list)
    // console.log("productInBasket length before : ", productc_list.length)
    productc_list.push({
      product_id: product_with_no_barcode_filtered[index].product_id,
      product_full_name: product_with_no_barcode_filtered[index].product_full_name,
      product_name_on_ticket: product_with_no_barcode_filtered[index].product_name_on_ticket,
      quantity: product_with_no_barcode_filtered[index].typeOfSale === "unit" ? "1" : "",
      product_price: Number(product_with_no_barcode_filtered[index].current_price).toFixed(2),
      product_total_price_before_discount: product_with_no_barcode_filtered[index].typeOfSale === "unit" ? Number(product_with_no_barcode_filtered[index].current_price).toFixed(2) : "",
      total_discount : "",
      type_of_sale : product_with_no_barcode_filtered[index].typeOfSale,
      image : product_with_no_barcode_filtered[index].image,
      display_on_ticket  : product_with_no_barcode_filtered[index].display_on_ticket
    })

    if (product_with_no_barcode_filtered[index].typeOfSale === "unit") {
      let TTC_LS = getDataFromLS("TTC_LS")
      TTC_LS += Number(product_with_no_barcode[index].current_price)
      setDataInLS("TTC_LS", TTC_LS)
      setTTC(TTC_LS)
    }

    console.log("productInBasket after : ", productc_list)
    console.log("productInBasket length after : ", productc_list.length)

    setDataInLS('product_basket_LS',productc_list)//product_list_to_display_on_screen
    // setDataInLS('TOTAL_DISCOUNT_IN_THE_BASKET_LS',TOTAL_DISCOUNT_IN_THE_BASKET_LS) // TO DO    
    setProductList(productc_list)
    setOpenModal(false);
  }

  const toggleModal=()=>{
    setOpenModal(false);
  }



  return (
    <div className="modalNoBarcode" >
    <div className="modalBackgroundNoBarcode" onClick={toggleModal}></div>
      <div className="modalContainerNoBarcode">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="title">
          Veuillez choisir un produit sans code-barres
        </div>
        <div className="body">
          {
            product_with_no_barcode_filtered.map((product, index) => (
              
              <Button color="light" key={index} style={{marginBottom : "20px", marginRight: "10px", position : "relative"}} onClick={() => productClicked(index)}> 
          {
                          !product.display_on_ticket ? 
                              <div className='no_facture'> 
                                  没发票
                              </div>
                          : ""
                      }
                <div  className="img_product_container">
                    <img src={ product.image.includes('http') ? product.image : (product.image === "" ? no_img : './.' + product.image)  } height="200px" width="200px" border-radius ="20%"  alt={product.product_full_name} />
                </div>
                <div className="text-container" >
                    <span>{product.product_full_name}</span>
                </div >
                <span>{ Number(product.current_price).toFixed(2)} €</span>
              
              </Button>
            ))
          }
          

        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>

      {/* <Button  color="warning" style={{margin : "10px"}} onClick={() => {setModalPrintOpen(true)}}>Test modal print</Button> */}
      {/* {modalOpen && <Modal_payment setOpenModal={setModalPaymentOpen} />} */}
    
    </div>
  );
}

export default ModalProductWithoutBarcode;