import React, { useState} from 'react';
import {Link, Navigate } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from "axios";
var DatePicker = require("reactstrap-date-picker");

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewProduct = () => {

//     constructor(props) {
//         super(props);
//         this.state = {
//             product_name : "",
//             product_image : "",
//             isAddingProduct: false,
//             errors: []
//         };
//         this.handleChangeProductName = this.handleChangeProductName.bind(this);
//         this.handleChangeProductName = this.handleChangeProductName.bind(this);
//         this.enableAddingProduct = this.enableAddingProduct.bind(this);
//         this.addProduct = this.addProduct.bind(this);
//     }

//     handleChangeProductName = event => {
//         this.setState({ product_name : event.target.value });
//     }



    const [form_data, setFormData] = useState({
        product_name:"", 
        product_price :"",
        type_of_sale : "",
        date_of_purchase: "",
        expiration_date : "",
        barCode : ""
    });
    const changeHandler = (e) => {
        // console.log(e.target.value)  
        const { name, value } = e.target;
        setFormData((form_data) => ({ ...form_data, [name]: value }));
        // if (imade_data.file.length === 0) {
        //     console.log("No file inserted !")
        //     console.log(imade_data.file)
        // } else {
        //     console.log("File inserted !")
        //     console.log(imade_data.file.length)
        //     console.log(imade_data.file)
        // }
    };

    const [imade_data, getImage] = useState({file : []})
    const handleInputImageChange = (event) => {
        // console.log("from handleInputImageChange :")
        // console.log(event.target.files[0]); //array
        // console.log(event.target.files[0].name); //file name
        getImage({
            ...imade_data, file:event.target.files[0],
        })
        // console.log(imade_data); //Nothing

    }
    const [formOK, AddButtonClicked] = useState(false)
    if (formOK) {
        return( <Navigate  to="/products"  replace={true} />)
    }


    const submit = async () => {
        const formdata = new FormData();
        formdata.append('avatar', imade_data.file);
        console.log("from submit :")
        console.log(imade_data.file);
        console.log(imade_data.file[0]); //undefined
        
        axios.post("http://localhost:3000/products/addNewProduct", formdata,{
            header : { "Content-Type" : "multipart/form-data"}
        })
        .then( res => {
            console.warn(res);
        })
        //AddButtonClicked(true);

    }


    
//     handleChangeProductImage = event => {
//       this.setState({ product_image : event.target.value });
//   }

//     enableAddingProduct = () => {
//         this.setState({isAddingProduct: true});
//     };


//     // Parameters :
//     // - elt : element ==> where to display the error message ?
//     // - msg : a string of message to display
//     MsgErr(elt, msg) {
//         /*This function will add error messages to the array errors
//         It will be use in the funciton checkForm*/
//         this.setState((lastState) => ({errors: [...lastState.errors, {elt, msg}]}));
//     }

//     addProduct =()=> {
//         console.log("Add product");
//         // if (0<1) {
//             // <Navigate  to="/tickets"  replace={true} />
//         // }
       
//         // return( <Navigate  to="/"  replace={true} />)
//         const navigate = useNavigate();
//        return( navigate("/products")) 

//     }



    // render() {
        return (
            
            <div> 
               <Form>
        <FormGroup >
          <Label>Nom du nouveau produit 新食品名称</Label>
          <Input type="text" name="product_name" onChange={changeHandler} value={form_data.product_name} placeholder="Nom du produit 食品名称" />
          </FormGroup>

          <FormGroup>
          <Label>Prix 价格</Label>
          <Input type="number" name="product_price" min="0" max="100" onChange={changeHandler} value={form_data.product_price} placeholder="Prix 价格" />
        </FormGroup>

        <FormGroup>
          <Label >Type de vente</Label>
          <Input type="select" name="type_of_sale" onChange={changeHandler} value={form_data.type_of_sale}  >
            <option>Par unité</option>
            <option>Au poids 体重</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label >Date d'achat</Label>
          <Input type="date" name="date_of_purchase" onChange={changeHandler} value={form_data.date_of_purchase}  />
        </FormGroup>

        <FormGroup>
          <Label >Date d'expiration</Label>
          <Input type="date" name="expiration_date" onChange={changeHandler} value={form_data.expiration_date} />
        </FormGroup>

        <FormGroup>
          <Label >Code-barre 条码</Label>
          <Input type="number" name="barCode" min="0" max="9999999999999" onChange={changeHandler} value={form_data.barCode}  placeholder="Code-barre 条码" />
        </FormGroup>

        {/* <FormGroup> */}
        <FormGroup action='/products/AddNewProduct' method="POST">
          <Label>Photo 照片</Label>
          <Input type="file" name="upload_file" accept='image/*' onChange={handleInputImageChange}/>
        </FormGroup>
          
        {/* <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Check me out
          </Label>
        </FormGroup> */}
        <Button type="submit" color="success" onClick={() => submit()}>Ajouter 加食品</Button>
        <Link to="/products"><Button color="danger">Annuler 取消 </Button></Link>
      </Form>
      {/* <button color="success" type="button" onClick={() => clickedButton(true)}>Ajouter 加食品</button> */}

    
            </div>
        );
    // }
}

export default AddNewProduct;