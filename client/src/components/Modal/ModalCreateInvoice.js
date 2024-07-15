import React, {useState} from "react";
import "./ModalCreateInvoice.css";
import {Navigate } from "react-router-dom";
import {Button, Input, FormGroup, Label, Form,Col,FormFeedback} from 'reactstrap';
import customerDB from "../../database/customers.json";
import ticketDB from "../../database/tickets.json";
import invoiceDB from "../../database/invoices.json";
// import productDB from "../../database/products.json"
import { getDataFromLS, setDataInLS, sortCustomeByCompany ,sortDataTicketID_ASC, sortDataInvoiceID_desc} from "../../backend/localStorageManager";


function ModalCreateInvoice ({ setOpenModal, getProductLst, setProduct_list, computeDiscount, setHT, getHT}  ) {

  const [CUSTOMER, chooseCustomer] = useState("N°"+sortCustomeByCompany(customerDB)[0].id +" "+ sortCustomeByCompany(customerDB)[0].company +" "+ sortCustomeByCompany(customerDB)[0].address +" "+ sortCustomeByCompany(customerDB)[0].zip_code +" "+ sortCustomeByCompany(customerDB)[0].city)
  const [MEANS_OF_PAYMENT, setmMeansOfPayment] = useState("CB")
  const [DATE_OF_PURCHASE, setDateOFPaurchase] = useState("")
  const [error, setError] = useState(false)
  let ERROR = false

    let product_list_to_display_on_screen = getProductLst()
  const toggleModal=()=>{
    setOpenModal(false);
  }

  const [formOK, changePage] = useState(false)
    if (formOK) {
        return( <Navigate  to="/invoices"  replace={true} />)
    }

  

  const removeProductButton =(index) => {
    // localStorage.removeItem("barcodes")
    // localStorage.removeItem("TTC_LS")
    // localStorage.removeItem("product_basket_LS")
    // localStorage.removeItem("barcodeScan_history")q
    // localStorage.removeItem("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
    let product_list_chg = [...getProductLst()]
    const product_id_to_delecte = product_list_chg[index].product_id
    product_list_chg = product_list_chg.filter((product) => product.product_id !== product_id_to_delecte)

    let HT_LS = 0
    let TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0

    for (let i in product_list_chg) {
      HT_LS += Number(product_list_chg[i].product_total_price_before_discount)
      HT_LS -= product_list_chg[i].total_discount
      TOTAL_DISCOUNT_IN_THE_BASKET_LS +=  product_list_chg[i].total_discount
      }
      console.log("/!\\ PRODUIT A DISCOUNTER !!! TOTAL DISCOUNT : ", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
    

    // console.log("Products_scanned : ", product_list_chg)
    // setDataInLS("HT_LS", HT_LS)
    // setDataInLS('product_basket_LS',product_list_chg)
    setDataInLS('TOTAL_DISCOUNT_IN_THE_BASKET_LS',TOTAL_DISCOUNT_IN_THE_BASKET_LS) // TO DO
    setHT(HT_LS)
    setProduct_list(product_list_chg)

  }


  const changeHandler = (e) => {
    let product_list = [...product_list_to_display_on_screen] //copy of the array
    const { name, value } = e.target; // couple (index, value) where name = index
    // let product_list = product_list_to_display_on_screen
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


    // console.log('product_list :', product_list)
    // if (product_list[name].type_of_sale === "unit" && value[value.length] ===".") {console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!")}
    // if (value === "") {console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!")}
    if (Number(value) > 100) {
      product_list[name].quantity = '100'
    } else {
      if (value.includes('.')) {
        if (product_list[name].type_of_sale === "weight") {
            const valueArray =  value.split('.')
            let newValue = ""
            if (valueArray[1] === "") {
                newValue = value.split('.')[0] 
            } else {
                newValue = value.split('.')[0] + "." + value.split('.')[1].substr(0,3)
            }
            product_list[name].quantity = newValue 
            // setQtyOnScreen((qty) => ({ ...qty, [name]: newValue }));
        } else {
            const newValue = value.split('.')[0] 
            product_list[name].quantity = newValue 
            // setQtyOnScreen((qty) => ({ ...qty, [name]: newValue }));
        }
      } else if (value === "") {
          product_list[name].quantity= ""
          product_list[name].product_total_price_before_discount=  ""
          product_list[name].total_discount = ""
      }
      else {
          product_list[name].quantity = value
          // setQtyOnScreen((qty) => ({ ...qty, [name]: value }));
      }
    }
    // console.log('quantityOnScreen :', quantityOnScreen)
    // console.log('e.target :', e.target)
        
    product_list[name].product_total_price_before_discount = (Number(product_list[name].quantity) * Number(product_list[name].product_price) ).toFixed(2)
    setProduct_list(product_list)
    // console.log('product_list :', product_list)

    // if (value === "0" ) {
    //   console.log('Trying to delete data from product_scanned :', product_list)
    //   product_list = product_list.filter((product) => product.quantity !== "0")
    //   console.log('data from product_scanned deleted :', product_list)
    // } 
    if (value !== "")   computeDiscount() 
    else {
        var PRX_BF_DISC = product_list.map(product => Number(product.product_total_price_before_discount)).reduce((tot, amount) => tot + amount)
        var DISC = product_list.map(product => Number(product.total_discount)).reduce((tot, amount) => tot + amount)
        setHT(PRX_BF_DISC -DISC)
    }
}
const handleError = () => {
  if (DATE_OF_PURCHASE === "") {
    ERROR = true
    setError(true)
  } else {
    ERROR = false
    setError(false)
  }
}

const submit =() => {
  handleError()
  if (!ERROR){
    let sortedTickedDB_ID_ASC = []
    let TOTAL_DISCOUNT_IN_THE_BASKET_LS = getDataFromLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS")
    // console.log(TOTAL_DISCOUNT_IN_THE_BASKET_LS)
    let ticketID = 1
    if (ticketDB.length >0) {
      sortedTickedDB_ID_ASC = sortDataTicketID_ASC(ticketDB)
      ticketID = sortedTickedDB_ID_ASC[ sortedTickedDB_ID_ASC.length -1 ].ticket_id + 1 
    }
    const newTicket = {
      ticket_id : ticketID,
      invoice : true, //boolean, ticket de caisse avec facture ?
      date_of_purchase : new Date(DATE_OF_PURCHASE).toISOString(),
      product_list : product_list_to_display_on_screen.filter(product => product.quantity !== ""),//vide pour le moment
      PAYMENT_METHOD: MEANS_OF_PAYMENT,
      TOTAL_DISCOUNT : TOTAL_DISCOUNT_IN_THE_BASKET_LS === null ? "" : TOTAL_DISCOUNT_IN_THE_BASKET_LS.toFixed(2),
      RECU: "",
      RENDU: "",
      TVA: (Number((getHT()* 1.055 ).toFixed(2)) - getHT()).toFixed(2), //string
      HT: getHT().toFixed(2), //string
      TTC: (getHT()* 1.055 ).toFixed(2) //string
    }

    let  count_invoice = invoiceDB.filter((inv) => inv.purchase_date.substring(0,7)  === newTicket.date_of_purchase.substring(0,7)  ).length + 1
    console.log("count_invoice : ", count_invoice)
    if (count_invoice.toString().length <3 ) { // if the number of the invoice has only 3 digits
      count_invoice = "0".repeat(3-count_invoice.toString().length) + count_invoice
      console.log("count_invoice_digit : ", count_invoice)
    }
    let  invoice_number = "FA" + newTicket.date_of_purchase.substring(0,7) + "-" + count_invoice


    const newInvoice = {
      invoice_id: invoiceDB.length > 0 ? sortDataInvoiceID_desc(invoiceDB)[0].invoice_id + 1 : 1,
      invoice_number : invoice_number,
      ticket_id: ticketID ,
      customer_id: Number(CUSTOMER.split(" ")[0].substring(2)),
      // invoice_date: new Date().toISOString()
      purchase_date : newTicket.date_of_purchase
    }
    // console.log(newTicket)
    // console.log(newInvoice)
    const dataToSend = {
      newTicketData : newTicket,
      newInvoiceData : newInvoice,
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    };

    fetch('http://localhost:5000/invoices/createInvoice', requestOptions)
    .then(response => response.json())

    setDataInLS('TOTAL_DISCOUNT_IN_THE_BASKET_LS', 0)
    changePage(true)
    document.body.classList.remove('active-modal')
  }
}


  return (
    <div className="modalCreateInvoice" >
        <div className="modalCreateInvoiceBackground" onClick={toggleModal}></div> 
        <div className="modalContainerCreateInvoice" >
            <div className="titleCloseBtn">
            <button onClick={() => {  setOpenModal(false); }}  >X</button>
            </div>

            <div className="title">
              <h3>Récapitulatif</h3>
              <span style={{marginRight : "30px"}}>HT : {getHT().toFixed(2)}€</span>
              <span style={{marginRight : "30px"}}>TVA : {(Number((getHT()* 1.055 ).toFixed(2)) - getHT()).toFixed(2)}€</span>
              <span>TTC : {(getHT()* 1.055 ).toFixed(2)}€</span>
              <Form style={{marginTop : "20px"}}>
                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Date d'achat 购买日期</Label> 
                  <Col sm={8}>
                    {!error || DATE_OF_PURCHASE !== "" ? 
                    <div>
                      <Input type="date" name="date_of_purchase" max={new Date().toISOString().substring(0)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  onChange={(e) => {setDateOFPaurchase(e.target.value)}} value={DATE_OF_PURCHASE}  />
                    </div>
                    :
                    <div>
                        <Input type="date" name="date_of_purchase" max={new Date().toISOString().substring(0)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                        onChange={(e) => {setDateOFPaurchase(e.target.value)}} value={DATE_OF_PURCHASE}  invalid/>
                        <FormFeedback style={{fontSize: "50%"}}>Veuillez entrer la date d'achat 请输入购买日期</FormFeedback>
                    </div>
                    }
                    
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Moyen de paiement<br/>支付手段</Label> 
                  <Col sm={8}>
                    <Input type="select" name="mean_of_payment" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={(e) => {setmMeansOfPayment(e.target.value)}} value={MEANS_OF_PAYMENT}  >
                      <option>CB</option>
                      <option>Espèces</option>
                      <option>Chèque</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Client 客户</Label> 
                  <Col sm={8}>
                    <Input type="select" name="customer" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                      onChange={(e) => {chooseCustomer(e.target.value)}} value={CUSTOMER}  >
                          {sortCustomeByCompany(customerDB).map((customer, index) => {
                              return <option key={index}>N°{customer.id} {customer.company} {customer.address} {customer.zip_code} {customer.city}</option>
                          } )}
                    </Input>
                  </Col>
                </FormGroup>
              </Form>
              
              

            </div>

            <div className="body2">
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
                  
                    <div className='basket_product_container' key={index}>
                        
                      {
                          !product.display_on_ticket ? 
                              <div className='no_facture'> 
                                  没发票
                              </div>
                          : ""
                      }
                     
                      <a href={product.image.includes('http') ? product.image : './.' + product.image} target="_blank" rel="noopener noreferrer">
                      <img src={ product.image.includes('http') ? product.image : './.' + product.image} 
                      style={{marginRight:5}} height="55px" width="55px" border-radius ="20%" align="left" 
                      alt={product.product_full_name}  />
                      </a>
                      <Form >
                        <FormGroup row>
                          <Label  
                          style={{fontSize: "60%", width :'55%', height: '40px', verticalAlign : 'middle',  
                          // backgroundColor : "red",
                          justifyContent : "center", 
                          alignItems : "center",
                          display : "flex",
                          marginLeft:"0px", marginRight:"1%", marginTop : "5px"}} 
                          >{product.product_full_name }</Label>
                          {/* <Col sm={2} style={{ marginRight:"0px", backgroundColor :'red'}}> */}
                          <Input type="number" 
                          style={{marginTop : "5px", width :'12%', height : '40px', textAlign:"center"}} 
                          name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                          onChange={changeHandler} value={product.quantity} 
                          placeholder="quantity" />
                          {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}

                          {/* </Col> */}
                          {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}
                          {/* <Col sm={3} style={{ marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", backgroundColor :'green'}}> */}
                            
                          {/* <Input type="number" style={{marginTop : "5px"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" /> */}
                          <Label  style={{fontSize: "60%", width :'25%',  
                          margin : "auto 0",
                          // marginRight:"1%",marginLeft:"1%", marginTop : "5px",
                          // backgroundColor : "green",
                          maxHeight : "65px",
                          justifyContent : "center", 
                          alignItems : "center",
                          display : "flex" }}
                          >x {Number(product.product_price).toFixed(2)}€ = {Number(product.product_total_price_before_discount).toFixed(2) }€ {product.total_discount !== "" ?  "(-"+ product.total_discount+"€)"  : ""}</Label>

                          {/* </Col> */}
                          <Button  color='danger' style={{width: "30px", height : "30px",
                          justifyContent : "center",  alignItems : "center", display : "flex",
                          position: "absolute", top : "30%", right:"2%" }} 
                          onClick={() => removeProductButton(index)} >X</Button>
                        </FormGroup>


                        

                      </Form>
                    </div>)
                    : (
                    // <div className='product_in_basket_wrong' key={index}>
                    //   {
                    //       !product.display_on_ticket ? 
                    //           <div className='no_facture'> 
                    //               没发票
                    //           </div>
                    //       : ""
                    //   }
                    //   <a href={product.image.includes('http') ? product.image : './.' + product.image} target="_blank" rel="noopener noreferrer">
                    //   <img src={ product.image.includes('http') ? product.image : './.' + product.image} style={{marginRight:5, marginLeft:10}} height="55px" width="55px" border-radius ="20%" align="left" alt={product.product_full_name}  />
                    //   </a>
                    //   <Form >
                    //     <FormGroup row>
                    //       <Label  style={{fontSize: "60%", width :'55%', height: '40px', verticalAlign : 'middle',  marginLeft:"0px", marginRight:"1%", marginTop : "5px"}} >{product.product_full_name }</Label>
                    //       {/* <Col sm={2} style={{ marginRight:"0px", backgroundColor :'red'}}> */}
                    //       <Input type="number" style={{marginTop : "5px", width :'9%', height : '40px', textAlign:"center"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" />
                    //       {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}

                    //       {/* </Col> */}
                    //       {/* <Label  style={{fontSize: "50%", marginRight:"10px", marginTop : "5px"}} > X {product.product_price} = {product.product_total_price_before_discount }</Label> */}
                    //       {/* <Col sm={3} style={{ marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", backgroundColor :'green'}}> */}
                            
                    //       {/* <Input type="number" style={{marginTop : "5px"}} name={index} min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={product.quantity} placeholder="quantity" /> */}
                    //       <Label  style={{fontSize: "70%", width :'25%',  marginRight:"1%",marginLeft:"1%", marginTop : "5px" }} >x {product.product_price}€ = {product.product_total_price_before_discount }€ {product.total_discount !== "" ?  "(-"+ product.total_discount+"€)"  : ""}</Label>

                    //       {/* </Col> */}
                    //       <Button  color='danger' style={{width: "5%", height : "40px",  marginTop : "5px" }} onClick={() => removeProductButton(index)} >X</Button>
                    //     </FormGroup>
                    //   </Form>
                    // </div>
                    ""
                    )
                  ))
                  }
                  <Button  color='success' style={{marginTop: "20px", marginBottom: "10px"}} onClick={() =>  submit()} >Valider 确认</Button>
            </div>

        </div>
    </div>
  );
}

export default ModalCreateInvoice;