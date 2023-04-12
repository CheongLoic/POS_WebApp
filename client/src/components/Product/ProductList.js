import React, {Component} from 'react';
// import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import no_img from "../../img/no_image.jpg"


class ProductList  extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            product_database : this.props.product_data
        });
    }

    // isOverflown = ({ clientHeight, scrollHeight }) => scrollHeight > clientHeight
    // resizeText = ({ element, parent }) => {
    //     let i = 12 // let's start with 12px
    //     let overflow = false
    //     const maxSize = 128 // very huge text size
      
    //     while (!overflow && i < maxSize) {
    //       element.style.fontSize = `${i}px`
    //       overflow = this.isOverflown(element,parent)
    //       if (!overflow) i++
    //     }
      
    //     // revert to last state where no overflow happened:
    //     element.style.fontSize = `${i - 1}px`
    //   }
    

    render() {
        // console.log("Hello world" + this.props.index);
        // console.log("../img/"+this.state.product_database.image);
        return (
            <div className='product_catalogue_icon'>
                {/* <p>{".."+ this.state.product_database.image}</p> */}
                <Link to="/" style={{ textDecoration: 'none' , color:"white"}}>
                    
                <div  className="img_product_container">
                    <img src={`${this.state.product_database.image}` === "" ? no_img : `${this.state.product_database.image}` } height="200px" width="200px" border-radius ="20%" align="left" alt={this.state.product_database.product_full_name} />
                </div>

                <div className="text-container" >
                    <span>{this.state.product_database.product_full_name}</span>
                </div >
                
                
                {/* <p>{this.state.product_database.product_name_on_ticket}</p> */}
                <span>{this.state.product_database.current_price} €</span>
                </Link>
            
            </div>
            );
    }
}

export default ProductList;