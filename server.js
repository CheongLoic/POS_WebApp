const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
// import {loadJSON, saveJSON, addDataToJson} from "./saveDataInJSON"

const port = process.env.PORT || 5000 ;
const app = express();
app.use(express.json());
app.use(cors());

const bodyParser = require('body-parser');
// // Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s


// app.get("/", (_, res) => {
    
//   console.log("Hello from server express consolo.log from '/' !");
// });

// app.get("/api", (_, res) => {
    
//     console.log("Hello from server express consolo.log  from 'api'  !");
//     res.send("Hello from server express res.send from 'api'!");
// });

const storage = multer.diskStorage({
  destination : path.join(__dirname, '/client/public', 'img'), //detination of the image file in the folder /client/public
  filename : function ( req, file, cb) {
    cb(null, file.originalname)
  }
})

app.post('/products/addNewProduct', async (req,res) => {
  // Add product photo in the folder
  // console.log("display form " + req.form)
  try { 
    // console.log("display body " + JSON.stringify( req.body)) //nothing
    let upload = multer({ storage : storage}).single('avatar');
    // console.log("upload : " + upload) 
    upload(req, res, function(err) {
      //req.file contains info of uploaded file 
      //req.body contains info of text fields
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

    });
  } catch (err) { console.log(err)}
})

app.post('/products/addNewProduct-send-data', async (req,res) => {
  const newData = req.body
  const filename = "client/src/database/products.json"

  // console.log("display form " + req.form)
      // console.log("display body from addNewProduct-send-data " +  newData) //Return :  display body from addNewProduct-send-data [object Object],[object Object],[object Object],[object Object],[object Object]
      
  fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
  res.status(200).send({status : "OK"})
   

})



// #####################################################################
// https://stackoverflow.com/questions/60332662/unhandled-rejection-typeerror-net-connect-is-not-a-function


