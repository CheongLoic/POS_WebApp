import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import './Menu.css';


class Menu extends Component {

    importAll(r) {
        return r.keys().map(r);
      }
      

    render() {
        // const images = importAll(require.context('../img', false, /\.(png|jpg|jpe?g|svg)$/));

        return (
            
            <div id="menu">
                <h1>Menu 菜单</h1>
                {/* <img src={images["no_image.jpg"].default} width="200" height="200" />  */}
                <Link to="/products"><Button  type="button" color="primary"  className="menuBtn" block>Produits alimentaires 食品</Button></Link>
                <Link to="/tickets"><Button type="button" color="primary"  className="menuBtn" block>Tickets de caisse 发票</Button></Link>
                <Link to="/invoices"><Button type="button" color="primary"  className="menuBtn" block>Factures 单据</Button></Link>
                <Link to="/customers"><Button type="button" color="primary"  className="menuBtn" block>Clients 客户</Button></Link>
                <Link to="/performances"><Button type="button" color="primary"  className="menuBtn" block>Performances 数据</Button></Link>
                
            </div>
        );
    }
}

export default Menu;