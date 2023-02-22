import React, { useState} from 'react';
import {Link, Navigate } from "react-router-dom";
// import {Link, useNavigate } from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import axios from "axios";
import { getDataFromLS, setDataInLS } from '../../backend/localStorageManager';

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s
const AddNewProduct = () => {

        return (
            
            <div className="form_product"> 
              <Form action='/products/AddNewProduct' method="POST" >
                <FormGroup row>
                  <Label sm={5} style={{fontSize: "70%", width : "25%" }}>Nom du nouveau produit <br/> 新食品名称*</Label>
                  <Col sm={8}>
                  <Input type="text" name="full_product_name" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.full_product_name} placeholder="Nom du produit 食品名称" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.full_product_name.length===0 ? "Veuillez entrer le nom du produit. 请输入食品名称" : ""}</p>

                <FormGroup row>
                  <Label sm={5} style={{fontSize: "70%", width : "25%" }}>Nom du produit sur le ticket de caisse <br/> 收据上的产品名称*</Label>
                  <Col sm={8}>
                  <Input type="text" name="product_name_on_ticket"  maxLength="26" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_name_on_ticket} placeholder="Nom du produit 食品名称" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_name_on_ticket.length===0 ? "Veuillez entrer le nom du produit. 请输入收据上的产品名称" : ""}</p>

                  <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Prix 价格*</Label>
                  <Col sm={8}>
                  <Input type="number" name="product_price" min="0" max="100" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.product_price} placeholder="Prix 价格" />
                  </Col>
                </FormGroup>
                <p style={{fontSize: 15, color: "orange"}}>{error && form_data.product_price.length===0 ? "Veuillez entrer le prix. 请输入价格" : ""}</p>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Type de vente*</Label>
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
                      <Label sm={3} style={{fontSize: "70%"}}>Poids vendu par défaut<br/>默认出售重量*</Label>
                      <Col sm={8}>
                      <Input type="number" name="default_sold_weight_kg" min="0" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                        onChange={changeHandler} value={form_data.default_sold_weight_kg}  placeholder="Poids vendu par défaut 默认出售重量" />
                      </Col>
                    </FormGroup>
                    <p style={{fontSize: 15, color: "orange"}}>{error && form_data.default_sold_weight_kg.length===0 ? "Veuillez entrer le poids vendu par défaut. 请输入默认出售重量" : ""}</p>
                  </div>
                : "" }

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Quantité 数量</Label>
                  <Col sm={8}>
                  <Input type="number" name="quantity" min="0"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.quantity} placeholder="Quantité 数量" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Date d'achat 购买日期</Label> 
                  <Col sm={8}>
                  <Input type="date" name="date_of_purchase" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.date_of_purchase}  />
                  </Col>
                </FormGroup>
                {/* <p style={{fontSize: 15, color: "orange"}}>{error && form_data.date_of_purchase.length===0 ? "Veuillez entrer la date d'achat. 请输入购买日期" : ""}</p> */}

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Prix d'achat 购买价格</Label> 
                  <Col sm={8}>
                  <Input type="number" name="buying_price" min="0" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.buying_price}  placeholder="Prix d'achat 购买价格" />
                  </Col>
                </FormGroup>
                {/* <p style={{fontSize: 15, color: "orange"}}>{error && form_data.buying_price.length===0 ? "Veuillez entrer la date d'achat. 请输入购买日期" : ""}</p> */}


                <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Date d'expiration 到期</Label>
                  <Col sm={8}>
                  <Input type="date" name="expiration_date" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.expiration_date} />
                  </Col>
                </FormGroup>
                {/* <p style={{fontSize: 15, color: "orange"}}>{error && form_data.expiration_date.length===0 ? "Veuillez entrer la date d'expiration. 请输入到期日期" : ""}</p> */}

                <FormGroup row>
                  <Label sm={3} style={{fontSize: "70%"}}>Code-barre disponible?<br/>有没有条码? </Label>
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
                      <Label sm={3} style={{fontSize: "70%"}}>Code-barre 条码*</Label>
                      <Col sm={8}>
                      <Input type="number" name="barCode" min="0" max="9999999999999" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={changeHandler} value={form_data.barCode}  placeholder="Code-barre 条码" />
                      </Col>
                    </FormGroup>
                    <p style={{fontSize: 15, color: "orange"}}>{error && form_data.barCode.length===0 ? "Veuillez entrer votre nom. 请输入您的姓氏" : ""}</p>
                  </div>
                : "" }

                
                <FormGroup row>
                {/* <FormGroup action='/products/AddNewProduct' method="POST" row> */}
                  <Label sm={3} style={{fontSize: "70%"}}>Photo 照片</Label>
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

export default AddNewTicket;