import React, {Component} from 'react';
// import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import no_img from "../../img/no_image.jpg"
import { setDataInLS } from '../../backend/localStorageManager';
import { LazyLoadImage } from "react-lazy-load-image-component";


class ProductList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            product_database : this.props.product_data
        });
    }

    setChangeProductParam =() => {
        setDataInLS('change_product_data', this.state.product_database)
        // console.log("product_data", product_data)
    }

    render() {
        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.product_database.image);
        return (
            <div className='product_catalogue_icon'>
                {/* <p>{".."+ this.state.product_database.image}</p> */}
                <Link to="/products/modifyProductPage" style={{ textDecoration: 'none' , color:"white"}} onClick={this.setChangeProductParam}>
                    
                <div  className="img_product_container">
                    <LazyLoadImage effect='blur' src={`${this.state.product_database.image}` === "" ? no_img : `${this.state.product_database.image}` } height="200px" width="200px" border-radius ="20%" align="center" alt={this.state.product_database.product_full_name} />
                </div>

                <div className="text-container" >
                    <span>{this.state.product_database.product_full_name}</span>
                </div >
                
                
                {/* <p>{this.state.product_database.product_name_on_ticket}</p> */}
                <span>{ Number(this.state.product_database.current_price).toFixed(2)} €</span>
                </Link>
            
            </div>
            );
    }
}

export default ProductList;