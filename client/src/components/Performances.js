import React  from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import ticketDB from "../database/tickets.json"

function Performances()  {

    // const distinct = (value, index, self) => {
    //     return self.indexOf(value) === index
    // }

    // const rapportJour =() => {
    //     const prev_registered_date = '2023-02-21T20:30:02.413Z'
    //     // const prev_registered_date_local = new Date(prev_registered_date).toLocaleString()
    //     let ticketDB_filtered = ticketDB.filter((ticket) => ticket.date_of_purchase >  prev_registered_date)
    //     // let ticketLocalDate = new Date(ticketDB_filtered[0].date_of_purchase).toLocaleString()

    //     let listDate = ticketDB_filtered.map((ticket) => ticket.date_of_purchase.substring(0,10)).filter(distinct)
    //     console.log("listDate :", listDate)

    //     if ( prev_registered_date.substring(0,10) === ticketDB_filtered[0].date_of_purchase.substring(0,10)) { 
    //         // Refaire le rapport de la journée

    //         // var someDate = new Date();
    //         // var numberOfDaysToAdd = 6;
    //         // var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    //         // console.log(new Date(result))
    //         console.log("KONICHIWA !")

    //         listDate = listDate.filter((obj) => obj !== prev_registered_date.substring(0,10))
    //     } 

    //     for (let i in  listDate ) {
    //         console.log("i = ", listDate[i])
    //         let  tickets = ticketDB_filtered.filter((ticket) => ticket.date_of_purchase.substring(0,10)  === listDate[i] )
    //         console.log("XH")
    //         console.log("--------------------")
    //         console.log("Ticket Z")
    //         console.log("Rapport journalier")
    //         console.log("Rapport numéro : X")
    //         console.log("Pérode imprimée : ", listDate[i] )
    //         console.log("--------------------")
    //         console.log("Nombre de tickets : ", tickets.length)
    //         console.log("Total TTC : ", tickets.map((ticket) => Number(ticket.TTC) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
    //         console.log("Total HT : ", tickets.map((ticket) => Number(ticket.HT) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
    //         console.log("Total TVA 5.5% : ", tickets.map((ticket) => Number(ticket.TVA) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
    //         console.log("")
    //         console.log("Espèces : ", tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Espèces").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Espèces").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
    //         console.log("Cartes bancaires : ", tickets.filter((ticket) => ticket.PAYMENT_METHOD === "CB").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "CB").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
    //         console.log("Chèques : " , tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Chèque").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Chèque").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
    //         console.log("")
    //     }

    //     // console.log()
    // }
    

    // render() {
        console.log("Hello from Performances");
        return (
            <div> 
                <h1>Performances 数据</h1>
                <Link to="/"><Button outline color="primary">Retour 返回</Button></Link>

                <Button outline color="primary" onClick={rapportJour}> Imprimer rapport journalier</Button>
                
            </div>
        );
    // }
}

export default Performances;