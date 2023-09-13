import React, { useState} from 'react';
import {Link, Navigate } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import axios from "axios";
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';
// import { sortProductByIDAsc } from '../../backend/localStorageManager';

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewProduct = () => {

    const [error, setError] = useState(false) // Error for the form
    // const [chinese_caracter_recognized, setChineseRecognized] = useState(false) // Error for the form
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
        display_product_name : "Oui 有"
    });
    const [image_data, setImage] = useState({file : []})
    const handleInputImageChange = (event) => {
        // console.log("from handleInputImageChange :")
        const img_file = event.target.files[0]
        const chinese_caracter_array = event.target.files[0].name.split("").filter(char => /\p{Script=Han}/u.test(char)) //return an array of chinese caracters
        if (chinese_caracter_array.length > 0 )
          setError(true)
          ERROR = true
        //   setImage({
        //     ...image_data, file:event.target.files[0],
        //     // ...image_data, file: img_file_name_rectified[0],
        // })
        //  else {
          console.log("event.target.files[0] : ",event.target.files[0]); //array
          console.log("event.target.files[0].name : "  , event.target.files[0].name); //file name
          console.log("event.target.files[0].name after : "  , event.target.files[0].name); //file name

          
          let file_name = img_file.name.replaceAll(" ", "_")
          file_name = file_name.replaceAll("é", "e")
          file_name = file_name.replaceAll("è", "e")
          file_name = file_name.replaceAll("ê", "e")
          file_name = file_name.replaceAll("à", "a")
          file_name = file_name.replaceAll("â", "a")
          file_name = file_name.replaceAll("ù", "u")
          file_name = file_name.replaceAll("'", "_")
          file_name = file_name.replaceAll("ç", "c")
          file_name = file_name.replaceAll("ï", "i")
          file_name = file_name.replaceAll("î", "i")
          file_name = file_name.replaceAll("ô", "o")

          // const newImgFile  = new File([img_file], file_name , {type: img_file.type})
          // // img_file.name = img_file.name.replaceAll(" ", "_")
          // console.log("test : "  , newImgFile); //file name

          const img_file_name_rectified = [new File([img_file], file_name , {type: img_file.type})]
          setImage({
              // ...image_data, file:event.target.files[0],
              ...image_data, file: img_file_name_rectified[0],
          })
          console.log("image_data : " , image_data); //Nothing at first render
          console.log("image_data.file : " , image_data.file); //Nothing at first render
          console.log("image_data.file.name : " , image_data.file.name); //Nothing at first render
        // }
        

    }


    const changeHandler = (e) => {
        // console.log(e.target.value)  
        
        const { name, value } = e.target;
        if (name === "barCode") {
          if (value.length > 13) {
            setFormData((form_data) => ({ ...form_data, [name]: value.slice(0, 13) }));
          } else {
            setFormData((form_data) => ({ ...form_data, [name]: value }));
          }
        } else if (name === "product_price" && value.includes(".")) {
          const newValue = value.split('.')[0] + "." + value.split('.')[1].substr(0,2)
          setFormData((form_data) => ({ ...form_data, [name]: newValue  }));
        }
        else {
          setFormData((form_data) => ({ ...form_data, [name]: value }));
        }
        
        // if (image_data.file.length === 0) {
        //     console.log("No file inserted !")
        //     console.log(image_data.file)
        // } else {
        //     console.log("File inserted !")
        //     console.log(image_data.file.length)
        //     console.log(image_data.file)
        // }
        
    };

    

    const checkField = ()=>{
      //this function checks if there is what it is expected in the fields
      //Otherwise, it will display a msg error
      const chinese_caracter_product_name_on_ticket = form_data.product_name_on_ticket.split("").filter(char => /\p{Script=Han}/u.test(char)) //return an array of chineese caracterss
      let chinese_caracter_image = []
      if (image_data.file instanceof File ) chinese_caracter_image = image_data.file.name.split("").filter(char => /\p{Script=Han}/u.test(char))      //return an array of chineese caracterss 


      if (form_data.product_full_name === "" || form_data.product_price === ""  || form_data.product_name_on_ticket === ""
      // ||   ( form_data.type_of_sale === "Au poids 体重"  && form_data.default_sold_weight_kg === "")
      // || form_data.date_of_purchase === "" || form_data.expiration_date === "" 
      ||   ( form_data.barCode === ""  && form_data.barCode_available === "Oui 有")  
      || chinese_caracter_product_name_on_ticket.length > 0
      || chinese_caracter_image.length > 0
      // || image_data.file.name.includes(" ")  || image_data.file.name.includes("_") 
      ) {
          // console.log("before set error true from checkfield",error)
          setError(true) ;
          ERROR = true
          // setChineseRecognized(true)
          // console.log("chinese_caracter_recognized :", chinese_caracter_array)
          // console.log("chinese_caracter_recognized :", chinese_caracter_recognized)
          // console.log("image_data.file.name before : '", image_data.file.name, "'");
          // console.log("image_data.file  before : '", image_data.file, "'");
          // console.log("image_data  before : '", image_data, "'");
          // console.log("Set error true")
          console.log("set error to true from checkfield : ",error)
          // console.log("set ERROR true from checkfield",ERROR)
      } else {
          setError(false)
          ERROR = false
          // setChineseRecognized(false)
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
        
        
        // formdata.append('test', "Hello world");
        // console.log("from submit :")
        // console.log(image_data.file);
        // console.log("image name : '", image_data.file.name, "'");
        // console.log(image_data.file[0]); //undefined
        // console.log("from formdata :")
        // console.log(form_data)
        checkField()


        if (!ERROR ) {
          const current_date = new Date();
          let productDB = getDataFromLS("productDB")
          let productDB_sorted = productDB.sort((a, b) => {//tricroissant par product_id
          if (a.product_id < b.product_id) {
              return -1;
            }
            if (a.product_id > b.product_id) {
                return 1;
              }
              // a must be equal to b
              return 0;
          })
          let last_product = productDB_sorted[productDB_sorted.length - 1 ]
          const productID = last_product.product_id

          // let product_with_no_barcode = getDataFromLS("product_with_no_barcode")
          // let last_barCodeID = product_with_no_barcode[ Object.keys(product_with_no_barcode).sort().pop() ]
          // last_barCodeID = last_barCodeID.barCode_list
          // last_barCodeID = last_barCodeID[ Object.keys(last_barCodeID).sort().pop() ]
          // console.log("last_barCodeID: ", last_barCodeID)
          // last_barCodeID = last_barCodeID.barCode
          // console.log("last_barCodeID: ", last_barCodeID)
          let newBarcode = form_data.barCode
          if (form_data.barCode.length <13) newBarcode= "0".repeat(13-form_data.barCode.length) + newBarcode
          
          let imageExisted = productDB.filter((product) => product.image === "./img/"+image_data.file.name )
          console.log("imageExisted 1" , imageExisted)
          let newImageName = "./img/"+ image_data.file.name 
          let i = 0
          while (imageExisted.length !== 0) {
            i += 1
            // console.log(newImageName.split('.').slice(1).join("."))
            newImageName = "./img/"+ image_data.file.name.split('.')[0] + '('+ i + ')' + image_data.file.name.split('.').slice(1, image_data.file.name.split('.').length -2).join(".") + "."+image_data.file.name.split('.')[image_data.file.name.split('.').length-1]
            imageExisted = productDB.filter((product) => product.image === newImageName )
            console.log("newImageName" , newImageName)
            console.log("imageExisted" , imageExisted)
          }
          if (i >= 1) {
            // i -= 1
          newImageName =  "./img/"+image_data.file.name.split('.')[0] + '('+ i + ')' + image_data.file.name.split('.').slice(1, image_data.file.name.split('.').length -2).join(".") + "."+image_data.file.name.split('.')[image_data.file.name.split('.').length-1]

            // const img_file_name_rectified = [new File([image_data], newImageName , {type: image_data.file.type})]
          // setImage({
          //     // ...image_data, file:event.target.files[0],
          //     ...image_data, file: img_file_name_rectified[0],
          // })
          
          }
          formdata.append('avatar', image_data.file);
         

          const dataToSend = {
            product_id : productID+1,
            product_full_name: form_data.product_full_name, 
            product_name_on_ticket : form_data.product_name_on_ticket ,
            barCode_available : form_data.barCode_available === "Oui 有" ? true : false,
            barCode_list : form_data.barCode_available === "Oui 有" ? 
              [{
                barCode : newBarcode,
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
            typeOfSale : form_data.type_of_sale === "Par unité 每件" ? "unit": ( form_data.type_of_sale !== "Carton 每箱" ? "weight" : "box" ),
            default_sold_weight_kg : form_data.default_sold_weight_kg,
            image : image_data.file.name === undefined ? "" : newImageName,
            display_on_ticket: form_data.display_product_name === "Oui 有" ? true : false
          }


          if (form_data.barCode_available === "Oui 有" ) {
            let product_with_barcode = getDataFromLS("product_with_barcode")
            product_with_barcode.push(dataToSend)
            setDataInLS("product_with_barcode", product_with_barcode)

            let barCodeAvailable_productID = getDataFromLS("barCodeAvailable_productID")
            const db = {
              barCode: newBarcode,
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
              console.log(res);
          })
            .then(response => response.json())
          // console.log("old product DB :",productDB)
          productDB.push(dataToSend)
          setDataInLS("productDB", productDB)
          setDataInLS("add_modify_product", dataToSend)
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
                  <Label sm={3} style={{fontSize: "60%" }}>Nom du nouveau produit<br/>新食品名称*</Label>
                  <Col sm={8}>
                  <Input type="text" name="product_full_name" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_full_name} placeholder="Nom du produit 食品名称" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_full_name.length===0 ? "Veuillez entrer le nom du produit. 请输入食品名称" : ""}</p>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Nom du produit sur le ticket de caisse <br/> 收据上的产品名称*</Label>
                  <Col sm={8}>
                  <Input type="text" name="product_name_on_ticket"  maxLength="26" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_name_on_ticket} placeholder="Nom du produit 食品名称" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_name_on_ticket.split("").filter(char => /\p{Script=Han}/u.test(char)).length >0 ? "Caractères chinois non acceptés. 不能写汉字" : ""}</p>
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
                    <option>Carton 每箱</option>
                  </Input>
                  </Col>
                </FormGroup>

                {/* {form_data.type_of_sale ===  "Au poids 体重" ? 
                  <div>
                    <FormGroup row>
                      <Label sm={3} style={{fontSize: "60%"}}>Poids vendu par défaut<br/>默认出售重量</Label>
                      <Col sm={8}>
                      <Input type="number" name="default_sold_weight_kg" min="0" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                        onChange={changeHandler} value={form_data.default_sold_weight_kg}  placeholder="Poids vendu par défaut 默认出售重量" />
                      </Col>
                    </FormGroup>
                    <p style={{fontSize: 15, color: "orange"}}>{error && form_data.default_sold_weight_kg.length===0 ? "Veuillez entrer le poids vendu par défaut. 请输入默认出售重量" : ""}</p>
                  </div>
                : "" } */}

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
                  <Label sm={3} style={{fontSize: "60%"}}>Code-barre disponible?<br/>有没有条形码? </Label>
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
                      <Label sm={3} style={{fontSize: "60%"}}>Code-barre 条形码*</Label>
                      <Col sm={8}>
                      <Input type="number" name="barCode" min="0" max="9999999999999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.barCode}  placeholder="Code-barre 条形码" />
                      </Col>
                    </FormGroup>
                    <p style={{fontSize: 15, color: "orange"}}>{error && form_data.barCode.length<13 ? "Veuillez entrer un code-barre correcte. 请输入条形码" : ""}</p>
                  </div>
                : "" }


                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%"}}>Facture disponible 有发票吗 ?</Label>
                  <Col sm={8}>
                  <Input type="select" name="display_product_name" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.display_product_name}  >
                  <option>Oui 有</option>
                    <option>Non 没有</option>
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
                {image_data.file instanceof File ? <p style={{fontSize: 15, color: "orange"}}>{error && image_data.file.name.split("").filter(char => /\p{Script=Han}/u.test(char)).length >0 ? "Caractères chinois non acceptés. 不能写汉字" : ""}</p>
                : ""}

                  
                
                <Button  color="success" style={{margin : "10px"}} onClick={() => submit()}>Ajouter 加食品</Button>
                <Link to="/products"><Button color="danger">Annuler 取消 </Button></Link>
              </Form>
      {/* <button color="success" type="button" onClick={() => clickedButton(true)}>Ajouter 加食品</button> */}

    
            </div>
        );
    // }
}

export default AddNewProduct;