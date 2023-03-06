import React, {Component}  from 'react';
import {Link} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import productDB from "../../database/products.json"

class Discounts extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            products_to_give_a_discount : productDB.filter((product) => product.typeOfSale === "unit"),
            show_discount_form : false,
            productToGiveDiscountSelected : "Produit N°" + productDB[0].product_id + " "+ productDB[0].product_full_name + " "+ productDB[0].current_price +"€", 
            quantity_for_discount : "",
            total_products_price_after_discount_when_condition_met_once :""
            // ticketSelected : "N°" +ticketDB[0].ticket_id + " "+ new Date(ticketDB[0].date_of_purchase).toLocaleString() + " "+ticketDB[0].TTC + "€",
        };
        this.handleProduct = this.handleProduct.bind(this);
        this.handleQuantityForDiscount = this.handleQuantityForDiscount.bind(this);
        this.handleAmountOfDiscount = this.handleAmountOfDiscount.bind(this);
        this.showForm = this.showForm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addDiscount = this.addDiscount.bind(this);
    }

    

    showForm = () =>{
        this.setState({show_discount_form : true})
    }

    cancel =() => {
        this.setState({show_discount_form : false})
    }


    handleProduct =(e) => {
        this.setState({ productToGiveDiscountSelected : e.target.value})
        // console.log(e.target.value)
    }

    handleQuantityForDiscount =(e) => {
        this.setState({ quantity_for_discount : e.target.value})
    }

    handleAmountOfDiscount =(e) => {
        this.setState({ total_products_price_after_discount_when_condition_met_once : e.target.value})
    }


    addDiscount =() =>{

    }

    render() {
        console.log("Hello from Discount");
        return (
            <div> 
                <h1>Remises</h1>
                {this.state.show_discount_form ? 
                    <Form>
                    <FormGroup row>
                      <Label sm={3} style={{fontSize: "60%"}}>Choisissez un produit à mettre en promotion 请选择要打折的食品</Label>
                      <Col sm={8}>
                      <Input type="select" name="productToGiveDiscountSelected" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                      onChange={this.handleProduct} value={this.state.products_to_give_a_discount}  >
                        {this.state.products_to_give_a_discount.map((product, index) => {return <option key={index}>N°{product.product_id} {product.product_full_name} {product.current_price}€</option>} )}
                      </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={3} style={{fontSize: "60%"}}>Quantité à acheter pour recevoir la promotion 要买多少才能打折?</Label>
                      <Col sm={8}>
                      <Input type="number" name="quantity_for_discount" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                      onChange={this.handleQuantityForDiscount} value={this.state.quantity_for_discount} min="0"  >
                      </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={3} style={{fontSize: "60%"}}>Montant de la remise 打折多少?</Label>
                      <Col sm={8}>
                      <Input type="number" name="total_products_price_after_discount_when_condition_met_once" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                      onChange={this.handleAmountOfDiscount} value={this.state.total_products_price_after_discount_when_condition_met_once } min="0"  >
                      </Input>
                      </Col>
                    </FormGroup>

                    <Button  color="success" style={{marginBottom : 40, marginRight : 5, width: "35%"}} onClick={this.addDiscount} >+ Ajouter un remise 打折</Button>
                    <Button  color="danger" style={{marginBottom : 40,width: "35%"}} onClick={this.cancel} >Annuler 取消</Button>
                  </Form>
                    :
                    <Button  color="danger" style={{marginBottom : 5, marginTop : 30, width: "35%"}} onClick={this.showForm} block >+ Ajouter un remise 打折</Button>
                
                }
                <Link to="/"><Button color="primary" block>Retour 返回</Button></Link>
                
            </div>
        );
    }
}

export default Discounts;