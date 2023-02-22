import React, {Component} from 'react';
// import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import no_img from "../../img/no_image.jpg"


class ProductList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productDB : this.props.product_data
        });
    }

    render() {
        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.productDB.image);
        return (
            <div className='product_catalogue_icon'>
                {/* <p>{".."+ this.state.productDB.image}</p> */}
                <Link to="/" style={{ textDecoration: 'none' , color:"white"}}>
                <div><img src={`${this.state.productDB.image}` === "" ? no_img : `${this.state.productDB.image}` } height="200px" width="200px" border-radius ="20%" align="left" alt={this.state.productDB.full_product_name} /></div>
                <span>{this.state.productDB.full_product_name}</span>
                <br/>
                {/* <p>{this.state.productDB.product_name_on_ticket}</p> */}
                <span>{this.state.productDB.current_price} €</span>
                </Link>
            
            </div>
            );
    }
}

export default ProductList;