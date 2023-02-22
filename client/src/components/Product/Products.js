import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from 'reactstrap';
import "./Products.css"
import products from "../../database/products.json"
import ProductList from "./ProductList"
import { sortDataByFullName } from '../../backend/localStorageManager';

// import image_test from "../image_test.png" ;

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            All_products : sortDataByFullName(products)
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
                <div> 
                    {
                    <Link to="/products/addNewProduct" style={{ textDecoration: 'none' }}>  <Button  color="danger" style={{marginBottom : 5, marginTop : 30}}  block>+ Ajouter un produit 加食品</Button></Link>
                    }
                    <Link to="/" style={{ textDecoration: 'none' }}><Button  color="primary"  style={{marginBottom : 20, marginTop : 10}} block >Retour 返回</Button></Link>
                </div>
                {/* <div class=' reset-style'> */}
                
                <div className='product_catalogue'>
                    {
                        this.state.All_products.map((product, index) =>( <ProductList key={index} index ={index} product_data={product}  />))
                    }
                </div>
                {/* </div> */}
                
                
                {/* <Button color="success" onClick={this.addProduct}>Ajouter</Button> */}
            </div>
        );
    }
}

export default Products;