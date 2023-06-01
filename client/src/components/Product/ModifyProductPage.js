import React, { useState} from 'react';
// import productDB from "../../database/products.json"
import {Link, Navigate } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col, Row} from 'reactstrap';
import axios from "axios";
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';
import no_img from "../../img/no_image.jpg"
import pencil from "../../img/pencil3.png"
import croix from "../../img/croix2.png"
import check_icon from '../../img/check-mark-symbol-ok-logo2.png'


const ModifyProductPage = () => {

let product_data_to_change = getDataFromLS('change_product_data')
const [imageDeleted , deleteImage] = useState(false)
const [clickOnPenButton , setClickOnPenButton] = useState(false)
const [showBarcodeField , setShowBarcodeField] = useState(false)
const [error, setError] = useState(false) // Error for the form
// const [chinese_caracter_recognized, setChineseRecognized] = useState(false) // Error for the form
let ERROR = false // error in backend 

const [barcodeList, setBarcodeList] = useState(product_data_to_change.barCode_list)
const [barcodeInput, setBarcode] = useState("")
const [form_data, setFormData] = useState({
    product_full_name: product_data_to_change.product_full_name, 
    product_price : product_data_to_change.current_price,
    product_name_on_ticket : product_data_to_change.product_name_on_ticket ,
    type_of_sale : product_data_to_change.typeOfSale === "unit" ? "Par unité 每件" : "Au poids 体重",
    barCode_available : product_data_to_change.barCode_available ? "Oui 有" : "Non 没有",
    date_of_purchase: "", //received data format YYYY-MM-DD
    expiration_date : "",//received data format YYYY-MM-DD
    buying_price : "",
    quantity : "",
    default_sold_weight_kg : "",
    display_product_name :product_data_to_change.display_on_ticket ? "Oui 要" : "Non 不"
});
const changeHandler = (e) => {
    // console.log(e.target.value)  
    
    const { name, value } = e.target;
    if (name === "barCode") {
      if (value.length > 13) {
        setBarcode(value.slice(0, 13))
        // setFormData((form_data) => ({ ...form_data, [name]: value.slice(0, 13) }));
      } else {
        setBarcode(value)
        // setFormData((form_data) => ({ ...form_data, [name]: value }));
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
  const chinese_caracter_product_name_on_ticket = form_data.product_name_on_ticket.split("").filter(char => /\p{Script=Han}/u.test(char)) //return an array of chineese caracterss
  let chinese_caracter_image = []
  if (image_data.file.length >0) chinese_caracter_image = image_data.file.name.split("").filter(char => /\p{Script=Han}/u.test(char)) //return an array of chineese caracterss


  if (form_data.product_full_name === "" || form_data.product_price === ""  || form_data.product_name_on_ticket === ""
  // ||   ( form_data.type_of_sale === "Au poids 体重"  && form_data.default_sold_weight_kg === "")
  // || form_data.date_of_purchase === "" || form_data.expiration_date === "" 
  ||   (showBarcodeField && barcodeInput.length < 10  && form_data.barCode_available === "Oui 有")  
  || chinese_caracter_product_name_on_ticket.length > 0
  || chinese_caracter_image.length > 0
  // || image_data.file.name.includes(" ")  || image_data.file.name.includes("_") 
  ) {
      setError(true) ;
      ERROR = true
      console.log("set error to true from checkfield : ",error)
  } else {
      setError(false)
      ERROR = false
  }
}


const [formOK, AddButtonClicked] = useState(false)
if (formOK) {
    return( <Navigate  to="/products/addNewProduct-send-data"  replace={true} />)
}


const submit = async () => {
    const formdata = new FormData();
    
    formdata.append('avatar', image_data.file);
    checkField()

    if (ERROR === false) {
      const current_date = new Date();
      let productDB = getDataFromLS("productDB")
      // let productDB_sorted = productDB.sort((a, b) => {//tricroissant par product_id
      // if (a.product_id < b.product_id) {
      //     return -1;
      //   }
      //   if (a.product_id > b.product_id) {
      //       return 1;
      //     }
      //     // a must be equal to b
      //     return 0;
      // })
      // let last_product = productDB_sorted[productDB_sorted.length - 1 ]
      // const productID = last_product.product_id

      
      let newPriceHisto = product_data_to_change.price_history
      if (product_data_to_change.price_history[product_data_to_change.price_history.length -1].product_price !== form_data.product_price) {
       newPriceHisto.push({
          date : current_date.toISOString().substring(0, 10),
          product_price: form_data.product_price
        })
      }

      const dataToSend = {
        product_id : product_data_to_change.product_id,
        product_full_name: form_data.product_full_name, 
        product_name_on_ticket : form_data.product_name_on_ticket ,
        barCode_available : form_data.barCode_available === "Oui 有" ? true : false,
        barCode_list : form_data.barCode_available === "Oui 有" ? 
        barcodeList
          :
          [{
            barCode : "",
            quantity: "",
            buying_price: "", 
            date_of_purchase: "",
            expiration_date : "",
          }],
        price_history : newPriceHisto,
        current_price : form_data.product_price,
        typeOfSale : form_data.type_of_sale === "Par unité 每件" ? "unit": "weight",
        default_sold_weight_kg : form_data.default_sold_weight_kg,
        image : (imageDeleted ||clickOnPenButton  ) ? (image_data.file.name === undefined ? "" : "./img/"+image_data.file.name) : product_data_to_change.image ,
        display_on_ticket: form_data.display_product_name === "Oui 要" ? true : false
      }


      // if (form_data.barCode_available === "Oui 有" ) {
      //   let product_with_barcode = getDataFromLS("product_with_barcode")
      //   product_with_barcode.push(dataToSend)
      //   setDataInLS("product_with_barcode", product_with_barcode)

      //   let barCodeAvailable_productID = getDataFromLS("barCodeAvailable_productID")
      //   const db = {
      //     barCode: newBarcode,
      //     productID : dataToSend.product_id
      //   }
      //   barCodeAvailable_productID.push(db)
      //   setDataInLS("barCodeAvailable_productID", barCodeAvailable_productID)

      // } else {
      //   let product_with_no_barcode = getDataFromLS("product_with_no_barcode")
      //   product_with_no_barcode.push(dataToSend)
      //   setDataInLS("product_with_no_barcode", product_with_no_barcode)
      // }


      axios.post("http://localhost:5000/products/addNewProduct", formdata,{
        header : { "Content-Type" : "multipart/form-data"}
      })
      .then( res => {
          console.log(res.data);
      })
        .then(response => response.json())
      // console.log("old product DB :",productDB)
      // productDB.push(dataToSend)
      // setDataInLS("productDB", productDB)
      setDataInLS("add_modify_product", dataToSend)
      // console.log("new product DB :", productDB)
      AddButtonClicked(true);
    }
}

const clickOnPen =( ) => {
  clickOnPenButton ? setClickOnPenButton(false) : setClickOnPenButton(true)
}

const clickOnPenCross =( ) => {
  deleteImage(true)
}

const deleteBarcode = (index) => {

  if(barcodeList.length === 1) {
    setBarcodeList([{
        barCode: "",
        quantity: "",
        buying_price: "",
        date_of_purchase:"", 
        expiration_date: ""
      }])
  } else {
    let barcodeListChanged = barcodeList
    barcodeListChanged = barcodeListChanged.filter((barcode)=> barcode.barCode !== barcodeList[index].barCode)
    setBarcodeList(barcodeListChanged)
  }
}

const addBarcode = () => {
  
  if ( ( barcodeInput.length <10  && form_data.barCode_available === "Oui 有")   ) {
      setError(true) ;
      ERROR = true
  } else {
      setError(false)
      ERROR = false
      if(barcodeList.length === 1 && showBarcodeField === false) {
        console.log("barcodeList before", barcodeList)
        let newBarcode = barcodeInput
      if (barcodeInput.length <13) newBarcode= "0".repeat(13-barcodeInput.length) + newBarcode
        setBarcodeList([{
            barCode: newBarcode,
            quantity: "",
            buying_price: "",
            date_of_purchase:"", 
            expiration_date: ""
          }])
          setBarcode("")
          console.log("barcodeList after", barcodeList)
      } else {
        let newBarcode = barcodeInput
      if (barcodeInput.length <13) newBarcode= "0".repeat(13-barcodeInput.length) + newBarcode
        let  barcodeListChanged = barcodeList.concat([{
          barCode: newBarcode,
            quantity: "",
            buying_price: "",
            date_of_purchase:"", 
            expiration_date: ""
        }])
        // console.log("barcodeList before", barcodeList)
        // console.log("barcodeListChanged ", barcodeListChanged)
        // setBarcodeList([{
        //   barCode: barcodeInput,
        //     quantity: "",
        //     buying_price: "",
        //     date_of_purchase:"", 
        //     expiration_date: ""
        // }])
        setBarcodeList(barcodeListChanged)
        // console.log("barcodeList after", barcodeList)
        // console.log("barcodeListChanged ", barcodeListChanged)
        setShowBarcodeField(false)
        setBarcode('')
      }
  }
}


    return (
            <div className="form_product"> 
              <br/>
              <div >
                {
                  imageDeleted ? 
                    <div>
                      <img src={pencil} height="30px" width="30px" border-radius ="20%" align="right" alt={"pencil"} onClick={clickOnPen} style={{ textAlign : "right",cursor: "pointer", padding : 2,position: "absolute", backgroundColor: "white", marginLeft: 170}} />
                      <img  src={no_img} height="200px" width="200px" border-radius ="20%" align="center" alt={"no_image"} /> 
                    </div> :
                    <div>
                      <img src={pencil} height="30px" width="30px" border-radius ="20%" align="right" alt={"pencil"} onClick={clickOnPen} style={{ textAlign : "right",cursor: "pointer", padding : 2,position: "absolute", backgroundColor: "white", marginLeft: 135}} />
                      <img src={croix} height="30px" width="30px" border-radius ="20%" align="right" alt={"pencil"}  onClick={clickOnPenCross} style={{ textAlign : "right", cursor: "pointer",padding : 5, position: "absolute", backgroundColor: "white", marginLeft: 170}} />
                      <a href={`${product_data_to_change.image}` === "" ? no_img :  "./." +`${product_data_to_change.image}`}  target="_blank" rel="noopener noreferrer">
                        <img  src={`${product_data_to_change.image}` === "" ? no_img :  "./." +`${product_data_to_change.image}` }
                        height="200px" width="200px" border-radius ="20%" align="center" alt={product_data_to_change.product_full_name} /> 
                      </a>
                    </div>
                }
              </div>

              <br/>
              <div>
              <Form action='/products/AddNewProduct' method="POST" >
                {imageDeleted || clickOnPenButton ? 
                  <div>
                    <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Photo 照片</Label>
                    <Col sm={6}>
                    <Input type="file" name="upload_file" accept='image/*' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={handleInputImageChange}/>
                    </Col>
                    <Button color='danger' style={{marginLeft: "5%", width : 40, height : 40,  borderRadius : "50%" , fontWeight : "bolder"}} onClick={() => {setClickOnPenButton(false); deleteImage(false) }} >X</Button>
                  </FormGroup>
                  {image_data.file.length > 0 ? <p style={{fontSize: 15, color: "orange"}}>{error && image_data.file.name.split("").filter(char => /\p{Script=Han}/u.test(char)).length >0 ? "Caractères chinois non acceptés. 不能写汉字" : ""}</p>
                : ""}
                  </div>
                  :""
                }
              
                <FormGroup row>
                  <Label sm={3} style={{fontSize: "60%" }}>Nom du produit<br/>食品名称*</Label>
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
                  </div>
                : "" } */}

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
                      {
                        barcodeList.length === 1 && barcodeList[0].barCode === "" ? 
                          <div>
                            <Row>
                            <Label sm={3} style={{fontSize: "60%"}}>Code-barre 条形码*</Label> 
                            <Col sm={7}>
                              <Input type="number" name="barCode" min="0" max="9999999999999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={barcodeInput}  placeholder="Code-barre 条形码" />                 
                            </Col>
                              <img src={check_icon} alt='check_icon' style={{width : 60, height : 40,marginLeft: "1%",  cursor : "pointer" }} onClick={() => addBarcode()}  /> 
                              {/* <Button color='danger' style={{marginLeft: "2.5%", width : 40, height : 40,  borderRadius : "50%" , fontWeight : "bolder"}} >X</Button> */}
                          </Row>
                          <p style={{fontSize: 15, color: "orange"}}>{error && barcodeInput.length===0 ? "Veuillez entrer un code-barre correcte. 请输入条形码" : ""}</p>

                          </div>
                        : 
                        <div>
                          {barcodeList.map((barcode, index) => {
                              return (
                                <div key={index} index={index} style={{marginBottom : 20} }>
                                  <Row>
                                    <Label sm={3} style={{fontSize: "60%"}}>Code-barre 条形码</Label> 
                                    <Label sm={6} style={{fontSize: "60%", backgroundColor : "grey", marginLeft: "1.5%", borderRadius : "5px", fontWeight : "bold" }}>{barcode.barCode}</Label> 
                                    <Button color='danger' style={{marginLeft: "5%", width : 40, height : 40,  borderRadius : "50%" , fontWeight : "bolder"}} onClick={() => deleteBarcode(index)} >X</Button>
                                  </Row>
                                </div>
                            )
                          })}
                          { showBarcodeField ? 
                              <div>
                                <Row>
                                  <Label sm={3} style={{fontSize: "60%", marginRight: "0.7%" }}>Code-barre 条形码*</Label> 
                                  <Col sm={7}>
                                    <Input type="number" name="barCode" min="0" max="9999999999999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={barcodeInput}  placeholder="Code-barre 条形码" />                 
                                  </Col>
                                    <img src={check_icon} alt='check_icon' style={{width : 60, height : 40,marginLeft: "2%",  cursor : "pointer" }} onClick={() => addBarcode()}  /> 
                                    {/* <Button color='danger' style={{marginLeft: "2.5%", width : 40, height : 40,  borderRadius : "50%" , fontWeight : "bolder"}} >X</Button> */}
                                </Row>
                                <p style={{fontSize: 15, color: "orange"}}>{error && barcodeInput.length<10 ? "Veuillez entrer un code-barre correcte. 请输入条形码" : ""}</p>

                              </div>
                           :
                             <Button  color="success" style={{margin : "10px"}} onClick={() => setShowBarcodeField(true)}>Ajouter un code-barre 加新条形码</Button>
                          }
                        </div>
                      }

                    </FormGroup>
                  </div>
                : "" }

                
                <Button  color="success" style={{margin : "10px"}} onClick={() => submit()}>Sauvegarder 保存</Button>
                <Link to="/products"><Button color="danger">Annuler 取消 </Button></Link>
              </Form></div>
        </div>
        
       
    )
}


export default ModifyProductPage;