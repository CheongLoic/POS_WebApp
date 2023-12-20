import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import customers from "../../database/customers.json"
import CustomerList from "./CustomerList"
import "./Customer.css"


class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
        All_customers : customers
    };
  }

  render() {
      // console.log("Hello from Customers")
      return (
          <div className="container-in"> 

              <h1>Clients 客户</h1>
              <div>
                <Link to="/customers/addNewCustomer" style={{ textDecoration: 'none' }}>  <Button  color="danger" style={{marginBottom : 10, marginTop : 30}}  block>+ Ajouter un client 加客户</Button></Link>
                <Link to="/" style={{ textDecoration: 'none' }}><Button  color="primary"  style={{marginBottom : 10, marginTop : 20}} block >Retour 后退</Button></Link>
                
                </div>
              <div id="boxesContainer">
                <div id="boxesList">

              {
                  this.state.All_customers.map((customer, index) =>( <CustomerList key={index} index ={index} customer_data={customer}  />))
              }
              </div>
              </div>


              
          </div>
      );
  }
}

export default Customers;