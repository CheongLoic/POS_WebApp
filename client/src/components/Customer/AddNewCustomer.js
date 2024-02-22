import React, { useState} from 'react';
import {Link, Navigate } from "react-router-dom";
// import {Link } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import customerDB from "../../database/customers.json"
// import {loadJSON, saveJSON, addDataToJson} from "../../database/test"
// import axios from "axios";

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewCustomer = () => {


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

    const [changePage, setChangePage] = useState(false)
    if (changePage) {
        return( <Navigate  to="/customers"  replace={true} />)
    }


    const checkField = ()=>{
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        
        if (form_data.address === "" 
        //|| form_data.email === "" 
        // ||  form_data.first_name === "" || form_data.last_name === "" 
        ||  (phone.length > 0 && phone.length < 10) ||  (!( phone.substring(0, 2) === "01" || phone.substring(0, 2) === "02"
        || phone.substring(0, 2) === "03" || phone.substring(0, 2) === "04" 
        || phone.substring(0, 2) === "05" || phone.substring(0, 2) === "06" 
        || phone.substring(0, 2) === "07" || phone.substring(0, 2) === "09"  ) &&  (phone.length > 0 && phone.length <= 10 ))
        || zipCode.length < 5 || form_data.city === "" || form_data.company === "" ) {
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
    


    const submit = () => {
        checkField()
        // console.log(form_data)
        // console.log(phone)
        // console.log("error from submit",error)
        // console.log("error from submit",ERROR)

        if (ERROR === false) {
            // const last_customer = customerDB[ Object.keys(customerDB).sort().pop() ]
            const last_customer = customerDB[ customerDB.length -1 ]
            // console.log(last_customer.id)
            const newCustomer = JSON.stringify( {
                "id": last_customer.id +1,
                // "first_name":  form_data.first_name,
                // "last_name": form_data.last_name,
                // "gender" : form_data.gender,
                "company": form_data.company,
                "email": form_data.email,
                "phone": phone,
                "address": form_data.address,
                "zip_code": zipCode,
                "city": form_data.city
              })            
            // console.log(newCustomer)
            

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: newCustomer
              };
            fetch('http://localhost:5000/customers/addNewCustomer', requestOptions)
                // .then(response => response.json())
            setChangePage(true)
            
            
        }


    }



     return (
        
        <div className="form_customer"> 
                <Form>
                {/* <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Nom 名*</Label>
                    <Col sm={8}>
                    <Input type="text" name="last_name"  placeholder="Nom 名" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.last_name}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.last_name.length===0 ? "Veuillez rentrer votre nom. 请输入您的姓氏" : ""}</p>

                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Prénom 姓*</Label>
                    <Col sm={8}>
                    <Input type="text" name="first_name"  placeholder="Prénom 姓"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.first_name}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.first_name.length===0 ? "Veuillez rentrer votre prénom. 请输入您的名字" : ""}</p>

                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Civilité 性别*</Label>
                    <Col sm={8}>
                    <Input type="select" name="genre"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.gender}  >
                        <option>M.</option>
                        <option>Mme</option>
                    </Input>
                    </Col>
                </FormGroup> */}

                

                
                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Nom d'entreprise 公司名称*</Label>
                    <Col sm={8}>
                    <Input type="text" name="company"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Nom d'entreprise 公司名称" onChange={changeHandler} value={form_data.company}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.company.length===0 ? "Veuillez rentrer votre nom d'entreprise. 请输入您的公司名称" : ""}</p>


                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Adresse 住址/地址*</Label>
                    <Col sm={8}>
                    <Input type="text" name="address"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Adresse 住址/地址" onChange={changeHandler} value={form_data.address}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.address.length===0 ? "Veuillez rentrer votre adresse. 请输入您的地址" : ""}</p>

                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Code postal 邮政编码*</Label>
                    <Col sm={8}>
                    <Input type="number" name="zipCode" min="0" max="99999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Code postal 邮政编码" onChange={ (e) => {if (e.target.value.length > 5) {
                        setZipCode(e.target.value.slice(0, 5));
                    } else setZipCode(e.target.value) }} value={zipCode}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && zipCode.length===0 ? "Veuillez rentrer votre code postal. 请输入您的邮政编码" : 
                ( error && ( zipCode.length !== 5 ) ? "Mauvais code postal. 邮政编码错误" : "")}</p>

                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Commune 城市*</Label>
                    <Col sm={8}>     
                        <Input type="text" name="city"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  placeholder="Commune 城市" onChange={changeHandler} value={form_data.city}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{error && form_data.city.length===0 ? "Veuillez rentrer votre commune. 请输入您的城市" : ""}</p>


                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Téléphone 电话号码</Label>
                    <Col sm={8}>
                    <Input type="number" name="phone" min="1" max="9999999999"   onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} placeholder="Téléphone 电话号码" onChange={ (e) => {if (e.target.value.length > 10) {
                        setPhone(e.target.value.slice(0, 10));
                    } else setPhone(e.target.value) }} value={phone}  />
                    </Col>
                </FormGroup>
                <p style={{fontSize: 12, color: "orange"}}>{
                // error && phone.length===0 ? "Veuillez rentrer votre numéro de téléphone. 请输入您的地址"  : 
                // ( 
                    error && (!( phone.substring(0, 2) === "01" || phone.substring(0, 2) === "02"
                    || phone.substring(0, 2) === "03" || phone.substring(0, 2) === "04" 
                    || phone.substring(0, 2) === "05" || phone.substring(0, 2) === "06" 
                    || phone.substring(0, 2) === "07" || phone.substring(0, 2) === "09"  ) &&  (phone.length > 0 && phone.length <= 10 ))    ? "Mauvais numéro de téléphone. 电话号码错误" : ""
                // )
                }</p>

                <FormGroup row>
                    <Label sm={3} style={{fontSize: "60%"}}>Email 电子邮件</Label>
                    <Col sm={8}>
                    <Input type="email" name="email" placeholder="Email 电子邮件"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.email}  />
                    </Col>
                </FormGroup>
                {/* <p style={{fontSize: 12, color: "orange"}}>{error && (form_data.email.length===0 || !form_data.email.includes("@") || !form_data.email.includes(".") )? "Veuillez rentrer votre email. 请输入您的电子邮件" : ""}</p> */}


                <Button  color="success" style={{ alignItems: 'center', margin : "10px"}} onClick={() => submit()}>+ Ajouter un client 加客户</Button>
                <Link to="/customers"><Button  color="primary">Retour 后退</Button></Link>
            </Form>
            
        </div>
    );
    
}

export default AddNewCustomer;