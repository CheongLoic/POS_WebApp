import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from 'reactstrap';
import "./Products.css"
import products from "../../database/products.json"
import { sortDataByFullName } from '../../backend/localStorageManager';
import loading_gif from "../../img/loading-gif.gif"
import ProductsCataloguePDF from './ProductsCataloguePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

// import image_test from "../image_test.png" ;

class DownloadProductCataloguePage extends Component {

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
                <h1>Téléchargement catalogue de produits </h1>
                <div> 
                    <PDFDownloadLink document={<ProductsCataloguePDF productsDB={this.state.All_products}  />} fileName="catalogue_produits2.pdf">
                    {({loading}) => (loading ? 
                    
                        (
                            <div>
                                <img src={loading_gif} height="30px" width="30px" border-radius ="11%" alt="loading_gif"></img>
                                <h5>Veuillez patienter 请稍等一下 ...</h5>
                            </div>
                        
                        )
                        : 
                        <Button style={{width : "50%",marginBottom : 10, marginTop : 10}}    color="primary" >Télécharger catalogue des produits en PDF <br />下载PDF格式的产品目录目录册</Button>)}
                    </PDFDownloadLink>
                    <br/>
                    <Link to="/products" style={{ textDecoration: 'none' }}><Button  color="primary"  style={{width : "50%",marginBottom : 5, marginTop : 10}}   >Retour 后退</Button></Link>

 {/* <PDFDownloadLink document={<ProductsCataloguePDF productsDB={this.state.All_products}  />} fileName="catalogue_produits1.pdf">
                    {({loading}) => (loading ? 
                        <img src={loading_gif} height="30px" width="30px" border-radius ="11%" alt="loading_gif"></img>
                        : 
                        <Button style={{width : "50%",marginBottom : 20, marginTop : 10}}    color="primary" >Télécharger catalogues des produits 1</Button>)}
                    </PDFDownloadLink> */}
                    {/* <img src={"./."+`${this.state.All_products[0].image}`} height="30px" width="30px" border-radius ="11%" alt="test"></img> */}
                </div>
            </div>
        );
    }
}

export default DownloadProductCataloguePage;