// var router = express.Router();
app.post('/tickets',  (req, res) => {

   if (req.body.action === "print") {
    console.log("Connecting to printer ...");
    let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.29'
    });
    // console.log("Printer connected !");
    
    printer.alignCenter();
    printer.setTextQuadArea();
    printer.println("X.H" );
    printer.setTextNormal();
    printer.println("19 RUE CIVIALE" );
    printer.println("75010 PARIS" );
    printer.println("TEL : 07.86.31.63.88" );
    printer.println("SIRET : 887752137 PARIS" );
    printer.newLine(); 
    printer.leftRight('Date : ' + new Date(req.data.date_of_purchase).toLocaleString() , 'N° ticket : '+ req.data.ticket_id);
    printer.drawLine();

    printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
      { text:"DESIGNATION", align:"LEFT", width:0.58, bold : true },
      { text:"QTExP.U", align:"CENTER", width:0.20, bold:true },
      { text:"MONTANT", align:"RIGHT", width:0.20, bold : true}
    ]);

    let total_article = 0;
    for (product in req.data.product_list) {
      printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text: product.product_name_on_ticket, align:"LEFT", width:0.58 },
        { text: product.quantity +"x"+ req.data.product_price, align:"CENTER", width:0.20},
        { text: product.product_total_price_before_discount, align:"RIGHT" , width:0.20 }
      ]);
      if (product.total_discount !== "") {
        printer.leftRight('   REMISE'  , '-'+ product.total_discount+"  " );
      }
      // if (product.type_of_sale === "unit") total_article += product.quantity;
      // else  total_article += 1;
      total_article += 1;
    }

    printer.drawLine();
    printer.leftRight( "TOTAL ARTICLE",  total_article);
    if (req.body.data.TOTAL_DISCOUNT !== "") printer.leftRight( "TOTAL REMISE",  req.body.data.TOTAL_DISCOUNT +"$");
    printer.leftRight( "TOTAL A PAYER TTC",  req.body.data.TTC +"$");
    printer.leftRight( "MODE DE PAIEMENT",  req.body.data.PAYMENT_METHOD);
    if ( req.body.data.PAYMENT_METHOD === "ESPECES") {
      printer.leftRight( "RECU",  req.body.data.RECU +"$");
      printer.leftRight( "RENDUES",  req.body.data.RENDU +"$");
    }
    
    printer.newLine(); 
    printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
      { text:"Taux TVA", align:"LEFT", width:0.33, bold:true },
      { text:"TVA", align:"CENTER", width:0.33, bold:true },
      { text:"HT", align:"RIGHT", width:0.33, bold:true },
    ]);
    printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
      { text:"5.5%", align:"LEFT", width:0.33 },
      { text: req.data.TVA +"$", align:"CENTER", width:0.33},
      { text: req.data.HT+"$", align:"RIGHT", width:0.33},
    ]);

    printer.drawLine();
    printer.alignCenter();
    printer.println("MERCI DE VOTRE VISITE" );
    printer.println("A BIENTOT !" );

    printer.cut();

    // printer.upsideDown(true);
    // printer.println('Hello World upside down!');
    // printer.upsideDown(false);
    // printer.drawLine();

    // printer.invert(true);
    // printer.println('Hello World inverted!');
    // printer.invert(false);
    // printer.drawLine();

    // printer.setTypeFontB();
    // printer.println('Type font B');
    // printer.setTypeFontA();
    // printer.println('Type font A');
    // printer.drawLine();

    // printer.alignLeft();
    // printer.println('This text is on the left');
    // printer.alignCenter();
    // printer.println('This text is in the middle');
    // printer.alignRight();
    // printer.println('This text is on the right');
    // printer.alignLeft();
    // printer.drawLine();

    // printer.setTextDoubleHeight();
    // printer.println('This is double height');
    // printer.setTextDoubleWidth();
    // printer.println('This is double width');
    // printer.setTextQuadArea();
    // printer.println('This is quad');
    // printer.setTextSize(7, 7);
    // printer.println('Wow');
    // printer.setTextSize(0, 0);
    // printer.setTextNormal();
    // printer.println('This is normal');
    // printer.drawLine();
    
    // printer.table(['One', 'Two', 'Three', 'Four']);
    // printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
    //   { text:"Left TEXT", align:"LEFT", width:0.5 },
    //   { text:"Center TEXT", align:"CENTER", width:0.25, bold:true },
    //   { text:"Right TEXT", align:"RIGHT", cols:8 }
    // ]);    
    
    try {
    let execute = printer.execute()
      console.log("Print done!");
    } catch (error) {
      console.log("Print failed:", error);
      console.warn(" Impossible de se connecter à l'imprimante !")
    }
    res.status(200).send("Try to print !");

   } else  {
    //DELETE TICKET DATA
    const data = req.body.full_data
    // console.log("full data",data) 
    let newData = data.filter((ticket) => ticket.ticket_id !== req.body.data.ticket_id)
    newData = newData.sort((a, b) => { //tri ascendent
      if (a.ticket_id < b.ticket_id) {
        return -1;
      }
      if (a.ticket_id > b.ticket_id) {
          return 1;
        }
        // a must be equal to b
        return 0;
    })
    // console.log("newData ",newData) 
    const filename = "client/src/database/tickets.json"
    fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
    res.status(200).send({status : "OK"})
   }
    
});



app.post('/invoices', async (req, res) => {
  const newData = req.body
  // console.log(newData)
  const filename = "client/src/database/invoices.json"
  fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
  res.status(200).send({status : "OK"})
});

//Add New Customer data in json file
app.post('/customers/addNewCustomer', async (req, res) => {
    const newCustomer = req.body;
    // console.log(newCustomer)

    // res.send("Add customer test !")
    // const data = loadJSON("client/src/database/customers.json");
    // const dataToSave = addDataToJson(data, newCustomer)
    // saveJSON('client/src/database/customers.json', dataToSave)

    const filename = "client/src/database/customers.json"
    const loadJSON = JSON.parse(fs.existsSync(filename)) ? fs.readFileSync(filename).toString()  : '""' 
    // console.log(loadJSON)
    const data = JSON.parse(loadJSON); //string to JSON object 
    // console.log(data)
    // console.log(JSON.parse(newCustomer) )
    // console.log(typeof data);
    // console.log(typeof newCustomer);
    // console.log( newCustomer);
    // console.log( data[0].address); //OK
    // console.log( newCustomer.address);
    // const newData = data.push(newCustomer); // add and return data in json object ==> doesn't work
   
    // console.log(newData)
    let conca = data.concat([newCustomer]); //put json in an array
    // console.log(conca)
    // console.log([newCustomer])
    // console.log([newCustomer][0])
    
    //remove duplicate item
    let newData = conca.filter((c, index) => {
      return conca.indexOf(c) === index;
    });

    fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
    res.status(200).send({status : "OK"})
});



app.listen(port, (err) => {
    if (err) {
      throw err
    }
    console.log(`Server is running on http://localhost:${port}`)
  })
// };