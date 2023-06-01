import React, { useState } from 'react';
import productDB from "../../database/products.json"
import discountDB from "../../database/discounts.json"
import no_img from "../../img/no_image.jpg"
import {Button, Input, FormGroup, Col} from 'reactstrap';
import { sortDataByFullName } from '../../backend/localStorageManager';
import { LazyLoadImage } from "react-lazy-load-image-component";
import basket from "../../img/Cart-Logo.png"
import white_cart from "../../img/Cart-Logo-white.png"
import white_basket from "../../img/white_basket.png"
import { setDataInLS, getDataFromLS } from '../../backend/localStorageManager';
import "./CreateInvoice.css"
import loupe from "../../img/loupe.png"


const CreateInvoice = () => {
      
     const [searchInput, setSearchInput] = useState("")
     const [HT, setHT] = useState(0)
     let product_list = sortDataByFullName(productDB).map((product) => {
         return {
              product_id: product.product_id,
              product_full_name: product.product_full_name,
              product_name_on_ticket: product.product_name_on_ticket,
              quantity: "",
              product_price: product.current_price,
              product_total_price_before_discount: "", 
              total_discount : "",
              type_of_sale : product.typeOfSale,
              image : product.image
            }
    })
    // product_list = product_list.slice(0,20)
    const [product_list_to_display_on_screen, setProduct_list] = useState(product_list);

    const handleSearchBar =(e) => {
        setSearchInput(e.target.value)
    }

    const handleQtyFromInput = (e) => {
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

    const addToBasket = (index) => {
        let product_list = [...product_list_to_display_on_screen] //copy of the array
        if (product_list[index].quantity === "") {
            // console.log('index : ', index)
            // console.log('product_list[index].product_full_name',product_list[index].product_full_name)
            // console.log("from if product_list[index].quantity : '", product_list[index].quantity.length, "'")
            // console.log('product_list[index].quantity === ""',product_list[index].quantity === "")
            product_list[index].quantity = "1"
            product_list[index].product_total_price_before_discount =  product_list[index].product_price
            // console.log("from if product_list[index].quantity", product_list[index].quantity)
            setHT(HT + Number(product_list[index].product_price))
            setProduct_list(product_list)
        }
        else {
            product_list[index].quantity = (Number(product_list[index].quantity) + 1 ).toString()
            product_list[index].product_total_price_before_discount = (Number(product_list[index].quantity) * Number(product_list[index].product_price) ).toFixed(2)            
            setProduct_list(product_list)
            computeDiscount()
            // console.log("from else product_list[index].quantity", product_list[index].quantity)
            // console.log("from else product_list_to_display_on_screen", product_list_to_display_on_screen[index])
        }
    }

    const removeFromBasket = (index) => {
        let product_list = [...product_list_to_display_on_screen] //copy of the array
        let newQty = Number(product_list[index].quantity) - 1 
        if (newQty <= 0) {
            product_list[index].quantity = ""
            product_list[index].product_total_price_before_discount =  ""
            product_list[index].total_discount = ""
            setProduct_list(product_list)
            var PRX_BF_DISC = product_list.map(product => Number(product.product_total_price_before_discount)).reduce((tot, amount) => tot + amount)
            var DISC = product_list.map(product => Number(product.total_discount)).reduce((tot, amount) => tot + amount)
            setHT(PRX_BF_DISC -DISC)
        } else {
            product_list[index].quantity = (Number(product_list[index].quantity) - 1 ).toString()
            product_list[index].product_total_price_before_discount = (Number(product_list[index].quantity) * Number(product_list[index].product_price) ).toFixed(2)            
            setProduct_list(product_list)
            computeDiscount()
            
        }
    }

    const computeDiscount = () => {
        let HT_LS = 0 //HT
        let TOTAL_DISCOUNT_IN_THE_BASKET_LS = 0
        // console.log("enter in computeDiscount")
        let product_list = [...product_list_to_display_on_screen] //copy of the array

        for (let i in product_list) {
            if (product_list[i].quantity !=="") {
                // console.log("product_list[i].product_full_name :", product_list[i].product_full_name)
                HT_LS += Number(product_list[i].product_total_price_before_discount)//HT
                let tot_discount = 0 //total discount for the product
                product_list[i].total_discount = ""
                const product_discountDB = discountDB.filter((discount) => discount.product_id === product_list[i].product_id)

                if (product_discountDB.length >0) { // Is there a discount for the barcode ? If Yes, do the following code below
                    const qty_for_discount = product_discountDB[0].quantity_for_discount //int <==== condition for the discount, the customer has to get a certain amount of this product to claim the discount
                    const total_discount_when_condition_met_once = product_discountDB[0].total_discount_when_condition_met_once
                    // const reste = qte % qty_for_discount //Reste de la division euclidienne
                    const quotient = Math.trunc(Number(product_list[i].quantity) / qty_for_discount) //Le quotient de la division euclidienne sert de multiplicateur pour calculer le montant de la remise totale
                // console.log('quotient :', quotient)
                    if (quotient >=1 ) {
                        // tot_discount += Math.trunc( quotient * total_discount_when_condition_met_once  *100)/100
                        tot_discount += quotient * total_discount_when_condition_met_once
                        tot_discount = Number(tot_discount.toFixed(2))

                        // TOTAL_DISCOUNT_IN_THE_BASKET_LS = Math.trunc( (TOTAL_DISCOUNT_IN_THE_BASKET_LS + tot_discount ) *100)/100
                        // setDataInLS("TOTAL_DISCOUNT_IN_THE_BASKET_LS", TOTAL_DISCOUNT_IN_THE_BASKET_LS)
                        product_list[i].total_discount = tot_discount
                        HT_LS -= tot_discount //HT
                        TOTAL_DISCOUNT_IN_THE_BASKET_LS +=  tot_discount
                        // console.log("/!\\ PRODUIT A DISCOUNTER !!! TOTAL DISCOUNT : ", tot_discount)
                    } 
                }
            }
        }
        // console.log("Products_scanned : ", product_list)
        setDataInLS("HT_LS", HT_LS)//HT
        setHT(HT_LS)
        // console.log("HT", HT)
        // console.log("HT_LS", HT_LS)
        // setDataInLS('product_basket_LS',product_list)//product_list_to_display_on_screen
        setDataInLS('TOTAL_DISCOUNT_IN_THE_BASKET_LS',TOTAL_DISCOUNT_IN_THE_BASKET_LS) // TO DO
        // setTTC(HT_LS)
        // setProduct_list(product_list)//product_list_to_display_on_screen
        setProduct_list(product_list)
    }
    


    return (
        <div style={{overflowX : "hidden"}}>
            <div className='searchbar_basket_container'>
                <div className='searchbar_basket'> 
                        <div className='searchbox'> 
                            <Input type="text" name="searchInputBar" value={searchInput} style={{width : "100%", boxShadow : "none", borderColor: "white"}} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  onChange={handleSearchBar} />
                            <img src={loupe} style={{marginLeft: "1%", marginTop: "1%"}}  width={40} height={40} alt="loupe"/>
                        </div>
                        <img src={basket} width={50} height={50} alt="panier"/>
                        <span style={{color: "red", marginLeft: "1%"}}>{(HT* 1.055 ).toFixed(2)}</span>
                </div>
            </div>
            
            <div className='below_searchbar'>
                <div>
                    <h1>Produits alimentaires 食品</h1>
                </div>
                
                <div className='product_catalogue'>
                {/* {console.log(product_list_to_display_on_screen)} */}
                    { product_list_to_display_on_screen.map((product, index) =>( 
                            searchInput === "" ? 
                                <div className='product_catalogue_icon' key={index}>
                                        
                                    <div  className="img_product_container">
                                        <LazyLoadImage effect='blur' src={`${product.image}` === "" ? no_img : "./."+`${product.image}` } height="200px" width="200px" border-radius ="20%" align="center" alt={product.product_full_name} />
                                    </div>

                                    <div className="text-container" >
                                        <span>{product.product_full_name}</span>
                                    </div >
                                    
                                    <div className='price_qty_block'>  
                                        <span>{ Number(product.product_price).toFixed(2)} €</span>
                                        {product.quantity === "" ? 
                                            <img src={white_basket} width={33} height={33} style={{cursor : "pointer", backgroundColor : "#0970E6", position : "absolute" , right: "10px", borderRadius: "50%", paddingBottom : 2, paddingRight : 2, paddingLeft : 2}}  onClick={() => addToBasket(index) } alt="white_cart" />
                                        : <div> 
                                            <FormGroup row>
                                                <Button style={{width :'30px', height : '30px', borderRadius : "50%", color : "white", backgroundColor:"#2B3336", marginLeft: "20px"}} onClick={() =>removeFromBasket(index)} >-</Button>
                                                <Input type="number"  name={index} min="0" max="100" style={{width :'70px', height : '30px', textAlign:"center", marginLeft: "5px"}} onChange={handleQtyFromInput} value={product.quantity} placeholder="quantity" />
                                                <Button style={{width :'30px', height : '30px', borderRadius : "50%", color : "white", backgroundColor:"red", marginLeft: "5px"}}  onClick={() =>addToBasket(index)}>+</Button>
                                            {/* <span>{ product.quantity}</span> */}
                                            </FormGroup>
                                        </div>
                                        }
                                    </div >
                                    
                                    
                                
                                </div>
                            :
                            product.product_full_name.toLowerCase().includes(searchInput.toLowerCase()) ?
                                    <div className='product_catalogue_icon' key={index}>
                                                
                                        <div  className="img_product_container">
                                            <LazyLoadImage effect='blur' src={`${product.image}` === "" ? no_img : "./."+`${product.image}` } height="200px" width="200px" border-radius ="20%" align="center" alt={product.product_full_name} />
                                        </div>

                                        <div className="text-container" >
                                            <span>{product.product_full_name}</span>
                                        </div >
                            
                                        <div className='price_qty_block'>  
                                        <span>{ Number(product.product_price).toFixed(2)} €</span>
                                        {product.quantity === "" ? 
                                            <img src={white_basket} width={33} height={33} style={{cursor : "pointer", backgroundColor : "#0970E6", position : "absolute" , right: "10px", borderRadius: "50%", paddingBottom : 2, paddingRight : 2, paddingLeft : 2}}  onClick={() => addToBasket(index) } alt="white_cart" />
                                        : <div> 
                                            <FormGroup row>
                                                <Button style={{width :'30px', height : '30px', borderRadius : "50%", color : "white", backgroundColor:"#2B3336", marginLeft: "20px"}} onClick={() =>removeFromBasket(index)} >-</Button>
                                                <Input type="number"  name={index} min="0" max="100" style={{width :'70px', height : '30px', textAlign:"center", marginLeft: "5px"}} onChange={handleQtyFromInput} value={product.quantity} placeholder="quantity" />
                                                <Button style={{width :'30px', height : '30px', borderRadius : "50%", color : "white", backgroundColor:"red", marginLeft: "5px"}}  onClick={() =>addToBasket(index)}>+</Button>
                                            {/* <span>{ product.quantity}</span> */}
                                            </FormGroup>
                                        </div>
                                        }
                                    </div >
                                
                                    </div>
                                    : 
                                    ""
                        ))
                    }
                </div>
            </div>

        </div>
    )
}


export default CreateInvoice;