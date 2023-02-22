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
        fetch('http://localhost:5000/products/addNewCustomer-send-data', requestOptions)
        // const navigate = useNavigate()
        // console.log("Data to send from /customers/addNewCustomer-send-data :", JSON.stringify(productDB))
        // this.setState({changePage : true})
        // goToPage("/products/addNewProduct");
        return( <Navigate  to="/products"  replace={true} />) 

    
    


        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.productDB.image);
        // return (
        //     <div>
        //         <img src={loading} alt="loading"></img>
                
        //     </div>
        // );

}

export default SendNewProductData;