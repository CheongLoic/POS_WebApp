import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from 'reactstrap';
import "./Products.css"
import products from "../../database/products.js"
import ProductList from "./ProductList"

// import image_test from "../image_test.png" ;

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            All_products : products
        };
    }
  //   addProduct =()=> {
  //     console.log("Add product");
  //     // if (0<1) {
  //     //     <Navigate  to="/tickets"  replace={true} />
  //     // }
     
  //     return( <Navigate  to="/"  replace={true} />)
  //   //   const navigate = useNavigate();
  //   //  return( navigate("products")) 

  // }


    render() {
      
        return (
            
            <div> 
                <h1>Produits alimentaires 食品</h1>
                {
                  <Link to="/products/addNewProduct" style={{ textDecoration: 'none' }}>  <Button  color="danger" style={{marginBottom : 10, marginTop : 30}}  block>+ Ajouter un produit 加食品</Button></Link>
                  }
                  <Link to="/" style={{ textDecoration: 'none' }}><Button  color="primary"  style={{marginBottom : 10, marginTop : 20}} block >Retour 返回</Button></Link>
                {
                    this.state.All_products.map((product, index) =>( <ProductList key={index} index ={index} product_data={product}  />))
                }
                {/* <Button color="success" onClick={this.addProduct}>Ajouter</Button> */}
            </div>
        );
    }
}

export default Products;