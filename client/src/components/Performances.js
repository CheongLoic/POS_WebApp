import React  from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";

function Performances()  {
    

    // render() {
        console.log("Hello from Performances");
        return (
            <div> 
                <h1>Performances 数据</h1>
                <Link to="/"><Button outline color="primary">Retour 返回</Button></Link>
                
            </div>
        );
    // }
}

export default Performances;