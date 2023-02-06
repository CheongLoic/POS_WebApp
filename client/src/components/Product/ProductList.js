import React, {Component} from 'react';
// import {Button} from 'reactstrap';
// import {Link} from "react-router-dom";


class ProductList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productDB : this.props.product_data
        });
    }

    
    
    

    render() {
        console.log("Hello world" + this.props.index);
        console.log("../img/"+this.state.productDB.image);
        return (
            <div>
                <p>{".."+ this.state.productDB.image}</p>
                <div><img src={`${this.state.productDB.image}`}  align="left" alt={this.state.productDB.product_name} /></div>
            
            </div>
            );
    }
}

export default ProductList;