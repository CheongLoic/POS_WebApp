import React, { useState} from 'react';
import {Link, Navigate } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import axios from "axios";
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';
// import { sortProductByIDAsc } from '../../backend/localStorageManager';

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


    const [error, setError] = useState(false) // Error for the form
    let ERROR = false // error in backend 
    const [form_data, setFormData] = useState({
        product_full_name:"", 
        product_price :"",
        product_name_on_ticket : "" ,
        type_of_sale : "Par unité 每件",
        barCode_available : "Oui 有",
        date_of_purchase: "", //received data format YYYY-MM-DD
        expiration_date : "",//received data format YYYY-MM-DD
        barCode : "",
        buying_price : "",
        quantity : "",
        default_sold_weight_kg : "",
        display_product_name : "Oui 要"
    });
    const changeHandler = (e) => {
        // console.log(e.target.value)  
        
        const { name, value } = e.target;
        setFormData((form_data) => ({ ...form_data, [name]: value }));
        // if (image_data.file.length === 0) {
        //     console.log("No file inserted !")
        //     console.log(image_data.file)
        // } else {
        //     console.log("File inserted !")
        //     console.log(image_data.file.length)
        //     console.log(image_data.file)
        // }
    };

    const [image_data, getImage] = useState({file : []})
    const handleInputImageChange = (event) => {
        // console.log("from handleInputImageChange :")
        console.log("event.target.files[0] : ",event.target.files[0]); //array
        console.log("event.target.files[0].name : "  , event.target.files[0].name); //file name
        console.log("event.target.files[0].name after : "  , event.target.files[0].name); //file name

        const img_file = event.target.files[0]
        let file_name = img_file.name.replaceAll(" ", "_")
        file_name = file_name.replaceAll("é", "e")
        file_name = file_name.replaceAll("è", "e")
        file_name = file_name.replaceAll("ê", "e")
        file_name = file_name.replaceAll("à", "a")
        file_name = file_name.replaceAll("ù", "u")
        file_name = file_name.replaceAll("'", "_")
        file_name = file_name.replaceAll("ç", "c")
        file_name = file_name.replaceAll("ï", "i")
        file_name = file_name.replaceAll("î", "i")


        // const newImgFile  = new File([img_file], file_name , {type: img_file.type})
        // // img_file.name = img_file.name.replaceAll(" ", "_")
        // console.log("test : "  , newImgFile); //file name

        const img_file_name_rectified = [new File([img_file], file_name , {type: img_file.type})]
        getImage({
            // ...image_data, file:event.target.files[0],
            ...image_data, file: img_file_name_rectified[0],
        })
        console.log("image_data : " , image_data); //Nothing
        console.log("image_data.file : " , image_data.file); //Nothing
        console.log("image_data.file.name : " , image_data.file.name); //Nothing

    }

    const checkField = ()=>{
      //this function checks if there is what it is expected in the fields
      //Otherwise, it will display a msg error
      
      if (form_data.product_full_name === "" || form_data.product_price === ""  || form_data.product_name_on_ticket === ""
      ||   ( form_data.type_of_sale === "Au poids 体重"  && form_data.default_sold_weight_kg === "")
      // || form_data.date_of_purchase === "" || form_data.expiration_date === "" 
      ||   ( form_data.barCode === ""  && form_data.barCode_available === "Oui 有")  
      // || image_data.file.name.includes(" ")  || image_data.file.name.includes("_") 
      ) {
          // console.log("before set error true from checkfield",error)
          setError(true) ;
          ERROR = true

          // console.log("image_data.file.name before : '", image_data.file.name, "'");
          // console.log("image_data.file  before : '", image_data.file, "'");
          // console.log("image_data  before : '", image_data, "'");
          // console.log("Set error true")
          // console.log("set error true from checkfield",error)
          // console.log("set ERROR true from checkfield",ERROR)
      } else {
          setError(false)
          ERROR = false
          // console.log("Set error false", error)
          // console.log("Set ERROR false", ERROR)
      }
      // console.log("error from checkfield",error)
      // console.log("ERROR from checkfield",ERROR)
  }


    const [formOK, AddButtonClicked] = useState(false)
    if (formOK) {
        return( <Navigate  to="/products/addNewProduct-send-data"  replace={true} />)
    }


    const submit = async () => {
        const formdata = new FormData();
        
        formdata.append('avatar', image_data.file);
        // formdata.append('test', "Hello world");
        // console.log("from submit :")
        // console.log(image_data.file);
        // console.log("image name : '", image_data.file.name, "'");
        // console.log(image_data.file[0]); //undefined
        // console.log("from formdata :")
        // console.log(form_data)
        checkField()

        if (ERROR === false) {
          const current_date = new Date();
          let productDB = getDataFromLS("productDB")
          let last_product = productDB[ Object.keys(productDB).sort().pop() ]
          const productID = last_product.product_id

          // let product_with_no_barcode = getDataFromLS("product_with_no_barcode")
          // let last_barCodeID = product_with_no_barcode[ Object.keys(product_with_no_barcode).sort().pop() ]
          // last_barCodeID = last_barCodeID.barCode_list
          // last_barCodeID = last_barCodeID[ Object.keys(last_barCodeID).sort().pop() ]
          // console.log("last_barCodeID: ", last_barCodeID)
          // last_barCodeID = last_barCodeID.barCode
          // console.log("last_barCodeID: ", last_barCodeID)

          

          const dataToSend = {
            product_id : productID+1,
            product_full_name: form_data.product_full_name, 
            product_name_on_ticket : form_data.product_name_on_ticket ,
            barCode_available : form_data.barCode_available === "Oui 有" ? true : false,
            barCode_list : form_data.barCode_available === "Oui 有" ? 
              [{
                barCode : form_data.barCode,
                quantity: form_data.quantity,
                buying_price: form_data.buying_price, 
                date_of_purchase: form_data.date_of_purchase,
                expiration_date : form_data.expiration_date,
              }] 
              :
              [{
                barCode : "",
                quantity: form_data.quantity,
                buying_price: form_data.buying_price, 
                date_of_purchase: form_data.date_of_purchase,
                expiration_date : form_data.expiration_date,
              }],
            price_history : [{
              date : current_date.toISOString().substring(0, 10),
              product_price: form_data.product_price
            }],
            current_price : form_data.product_price,
            typeOfSale : form_data.type_of_sale === "Par unité 每件" ? "unit": "weight",
            default_sold_weight_kg : form_data.default_sold_weight_kg,
            image : image_data.file.name === undefined ? "" : "./img/"+image_data.file.name,
            display_on_ticket: formdata.display_product_name === "Oui 要" ? true : false
          }


          if (form_data.barCode_available === "Oui 有" ) {
            let product_with_barcode = getDataFromLS("product_with_barcode")
            product_with_barcode.push(dataToSend)
            setDataInLS("product_with_barcode", product_with_barcode)

            let barCodeAvailable_productID = getDataFromLS("barCodeAvailable_productID")
            const db = {
              barCode: form_data.barCode,
              productID : dataToSend.product_id
            }
            barCodeAvailable_productID.push(db)
            setDataInLS("barCodeAvailable_productID", barCodeAvailable_productID)

          } else {
            let product_with_no_barcode = getDataFromLS("product_with_no_barcode")
            product_with_no_barcode.push(dataToSend)
            setDataInLS("product_with_no_barcode", product_with_no_barcode)
            
          }


          axios.post("http://localhost:5000/products/addNewProduct", formdata,{
            header : { "Content-Type" : "multipart/form-data"}
          })
          .then( res => {
              console.log(res.data);
          })
            .then(response => response.json())
          // console.log("old product DB :",productDB)
          productDB.push(dataToSend)
          setDataInLS("productDB", productDB)
          // console.log("new product DB :", productDB)
          AddButtonClicked(true);
        }
    }


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
            
            <div className="form_product"> 
              <Form action='/products/AddNewProduct' method="POST" >
                <FormGroup row>
                  <Label sm={5} style={{fontSize: "60%", width : "25%" }}>Nom du nouveau produit <br/> 新食品名称*</Label>
                  <Col sm={8}>
                  <Input type="text" name="product_full_name" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_full_name} placeholder="Nom du produit 食品名称" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_full_name.length===0 ? "Veuillez entrer le nom du produit. 请输入食品名称" : ""}</p>

                <FormGroup row>
                  <Label sm={5} style={{fontSize: "60%", width : "25%" }}>Nom du produit sur le ticket de caisse <br/> 收据上的产品名称*</Label>
                  <Col sm={8}>
                  <Input type="text" name="product_name_on_ticket"  maxLength="26" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_name_on_ticket} placeholder="Nom du produit 食品名称" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_name_on_ticket.length===0 ? "Veuillez entrer le nom du produit. 请输入收据上的产品名称" : ""}</p>

                  <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Prix 价格*</Label>
                  <Col sm={8}>
                  <Input type="number" name="product_price" min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_price} placeholder="Prix 价格" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_price.length===0 ? "Veuillez entrer le prix. 请输入价格" : ""}</p>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Type de vente 卖法*</Label>
                  <Col sm={8}>
                  <Input type="select" name="type_of_sale" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.type_of_sale}  >
                    <option>Par unité 每件</option>
                    <option>Au poids 体重</option>
                  </Input>
                  </Col>
                </FormGroup>

                {form_data.type_of_sale ===  "Au poids 体重" ? 
                  <div>
                    <FormGroup row>
                      <Label sm={3} style={{fontSize: "60%"}}>Poids vendu par défaut<br/>默认出售重量*</Label>
                      <Col sm={8}>
                      <Input type="number" name="default_sold_weight_kg" min="0" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                        onChange={changeHandler} value={form_data.default_sold_weight_kg}  placeholder="Poids vendu par défaut 默认出售重量" />
                      </Col>
                    </FormGroup>
                    <p style={{fontSize: 15, color: "orange"}}>{error && form_data.default_sold_weight_kg.length===0 ? "Veuillez entrer le poids vendu par défaut. 请输入默认出售重量" : ""}</p>
                  </div>
                : "" }

                {/* <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Quantité 数量</Label>
                  <Col sm={8}>
                  <Input type="number" name="quantity" min="0"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.quantity} placeholder="Quantité 数量" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Date d'achat 购买日期</Label> 
                  <Col sm={8}>
                  <Input type="date" name="date_of_purchase" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.date_of_purchase}  />
                  </Col>
                </FormGroup> */}
                {/* <p style={{fontSize: 15, color: "orange"}}>{error && form_data.date_of_purchase.length===0 ? "Veuillez entrer la date d'achat. 请输入购买日期" : ""}</p> */}

                {/* <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Prix d'achat 购买价格</Label> 
                  <Col sm={8}>
                  <Input type="number" name="buying_price" min="0" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.buying_price}  placeholder="Prix d'achat 购买价格" />
                  </Col>
                </FormGroup> */}
                {/* <p style={{fontSize: 15, color: "orange"}}>{error && form_data.buying_price.length===0 ? "Veuillez entrer la date d'achat. 请输入购买日期" : ""}</p> */}


                {/* <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Date d'expiration 到期</Label>
                  <Col sm={8}>
                  <Input type="date" name="expiration_date" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.expiration_date} />
                  </Col>
                </FormGroup> */}
                {/* <p style={{fontSize: 15, color: "orange"}}>{error && form_data.expiration_date.length===0 ? "Veuillez entrer la date d'expiration. 请输入到期日期" : ""}</p> */}

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Code-barre disponible?<br/>有没有条码? </Label>
                  <Col sm={8}>
                  <Input type="select" name="barCode_available" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.barCode_available}  >
                    <option>Oui 有</option>
                    <option>Non 没有</option>
                  </Input>
                  </Col>
                </FormGroup>

                {form_data.barCode_available ==="Oui 有" ? 
                  <div>
                    <FormGroup row>
                      <Label sm={3} style={{fontSize: "60%"}}>Code-barre 条码*</Label>
                      <Col sm={8}>
                      <Input type="number" name="barCode" min="0" max="9999999999999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.barCode}  placeholder="Code-barre 条码" />
                      </Col>
                    </FormGroup>
                    <p style={{fontSize: 15, color: "orange"}}>{error && form_data.barCode.length===0 ? "Veuillez entrer votre nom. 请输入您的姓氏" : ""}</p>
                  </div>
                : "" }


                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Afficher nom du produit sur ticket 显示在收据上食品名称 </Label>
                  <Col sm={8}>
                  <Input type="select" name="display_product_name" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.display_product_name}  >
                    <option>Oui 要</option>
                    <option>Non 不</option>
                  </Input>
                  </Col>
                </FormGroup>

                
                <FormGroup row>
                {/* <FormGroup action='/products/AddNewProduct' method="POST" row> */}
                  <Label sm={3} style={{fontSize: "60%"}}>Photo 照片</Label>
                  <Col sm={8}>
                  <Input type="file" name="upload_file" accept='image/*' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={handleInputImageChange}/>
                  </Col>
                </FormGroup>
                  
                
                <Button  color="success" style={{margin : "10px"}} onClick={() => submit()}>Ajouter 加食品</Button>
                <Link to="/products"><Button color="danger">Annuler 取消 </Button></Link>
              </Form>
      {/* <button color="success" type="button" onClick={() => clickedButton(true)}>Ajouter 加食品</button> */}

    
            </div>
        );
    // }
}

export default AddNewProduct;