import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from 'reactstrap';
import "./Products.css"
import products from "../../database/products.json"
import ProductList from "./ProductList"
import { sortDataByFullName } from '../../backend/localStorageManager';
// import loading_gif from "../../img/loading-gif.gif"
// import ProductsCataloguePDF from './ProductsCataloguePDF';
// import { PDFDownloadLink } from '@react-pdf/renderer';

// import image_test from "../image_test.png" ;

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            All_products : sortDataByFullName(products) //tri Ascendant des noms
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
                    
                    <Link to="/products/addNewProduct" style={{ textDecoration: 'none' }}>  <Button  color="danger" style={{width : "50%",marginBottom : 5, marginTop : 30}}  >+ Ajouter un produit 加食品</Button></Link>
                    <br/>
                    <Link to="/products/download_product_catalogue" style={{ textDecoration: 'none' }}>  <Button  color="primary" style={{width : "50%",marginBottom : 5, marginTop : 10}}  >Télécharger catalogue des produits</Button></Link>
                    <br/>
                    <Link to="/" style={{ textDecoration: 'none' }}><Button  color="primary"  style={{width : "50%",marginBottom : 20, marginTop : 10}}   >Retour 后退</Button></Link>
                    <br/>
                    {/* <PDFDownloadLink document={<ProductsCataloguePDF productsDB={this.state.All_products}  />} fileName="catalogue_produits1.pdf">
                    {({loading}) => (loading ? 
                        <img src={loading_gif} height="30px" width="30px" border-radius ="11%" alt="loading_gif"></img>
                        : 
                        <Button style={{width : "50%",marginBottom : 20, marginTop : 10}}    color="primary" >Télécharger catalogues des produits</Button>)}
                    </PDFDownloadLink> */}

                </div>
                
                <div className='product_catalogue'>
                    {
                        this.state.All_products.map((product, index) =>( <ProductList key={index} index={index} product_data={product}  />))
                    }
                </div>
                
                
                {/* <Button color="success" onClick={this.addProduct}>Ajouter</Button> */}
            </div>
        );
    }
}

export default Products;