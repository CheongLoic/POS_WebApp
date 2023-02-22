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
  
  // console.log("display form " + req.form)
  try { 
    console.log("display body " + JSON.stringify( req.body))
    let upload = multer({ storage : storage}).single('avatar');
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

app.post('/products/addNewCustomer-send-data', async (req,res) => {
  const newData = req.body
  const filename = "client/src/database/products.json"
  // console.log("display form " + req.form)
    console.log("display body from addNewCustomer-send-data " +  newData)

    fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
    res.status(200).send({status : "OK"})
   

})



// #####################################################################
// https://stackoverflow.com/questions/60332662/unhandled-rejection-typeerror-net-connect-is-not-a-function


// var router = express.Router();
app.post('/tickets',  (req, res) => {

    const value = req.body;
    // console.log("Before printing!");
    
    // console.log("After calling library");
    console.log("Connecting to printer ...");
    let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.29'
    });
    console.log("Printer connected !");
    
    printer.alignCenter();
    printer.println("Hello world ! 2nd TEST ! " + value.title);
    printer.cut();
    
    try {
    let execute = printer.execute()
      console.log("Print done!");
    } catch (error) {
      console.log("Print failed:", error);
      console.warn(" Impossible de se connecter à l'imprimante !")
      
    }
    
    res.status(200).send("Try to print !");
});


// TO ADD IN CLIENT 
// export const printThermal = async (text) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title: 'React POST Request Example' })
//   };
//   fetch('http://localhost:5000/printThermal', requestOptions)
//     .then(response => response.json())
// }



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