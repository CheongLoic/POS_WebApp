// import React from 'react';
// import loading from "../../img/loading-gif.gif"
import { getDataFromLS } from '../../backend/localStorageManager';
import { Navigate } from "react-router-dom";
// import {goToPage} from "../goToPage"


 const SendNewProductData =() => {
    
        const productDB = getDataFromLS("productDB")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productDB)
          };
        fetch('http://localhost:5000/products/addNewProduct-send-data', requestOptions)
        // const navigate = useNavigate()
        // console.log("Data to send from /customers/addNewProduct-send-data :", JSON.stringify(productDB))
        // this.setState({changePage : true})
        // goToPage("/products/addNewProduct");
        setTimeout(() => {
          console.log("waiting")
      }, 100000)
        return( <Navigate  to="/products"  replace={true} />) 

}

export default SendNewProductData;