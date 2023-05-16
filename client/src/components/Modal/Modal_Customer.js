import React,  { useState} from "react";
import "./Modal_invoice.css";
import {Button,Form, FormGroup, Input, Col, Label} from 'reactstrap';
import customerDB from "../../database/customers.json"
import { sortCustomeByCompany } from "../../backend/localStorageManager";
import "./Modal_customer.css"

function Modal_customer({ setOpenModal, setCustomer , setModalPaymentOpen} ) {

  const [newCustomer, setNewCustomer] = useState(false)
  const [CUSTOMER, chooseCustomer] = useState("N°"+sortCustomeByCompany(customerDB)[0].id +" "+ sortCustomeByCompany(customerDB)[0].company +" "+ sortCustomeByCompany(customerDB)[0].address +" "+ sortCustomeByCompany(customerDB)[0].zip_code +" "+ sortCustomeByCompany(customerDB)[0].city)
  const [phone, setPhone] = useState("")  
  const [zipCode, setZipCode] = useState("")  

  const [form_data, setFormData] = useState({
      // first_name:"", 
      // last_name :"",
      // gender : "M.",
      company : "",
      email : "",
      // phone : "",
      address : "",
      // zipCode : "",
      city : "",
  });
  const changeHandler = (e) => {
      // console.log(e.target.value)  
      const { name, value } = e.target;
      setFormData((form_data) => ({ ...form_data, [name]: value }));

  };

  const [error, setError] = useState(false) // Error for the form
  let ERROR = false // error in backend 

  const handleChange = (e) => {
    console.log("Customer selected :", e.target.value)
    chooseCustomer(e.target.value)
  }

  const checkField = ()=>{
    //this function checks if there is what it is expected in the fields
    //Otherwise, it will display a msg error
    
    if (form_data.address === "" || form_data.email === "" 
    // ||  form_data.first_name === "" || form_data.last_name === "" 
    ||  phone.length < 10 || !(( phone.substring(0, 2) === "01" || phone.substring(0, 2) === "02"
    || phone.substring(0, 2) === "03" || phone.substring(0, 2) === "04" 
    || phone.substring(0, 2) === "05" || phone.substring(0, 2) === "06" 
    || phone.substring(0, 2) === "07" || phone.substring(0, 2) === "09"  ) && phone.length === 10 )
    ||  zipCode.length < 5 || form_data.city === "" || form_data.company === "" ) {
        // console.log("before set error true from checkfield",error)
        setError(true) ;
        ERROR = true
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



  const toggleModal=()=>{
    setOpenModal(false);
  }
//customerSelected
 

  
  const submit = () => {
    checkField()
    // console.log(form_data)
    // console.log(phone)
    // console.log("error from submit",error)
    // console.log("error from submit",ERROR)
    if (newCustomer) {
      if (ERROR === false) {
        // const last_customer = customerDB[ Object.keys(customerDB).sort().pop() ]
        const last_customer = customerDB[ customerDB.length -1 ]
        // console.log(last_customer.id)

        setCustomer({
          newCustomer : newCustomer,
          customer : {
            id: last_customer.id +1,
            // "first_name":  form_data.first_name,
            // "last_name": form_data.last_name,
            // "gender" : form_data.gender,
            company: form_data.company,
            email: form_data.email,
            phone: phone,
            address: form_data.address,
            zip_code: zipCode,
            city: form_data.city
          }}) 
        setOpenModal(false); //not display the customer modal
        setModalPaymentOpen(true)

        // console.log("nouveau client :", newCustomer)
      }
    } else {
      let findCustomer = customerDB.filter((customer) => customer.id === Number(CUSTOMER.split(" ")[0].substring(2)) )[0] //client sélectionné
      // console.log(CUSTOMER.split(" ")[0].substring(2) )
      // console.log("findCustomer", findCustomer)
      setCustomer({
        newCustomer : newCustomer,
        customer : findCustomer
      }) 
      setOpenModal(false); //not display the customer modal
      setModalPaymentOpen(true)
    }
    


}


  return (
    
    newCustomer ? 
      <div className="modalCustomer" >
        <div className="modalBackground" onClick={toggleModal}></div>
          <div className="modalContainerCustomer1">
              <div className="titleCloseBtn">
              <button onClick={() => {  setOpenModal(false); }}  >X</button>
              </div>

              <div className="title">
              Nouveau clients 新客户
              </div>

              <div className="body">
                <Form style={{marginLeft:20, marginTop: 20, marginBottom:20}}>
                <FormGroup row>
                    <Label sm={4} style={{fontSize: "50%"}}>Nom d'entreprise 公司名称*</Label>
                    <Col sm={7}>
                    <Input type="text" name="company"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Nom d'entreprise 公司名称" onChange={changeHandler} value={form_data.company}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.company.length===0 ? "Veuillez rentrer votre nom d'entreprise. 请输入您的公司名称" : ""}</p>


                <FormGroup row>
                    <Label sm={4} style={{fontSize: "50%"}}>Adresse 住址/地址*</Label>
                    <Col sm={7}>
                    <Input type="text" name="address"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Adresse 住址/地址" onChange={changeHandler} value={form_data.address}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.address.length===0 ? "Veuillez rentrer votre adresse. 请输入您的地址" : ""}</p>

                <FormGroup row>
                    <Label sm={4} style={{fontSize: "50%"}}>Code postal 邮政编码*</Label>
                    <Col sm={7}>
                    <Input type="number" name="zipCode" min="0" max="99999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Code postal 邮政编码" onChange={ (e) => {if (e.target.value.length > 5) {
                        setZipCode(e.target.value.slice(0, 5));
                    } else setZipCode(e.target.value) }} value={zipCode}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && zipCode.length===0 ? "Veuillez rentrer votre code postal. 请输入您的邮政编码" : 
                ( error && ( zipCode.length !== 5 ) ? "Mauvais code postal. 邮政编码错误" : "")}</p>

                <FormGroup row>
                    <Label sm={4} style={{fontSize: "50%"}}>Commune 城市*</Label>
                    <Col sm={7}>     
                        <Input type="text" name="city"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Commune 城市" onChange={changeHandler} value={form_data.city}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.city.length===0 ? "Veuillez rentrer votre commune. 请输入您的城市" : ""}</p>


                <FormGroup row>
                    <Label sm={4} style={{fontSize: "50%"}}>Téléphone 电话号码*</Label>
                    <Col sm={7}>
                    <Input type="number" name="phone" min="1" max="9999999999"   onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} placeholder="Téléphone 电话号码" onChange={ (e) => {if (e.target.value.length > 10) {
                        setPhone(e.target.value.slice(0, 10));
                    } else setPhone(e.target.value) }} value={phone}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && phone.length<10 ? "Veuillez rentrer votre numéro de téléphone. 请输入您的地址"  : 
                ( error && !(( phone.substring(0, 2) === "01" || phone.substring(0, 2) === "02"
                || phone.substring(0, 2) === "03" || phone.substring(0, 2) === "04" 
                || phone.substring(0, 2) === "05" || phone.substring(0, 2) === "06" 
                || phone.substring(0, 2) === "07" || phone.substring(0, 2) === "09" 
                 ) && phone.length === 10 )  ? "Mauvais numéro de téléphone. 电话号码错误" : "")}</p>

                <FormGroup row>
                    <Label sm={4} style={{fontSize: "50%"}}>Email 电子邮件*</Label>
                    <Col sm={7}>
                    <Input type="email" name="email" placeholder="Email 电子邮件"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.email}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && (form_data.email.length===0 || !form_data.email.includes("@") || !form_data.email.includes(".") )? "Veuillez rentrer votre email. 请输入您的电子邮件" : ""}</p>



                </Form>
              
                <Button  color="success" style={{ alignItems: 'center', marginTop : "10px"}} onClick={() => submit()}>+ Ajouter un client 加客户</Button>
                
              </div>

          </div>
      </div>
      
    : 
    <div className="modalCustomer" >
      <div className="modalBackground" onClick={toggleModal}></div>
        <div className="modalContainerCustomer2">
            <div className="titleCloseBtn">
            <button onClick={() => {  setOpenModal(false); }}  >X</button>
            </div>

            <div className="title">
            Clients 客户
            </div>

            <div className="body">

              <Form style={{marginTop: 50, marginBottom : 50}}>
                <FormGroup >
                    {/* <Label sm={4} style={{fontSize: "50%"}}>Choisissez un produit à mettre en promotion 请选择要打折的食品</Label>
                    <Col sm={9}> */}
                    <Input type="select" name="productToGiveDiscountSelected" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                    onChange={handleChange} value={CUSTOMER}  >
                        {sortCustomeByCompany(customerDB).map((customer, index) => {
                            return <option key={index}>N°{customer.id} {customer.company} {customer.address} {customer.zip_code} {customer.city}</option>
                        } )}
                    </Input>
                    {/* </Col> */}
                </FormGroup>
              </Form>


              <Button color="primary" style={{width:220, marginRight: 30}} onClick={() => setNewCustomer(true)} >+ Ajouter nouveau client<br/>加新客户</Button>
              <Button  color="primary" style={{width:220}} onClick={() => submit()} >Confirmer<br/>确认</Button>
            </div>

        </div>
    </div>
    
    
    
    
  );
}

export default Modal_customer;