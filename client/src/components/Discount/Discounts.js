import React, {Component}  from 'react';
import {Link} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import productDB from "../../database/products.json"
import discountDB from "../../database/discounts.json"
import { removeDiscountedProducts } from '../../backend/localStorageManager';
import './Discounts.css'

class Discounts extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            products_to_give_a_discount : removeDiscountedProducts(productDB, discountDB), 
            // productDB.filter((product) => product.typeOfSale === "unit"),
            show_discount_form : false,
            productToGiveDiscountSelected : "N°" + removeDiscountedProducts(productDB, discountDB)[0].product_id + " "+ removeDiscountedProducts(productDB, discountDB)[0].product_full_name + " "+ removeDiscountedProducts(productDB, discountDB)[0].current_price +"€", 
            quantity_for_discount : "",
            total_discount_when_condition_met_once :"",
            ERROR : false,
            errors: {
                quantity_for_discount2 : "",
                total_discount_when_condition_met_once2 : "",
        },

            // ticketSelected : "N°" +ticketDB[0].ticket_id + " "+ new Date(ticketDB[0].date_of_purchase).toLocaleString() + " "+ticketDB[0].TTC + "€",
        };
        this.handleProduct = this.handleProduct.bind(this);
        this.handleQuantityForDiscount = this.handleQuantityForDiscount.bind(this);
        this.handleAmountOfDiscount = this.handleAmountOfDiscount.bind(this);
        this.showForm = this.showForm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addDiscount = this.addDiscount.bind(this);
    }



    // MsgErr(elt, msg) {
    //     /*This function will add error messages to the array errors
    //     It will be use in the funciton checkForm*/
    //     this.setState((lastState) => ({errors: {...lastState.errors, [elt] : msg }}));
    // }

    checkForm = () => {
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        let NbErrors = 0
        this.setState({errors: {
            quantity_for_discount2 : "",
            total_discount_when_condition_met_once2: "",
        }}); //reinitiate the array errors
        this.setState({ ERROR : false})

        // check if there are empty fiels
        if (this.state.quantity_for_discount === "") {
            // this.MsgErr("email", "You have not to fill in this field !");
            this.setState((lastState) => ({errors: {...lastState.errors, ["quantity_for_discount2"] : "Champ vide !" }}));
            this.setState({ ERROR : true});
            // console.log("ERROR :", this.state.ERROR)
            NbErrors++
        }
        if (this.state.total_discount_when_condition_met_once === "") {
            // this.MsgErr("password", "You have not to fill in this field !");
            this.setState((lastState) => ({errors: {...lastState.errors, ["total_discount_when_condition_met_once2"] : "Champ vide !" }}));
            this.setState({ ERROR : true});
            NbErrors++
        }
        if (Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€","")) * Number(this.state.quantity_for_discount ) -  Number(this.state.total_discount_when_condition_met_once) <=0) {
            this.setState((lastState) => ({errors: {...lastState.errors, ["total_discount_when_condition_met_once2"] : "Réduction trop avantageuse !" }}));
            this.setState({ ERROR : true});
            NbErrors++
        }
        return NbErrors
    };

    showForm = () =>{
        this.setState({show_discount_form : true})
    }

    cancel =() => {
        this.setState({show_discount_form : false})
    }
 

    handleProduct =(e) => {
        // console.log(e.target.value)
        // console.log("quantity_for_discount :",Number(this.state.quantity_for_discount))
        // console.log("current_price : ", Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€",""))  )
        // console.log("total_discount_when_condition_met_once :",Number(this.state.total_discount_when_condition_met_once) )

        this.setState({ productToGiveDiscountSelected : e.target.value})
        // console.log(e.target.value)
    }

    handleQuantityForDiscount =(e) => {
        if ( e.target.value.includes(".")) {
            this.setState({ quantity_for_discount : e.target.value.split('.')[0] })
        } else {
            this.setState({ quantity_for_discount : e.target.value})
        }
    }

    handleAmountOfDiscount =(e) => {
        if ( e.target.value.includes(".")) {
            this.setState({ total_discount_when_condition_met_once : e.target.value.split('.')[0] + "." + e.target.value.split('.')[1].substr(0,2)})
        } else {
            this.setState({ total_discount_when_condition_met_once : e.target.value})
        }
    }


    addDiscount =() =>{
        
        if (this.checkForm() === 0) {
            // console.log("before update discountDB.length :", discountDB.length)
            // console.log("before update :", discountDB)
            let newDiscountDB = discountDB
            const ID_selected = Number(this.state.productToGiveDiscountSelected.split(" ")[0].substring(2))
            newDiscountDB.push({
                product_id : ID_selected,
                product_full_name : productDB.filter((prod) => prod.product_id === ID_selected)[0].product_full_name,
                quantity_for_discount : Number(this.state.quantity_for_discount),
                total_discount_when_condition_met_once : Number(this.state.total_discount_when_condition_met_once)
            })
            // console.log("ID_selected :", ID_selected)
            // console.log("newDiscountDB :", newDiscountDB)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDiscountDB)
              };
            fetch('http://localhost:5000/discounts', requestOptions)
        }
    }


    removeProductButton = (toDelete) => {
        let newDiscountDB = discountDB.filter((discount) => discount.product_id !== toDelete)
        // console.log(newDiscountDB)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDiscountDB)
          };
        fetch('http://localhost:5000/discounts', requestOptions)
    }

    render() {
        // console.log("this.state.productToGiveDiscountSelected: ", this.state.productToGiveDiscountSelected)
        // console.log("this.state.errors: ", this.state.errors)
        // console.log("this.state.errors.quantity_for_discount2: ", this.state.errors.quantity_for_discount2)
        return (
            <div style={{ width: "80%"}}> 
                <h1>Promotions</h1>
                {this.state.show_discount_form ? 

                <div> 
                    <div>  
                        <Form>
                            <FormGroup row>
                                <Label sm={3} style={{fontSize: "60%"}}>Choisissez un produit à mettre en promotion 请选择要打折的食品</Label>
                                <Col sm={9}>
                                <Input type="select" name="productToGiveDiscountSelected" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                onChange={this.handleProduct} value={this.state.productToGiveDiscountSelected}  >
                                    {this.state.products_to_give_a_discount.map((product, index) => {
                                        return <option key={index}>N°{product.product_id} {product.product_full_name} {product.current_price}€</option>
                                    } )}
                                </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3} style={{fontSize: "60%"}}>Quantité à acheter pour recevoir la promotion 要买多少才能打折?</Label>
                                <Col sm={9}>
                                <Input type="number" name="quantity_for_discount" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                onChange={this.handleQuantityForDiscount} value={this.state.quantity_for_discount} min="0"  >
                                </Input>
                                </Col>
                            </FormGroup>
                            <p style={{fontSize: 15, color: "orange"}}>{this.state.ERROR && this.state.errors.quantity_for_discount2 !=="" ? "Ce champ est vide. 这个字段是空的" : ""}</p>

                            <FormGroup row>
                                <Label sm={3} style={{fontSize: "60%"}}>Montant de la remise 打折多少?</Label>
                                <Col sm={9}>
                                <Input type="number" name="total_discount_when_condition_met_once" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                onChange={this.handleAmountOfDiscount} value={this.state.total_discount_when_condition_met_once } min="0"  >
                                </Input>
                                </Col>
                            </FormGroup>
                            <p style={{fontSize: 15, color: "orange"}}>{this.state.ERROR &&  this.state.errors.total_discount_when_condition_met_once2 === "Champ vide !" ? "Ce champ est vide. 这个字段是空的" : ""}</p>
                            <p style={{fontSize: 15, color: "orange"}}>{this.state.ERROR &&  this.state.errors.total_discount_when_condition_met_once2 === "Réduction trop avantageuse !" ? "Réduction trop avantageuse !" : ""}</p>

                            <Button  color="success" style={{ marginRight : 5, width: "35%"}} onClick={this.addDiscount} >+ Ajouter un remise 打折</Button>
                            <Button  color="danger" style={{width: "35%"}} onClick={this.cancel} >Annuler 取消</Button>
                        </Form>
                    </div>

                    <div style={{marginBottom : 20}}>  
                        {(this.state.total_discount_when_condition_met_once !=="" && this.state.quantity_for_discount !=="") ? 
                            
                            <div>
                                {
                                    Number(this.state.quantity_for_discount)*Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€","")) - Number(this.state.total_discount_when_condition_met_once) <=0 ?
                                <p style={{color : "red"}}>{this.state.quantity_for_discount} x {Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€",""))} € = 
                                    <span style={{textDecorationLine :"line-through"}}> ({Number(this.state.quantity_for_discount)*Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€",""))} €)</span>
                                    <span> {Number(this.state.quantity_for_discount)*Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€","")) - Number(this.state.total_discount_when_condition_met_once)}€ </span>
                                </p> 
                                :
                                <p>{this.state.quantity_for_discount} x {Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€",""))} € = 
                                    <span style={{textDecorationLine :"line-through"}}> ({Number(this.state.quantity_for_discount)*Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€",""))} €)</span>
                                    <span> {Number(this.state.quantity_for_discount)*Number(this.state.productToGiveDiscountSelected.split(" ")[this.state.productToGiveDiscountSelected.split(" ").length -1].replace("€","")) - Number(this.state.total_discount_when_condition_met_once)}€ </span>
                                </p> 
                                }
                            </div>
                            : ""
                        }
                    </div>
                </div>
                
                



                    :
                    <Button  color="success" style={{marginBottom : 5, marginTop : 30, width: "35%", marginRight : 30}} onClick={this.showForm}  >+ Ajouter un remise 打折</Button>
                
                }
                <Link to="/"><Button color="primary" style={{marginBottom : 5, marginTop : 30, width: "35%"}}  >Retour 后退</Button></Link>
                
                <div style={{marginTop: 40}} >
                {
                    discountDB.map((discount, index) => ( 
                        <div className='product_in_discount' key={index}>
                            
                            <div className='discountContainer'>
                                <div className='firstColumn'>
                                        {/* <span>Hello</span> */}
                                        <a href={'./.' + productDB.filter((product)=> product.product_id === discount.product_id )[0].image}  target="_blank" rel="noopener noreferrer">
                                    <img src={ './.' + productDB.filter((product)=> product.product_id === discount.product_id )[0].image } style={{marginRight:5, marginLeft:10}} height="55px" width="55px" border-radius ="20%" align="left" alt={productDB.filter((product)=> product.product_id === discount.product_id )[0].product_full_name}  />
                                    </a>
                                </div>
                                
                            
                                <div className='secondColumn'>  
                                <span>{productDB.filter((product)=> product.product_id === discount.product_id )[0].product_full_name}</span>
                                
                             </div>
                             <div className='thirdColumn'>
                             <span style={{color : "black"}}>{discount.quantity_for_discount} x {productDB.filter((product)=> product.product_id === discount.product_id )[0].current_price} € = <span style={{textDecorationLine :"line-through"}}>
                                    ({discount.quantity_for_discount*productDB.filter((product)=> product.product_id === discount.product_id )[0].current_price} €)</span>
                                    <span> {Number(discount.quantity_for_discount)*Number(productDB.filter((product)=> product.product_id === discount.product_id )[0].current_price) - Number(discount.total_discount_when_condition_met_once)}€ </span>
                                </span> 
                             </div>
                                
                             <div className='fourthColumn'>
                             <Button  color='danger' style={{width: "40px", height : "40px",  marginTop : "5px" }} onClick={() => this.removeProductButton(discount.product_id)} >X</Button>

                             </div>

                        
                            
                            
                            </div>
                            
                        </div>
                    ))
                }
                </div>
                
                
            </div>
        );
    }
}

export default Discounts;