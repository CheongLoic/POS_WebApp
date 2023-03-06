import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import './Menu.css';
import loading from "../img/loading-gif.gif"
import { setDataInLS } from '../backend/localStorageManager';
import productDB from '../database/products.json'
import ticketDB from "../database/tickets.json"
import customerDB from "../database/customers.json"
import invoiceDB from "../database/invoices.json"


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            dataLoaded : false
        });
    }

    componentDidMount() {
        if(localStorage.getItem("dataLoaded") === null) {
            console.log("First connection. Loading data ...")
            setDataInLS("dataLoaded", true)
            // localStorage.clear()
            setDataInLS("productDB", productDB)
            setDataInLS("ticketDB", ticketDB)
            setDataInLS("customerDB", customerDB)
            setDataInLS("invoiceDB", invoiceDB)
            // console.log(productDB)
            let barCodeAvailable_productID = []
            let product_with_barcode = productDB.filter((item) => item.barCode_available === true)
            let product_with_no_barcode = productDB.filter((item) => item.barCode_available === false)

            product_with_barcode.map( (product) =>  {
                product.barCode_list.map((item) => {

                    barCodeAvailable_productID.push({
                        barCode : item.barCode,
                        productID : product.product_id
                    })
                })  
            })

            // console.log(product_with_barcode)
            // console.log(barCodeAvailable_productID)
            setDataInLS("barCodeAvailable_productID", barCodeAvailable_productID)
            setDataInLS("product_with_barcode", product_with_barcode)
            setDataInLS("product_with_no_barcode", product_with_no_barcode)
            console.log("Data Loaded")
            this.setState({dataLoaded: true});

        } else {
            this.setState({dataLoaded: true});
        }
    }
    // importAll(r) {
    //     return r.keys().map(r);
    //   }
      
    render() {
        // const images = importAll(require.context('../img', false, /\.(png|jpg|jpe?g|svg)$/));
        return (
            <div>
                {this.state.dataLoaded ? 
                    <div id="menu">
                        <h1>Menu</h1>
                        {/* <img src={images["no_image.jpg"].default} width="200" height="200" />  */}
                        <Link to="/products"><Button  type="button" color="primary"  className="menuBtn" block>Produits alimentaires 食品</Button></Link>
                        <Link to="/tickets"><Button type="button" color="primary"  className="menuBtn" block>Tickets de caisse 收据</Button></Link>
                        <Link to="/invoices"><Button type="button" color="primary"  className="menuBtn" block>Factures 发票</Button></Link>
                        <Link to="/customers"><Button type="button" color="primary"  className="menuBtn" block>Clients 客户</Button></Link>
                        <Link to="/discounts"><Button type="button" color="primary"  className="menuBtn" block>Remises</Button></Link>
                        <Link to="/performances"><Button type="button" color="primary"  className="menuBtn" block>Performances 数据</Button></Link>
                    
                    </div>
                : <img src={loading} alt="loading"></img>
                }
                
                
            </div>
            
        );
    }
}

export default Menu;