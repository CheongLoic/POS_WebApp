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

const dateFormat = (date_of_purchase) => {
  const dateHour = new Date(date_of_purchase).toLocaleString().split(' ')[1]
  const date = date_of_purchase.substring(0,10).split("-")
  return date[2] + "/"+ date[1] + "/"+ date[0] + " "+ dateHour
}


// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s


// app.get("/", (_, res) => {
    
//   console.log("Hello from server express consolo.log from '/' !");
// res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  // res.json({"blabala" : "this is a test"})
// });

// app.get("/api", (_, res) => {
    
//     console.log("Hello from server express consolo.log  from 'api'  !");
//     res.send("Hello from server express res.send from 'api'!");
// });
// app.use("/",express.static(path.resolve(__dirname, '../client/build')));



const storage = multer.diskStorage({
  
  destination : path.join(__dirname, '/client/public', 'img'), //detination of the image file in the folder /client/public
  filename : function ( req, file, cb) {
    // console.log('Destination', destination)//return error
    // console.log('FILE IMAGE', file)
    /*
    FILE IMAGE {
   fieldname: 'avatar',
   originalname: 'mcoc_ga.jpg',
   encoding: '7bit',
   mimetype: 'image/jpeg'
 }*/

    let FindImage = JSON.parse(fs.existsSync(path.join(__dirname, '/client/public/img', file.originalname)))
    let i = 0 
    let newImageName = file.originalname
    console.log('file.originalname', file.originalname)
    while (FindImage) {
      i += 1
      // console.log(newImageName.split('.').slice(1).join("."))
      newImageName = file.originalname.split('.')[0] + '('+ i + ')' + file.originalname.split('.').slice(1, file.originalname.split('.').length -2).join(".") + "."+file.originalname.split('.')[file.originalname.split('.').length-1]
      FindImage = JSON.parse(fs.existsSync(path.join(__dirname, '/client/public/img', newImageName)))
      // console.log('newImageName in while', newImageName)
    }
    if (i >=1) {
      // i -=1
      newImageName = file.originalname.split('.')[0] + '('+ i + ')' + file.originalname.split('.').slice(1, file.originalname.split('.').length -2).join(".") + "."+file.originalname.split('.')[file.originalname.split('.').length-1]
      console.log('newImageName to save', newImageName)
    }
    cb(null, newImageName)
    // console.log('cb', cb) // return [Function (anonymous)]
  }
})

// download the image of a new product
app.post('/products/addNewProduct', async (req,res) => {
  // Add product photo in the folder
  // console.log("display form " + req.form)
  try { 
    // console.log("display body " + JSON.stringify( req.body)) //nothing 
    console.log("########################################################################################################################")
    console.log("Date :", new Date().toLocaleString())

    let upload = multer({ storage : storage}).single('avatar');
    //console.log("upload : ",  upload) //return function descripion  [Function: multerMiddleware]
    //console.log("storage : ", storage)
     /**storage :  DiskStorage {
      [0]   getFilename: [Function: filename],
      [0]   getDestination: [Function (anonymous)]
      [0] } */
    upload(req, res, function(err) {
      //req.file contains info of uploaded file 
      //req.body contains info of text fields
      if (!req.file) {
        return res.send("No image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
    });
  } catch (err) { console.log(err)}
})




app.post('/products/addNewProduct-send-data', async (req,res) => {
  try {
    const newData = req.body
    let originalName = newData.image.substring(6)
    console.log('originalName from app.post(/products/addNewProduct-send-data ', originalName)

    const productFilename = "client/src/database/products.json"
    const loadJSON_products = JSON.parse(fs.existsSync(productFilename)) ? fs.readFileSync(productFilename).toString()  : '""' 
    const products_data = JSON.parse(loadJSON_products); //string to JSON object 
    let newproductData =[]
    if (products_data.filter((product) => product.product_id === req.body.product_id).length === 0  ) {
      let conca = products_data.concat([req.body]); //put json in an array
    
      //remove duplicate item
      newproductData = conca.filter((c, index) => {
        return conca.indexOf(c) === index;
      });   
    }  else {
     const index =  products_data.findIndex((product) => product.product_id === req.body.product_id )
     if (products_data[index].image !== req.body.image && products_data[index].image !=="") {
      fs.unlink(path.join(__dirname, '/client/public', products_data[index].image.substring(1) ),  (err) => {
         if (err) console.log(err);
        else {
          console.log("\nDeleted file: ", path.join(__dirname, '/client/public', products_data[index].image.substring(1) ))}
          })
     }
     newproductData = newproductData.concat(products_data)
     newproductData[index] = req.body
    }
    fs.writeFileSync(productFilename, JSON.stringify(newproductData, null, 2))
    res.status(200).send({status : "OK"})
  } catch(err) {
    // res.send(err)
    console.log("ERROR from '/products/addNewProduct-send-data'",err)
  }
})

app.post('/discounts', async (req,res) => {
  const newData = req.body
  const filename = "client/src/database/discounts.json"
  fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
  res.status(200).send({status : "OK"})
})



// #####################################################################
// https://stackoverflow.com/questions/60332662/unhandled-rejection-typeerror-net-connect-is-not-a-function


// var router = express.Router();
app.post('/tickets',  (req, res) => {
  // console.log("test time : ", new Date(req.body.data.date_of_purchase).toLocaleString(), ", typeof : ", typeof(new Date(req.body.data.date_of_purchase).toLocaleString()))
  // console.log(req.body.data)
  console.log("########################################################################################################################")

  if (req.body.action === "print") {
    console.log("Connecting to printer ...");
    let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.29'
    });

    let isConnected =  printer.isPrinterConnected();
    // console.log('Printer connection status', isConnected) // return Promise { <pending> }
    
    isConnected
    .then(connected => { 
      console.log("connection status :", connected )
      if (connected) {
        console.log("Printer connected !");
        printer.alignCenter();
        printer.setTextQuadArea();
        printer.println("X.H" );
        printer.setTextNormal();
        printer.println("19 RUE CIVIALE" );
        printer.println("75010 PARIS" );
        printer.println("TEL : 07.86.31.63.88" );
        printer.println("SIRET : 887752137 PARIS" );
        printer.newLine(); 
        // console.log("test time : ", new Date(req.body.data.date_of_purchase).toLocaleString(), ", typeof : ", typeof(new Date(req.body.data.date_of_purchase).toLocaleString()))
        printer.leftRight('Date : ' + dateFormat(req.body.data.date_of_purchase) , 'N. ticket : '+ req.body.data.ticket_id.toString()+" ");
        printer.leftRight('Caisse N.2', 'Vendeur : V1 ');
        printer.drawLine();

        printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
          { text:"DESIGNATION", align:"LEFT", width:0.58, bold : true },
          { text:"QTExP.U", align:"CENTER", width:0.20, bold:true },
          { text:"MONTANT", align:"RIGHT", width:0.20, bold : true}
        ]);

        let total_article = 0;
        for (let i in req.body.data.product_list) {
          if (req.body.data.product_list[i].type_of_sale === "unit" || req.body.data.product_list[i].type_of_sale === "box" ) {
            printer.tableCustom([      // Prints table with custom settings (text, align, width, cols, bold)
            { text: req.body.data.product_list[i].product_name_on_ticket, align:"LEFT", width:0.58 },
            { text: req.body.data.product_list[i].quantity +"x"+ Number(req.body.data.product_list[i].product_price).toFixed(2) +"$", align:"CENTER", width:0.20},
            { text: Number(req.body.data.product_list[i].product_total_price_before_discount).toFixed(2) +"$" , align:"RIGHT" , width:0.20 }
            ]);
          } else {
            printer.tableCustom([      // Prints table with custom settings (text, align, width, cols, bold)
            { text: req.body.data.product_list[i].product_name_on_ticket, align:"LEFT", width:0.58 },
            { text: Number(req.body.data.product_list[i].quantity).toFixed(3) +"kgx "+ Number(req.body.data.product_list[i].product_price).toFixed(2) +"$", align:"CENTER", width:0.20},
            { text: Number(req.body.data.product_list[i].product_total_price_before_discount).toFixed(2) +"$" , align:"RIGHT" , width:0.20 }
            ]);
          }
          
          if (req.body.data.product_list[i].total_discount !== "") {
            printer.leftRight('   REMISE'  , '-'+ Number(req.body.data.product_list[i].total_discount).toFixed(2)+"$" );
          }
          // if (req.body.data.product_list[i].type_of_sale === "unit") total_article += req.body.data.product_list[i].quantity;
          // else  total_article += 1;
          total_article += 1;
        }
        //     printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        //   { text:"01234567890123456790123456", align:"LEFT", width:0.58, bold : true },
        //   { text:"0.000kgx 00.00$", align:"CENTER", width:0.22, bold:true },
        //   { text:"00.00$", align:"RIGHT",  width:0.20, bold : true}
        // ]);

        printer.drawLine();
        // printer.leftRight( "TOTAL ARTICLE",  total_article);
        if (req.body.data.TOTAL_DISCOUNT !== "") printer.leftRight( "TOTAL REMISE",  Number(req.body.data.TOTAL_DISCOUNT).toFixed(2) +"$ ");
        printer.setTextQuadArea();
        // // printer.bold(true); 
        // // printer.setTextSize(1, 1);
        // printer.alignLeft();
        printer.println("TOTAL TTC \t\t"+Number(req.body.data.TTC).toFixed(2) +"$");
        //  printer.alignRight();
        // printer.print( Number(req.body.data.TTC).toFixed(2) +"$");
      
        // printer.setTextNormal();
        // printer.setTextDoubleHeight();
        // printer.leftRight( "TOTAL TTC",  Number(req.body.data.TTC).toFixed(2) +"$");
        printer.setTextNormal();
        printer.leftRight( "MODE DE PAIEMENT",  req.body.data.PAYMENT_METHOD);
        // if ( req.body.data.PAYMENT_METHOD === "ESPECES") {
        //   printer.leftRight( "RECU",  Number(req.body.data.RECU).toFixed(2) +"$ ");
        //   printer.leftRight( "RENDUE",  Number(req.body.data.RENDU).toFixed(2) +"$ ");
        // }
    
        printer.newLine(); 
        printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
          { text:"Taux TVA", align:"LEFT", width:0.33, bold:true },
          { text:"TVA", align:"CENTER", width:0.33, bold:true },
          { text:"HT ", align:"RIGHT", width:0.33, bold:true },
        ]);
        printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
          { text:"5.5%", align:"LEFT", width:0.33 },
          { text: req.body.data.TVA +"$", align:"CENTER", width:0.33},
          { text: req.body.data.HT+"$ ", align:"RIGHT", width:0.33},
        ]);

        // printer.bold(true); 
        // // printer.setTextSize(7, 7);
        // printer.table(["Taux TVA", "TVA","HT", "TTC"]);
        // printer.setTextNormal();
        // printer.table(["5.5%",req.body.data.TVA +"$" ,req.body.data.HT+"$",Number(req.body.data.TTC).toFixed(2) +"$" ]);

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
          // console.warn("Impossible de se connecter à l'imprimante !")
          // res.send("Impossible de se connecter à l'imprimante ! 无法连接到打印机 !")
        }
        res.json({"printerConnected" : true})

      } else {
        console.log("printer not connected ! ", new Date().toLocaleString())
        // res.render('error.ejs', {})
        // res.redirect('http://localhost:3000')
        // res.send("Impossible de se connecter à l'imprimante ! 无法连接到打印机 !")
        // res.status(404).send({"status" : "not OK"})

        res.json({"printerConnected" : false})
        // res.sendFile(path.join(__dirname, "/client/public", "test.html"));
        // res.status(404).render('trfygvbhj',{})
        // console.log("blabla")
      }
    })    

    

   } else  {
    //DELETE TICKET DATA
    console.log("Deleting ticket data")
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

    //##################################################################################################################################

    //delete invoice in json file
    const invoiceFilename = "client/src/database/invoices.json"
    const loadJSON_invoices = JSON.parse(fs.existsSync(invoiceFilename)) ? fs.readFileSync(invoiceFilename).toString()  : '""' 
    let invoices_data = JSON.parse(loadJSON_invoices); //string to JSON object 
    invoices_data = invoices_data.filter((invoice) => invoice.ticket_id !== req.body.data.ticket_id && invoice.date_of_purchase !== req.body.data.date_of_purchase )
    //remove duplicate item
    let newInvoiceData = invoices_data.filter((c, index) => {
      return invoices_data.indexOf(c) === index;
    });
    fs.writeFileSync(invoiceFilename, JSON.stringify(newInvoiceData, null, 2)) 
    res.status(200).send({status : "OK"})
   }
    
});



app.post('/tickets/addNewTicket',  (req, res) => {
  // console.log("test time : ", new Date(req.body.data.date_of_purchase).toLocaleString(), ", typeof : ", typeof(new Date(req.body.data.date_of_purchase).toLocaleString()))
  // console.log(req.body)
  console.log("########################################################################################################################")
  
  if (req.body.ticketData.invoice ) { 
    //save new customer in json file
    if (req.body.customerData.newCustomer) {
      const customerFilename = "client/src/database/customers.json"
      const loadJSON_customers = JSON.parse(fs.existsSync(customerFilename)) ? fs.readFileSync(customerFilename).toString()  : '""' 
      const customers_data = JSON.parse(loadJSON_customers); //string to JSON object 
      let conca = customers_data.concat([req.body.customerData.customer]); //put json in an array
      
      //remove duplicate item
      let newCustomerData = conca.filter((thing, index, self) =>
        index === self.findIndex((t) => t.id === thing.id)
      );
      fs.writeFileSync(customerFilename, JSON.stringify(newCustomerData, null, 2)) 
    }
    
  //   //############################################################################################################################################

  //   //save new invoice in json file
    const invoiceFilename = "client/src/database/invoices.json"
    const loadJSON_invoices = JSON.parse(fs.existsSync(invoiceFilename)) ? fs.readFileSync(invoiceFilename).toString()  : '""' 
    const invoices_data = JSON.parse(loadJSON_invoices); //string to JSON object 
    // console.log(req.body)
    if (invoices_data.filter((invoice) => invoice.ticket_id === req.body.ticketData.ticket_id ).length ===0 ) {
      // let  count_invoice = invoices_data.filter((inv) => inv.purchase_date.substring(0,7)  ===  req.body.ticketData.date_of_purchase.substring(0,7)  ).length + 1
      // // console.log("count_invoice : ", count_invoice)
      // if (count_invoice.toString().length <3 ) { // if the number of the invoice has only 3 digits
      //   count_invoice = "0".repeat(3-count_invoice.toString().length) + count_invoice
      //   // console.log("count_invoice_digit : ", count_invoice)
      // }
      // let  invoice_number = "FA" + req.body.ticketData.date_of_purchase.substring(0,7) + "-" + count_invoice

      let list_invoice_filtered = invoices_data.filter((inv) => inv.purchase_date.substring(0,4)  === req.body.ticketData.date_of_purchase.substring(0,4)  ) //list of invoice filtered by date
      let list_invoice = list_invoice_filtered.map(inv => inv.invoice_number ) //list of invoice_number
      let list_invoice_sorted_desc = list_invoice.sort((a, b) => b.localeCompare(a)); //  desc list of invoice_number
      let  invoice_number = ""
      if (list_invoice_filtered.length > 0) {
        let count_invoice = Number(list_invoice_sorted_desc[0].slice(-3)) + 1
        // console.log("count_invoice : ", count_invoice)
        if (count_invoice.toString().length <3 ) { // if the number of the invoice has less than 3 digits
          count_invoice = "0".repeat(3-count_invoice.toString().length) + count_invoice
          // console.log("count_invoice_digit : ", count_invoice)
        }
        invoice_number = req.body.ticketData.date_of_purchase.substring(0,4) + "-" + count_invoice
      } else { //first ticket of te year
        invoice_number = req.body.ticketData.date_of_purchase.substring(0,4) + "-001" 
      }


      let conca2 = invoices_data.concat([{
        invoice_id: invoices_data.length === 0 ? 0 : invoices_data[invoices_data.length -1 ].invoice_id +1,
        invoice_number : invoice_number,
        ticket_id: req.body.ticketData.ticket_id,
        customer_id: req.body.customerData.customer.id,
        purchase_date: req.body.ticketData.date_of_purchase
      }]); //put json in an array
      
      //remove duplicate item
      let newInvoiceData = conca2.filter((c, index) => {
        return conca2.indexOf(c) === index;
      });
      fs.writeFileSync(invoiceFilename, JSON.stringify(newInvoiceData, null, 2)) 
    }
  }

  //SAVE TICKET DATA
  const ticketFilename = "client/src/database/tickets.json"
  const loadJSON_tickets = JSON.parse(fs.existsSync(ticketFilename)) ? fs.readFileSync(ticketFilename).toString()  : '""' 
  const tickets_data = JSON.parse(loadJSON_tickets); //string to JSON object 
  let conca3 = tickets_data.concat([req.body.ticketData]); //put json in an array
  //remove duplicate item
  let newTicketData = conca3.filter((thing, index, self) =>
      index === self.findIndex((t) => t.ticket_id === thing.ticket_id)
  );
  fs.writeFileSync(ticketFilename, JSON.stringify(newTicketData, null, 2))
  res.status(200).send({status : "OK"})
});


app.post('/invoices', async (req, res) => {
  const newData = req.body
  // console.log(newData)
  const filename = "client/src/database/invoices.json"
  fs.writeFileSync(filename, JSON.stringify(newData, null, 2))
  res.status(200).send({status : "OK"})
});




app.post('/invoices/createInvoice', async (req, res) => {
  const ticketFilename = "client/src/database/tickets.json"
  const loadJSON_tickets = JSON.parse(fs.existsSync(ticketFilename)) ? fs.readFileSync(ticketFilename).toString()  : '""' 
  const tickets_data = JSON.parse(loadJSON_tickets); //string to JSON object 
  let conca = tickets_data.concat([req.body.newTicketData]); //put json in an array
  //remove duplicate item
  let newticketData = conca.filter((c, index) => {
    return conca.indexOf(c) === index;
  });
  fs.writeFileSync(ticketFilename, JSON.stringify(newticketData, null, 2)) 

  // ######################################################
  const invoiceFilename = "client/src/database/invoices.json"
  const loadJSON_invoices = JSON.parse(fs.existsSync(invoiceFilename)) ? fs.readFileSync(invoiceFilename).toString()  : '""' 
  const invoices_data = JSON.parse(loadJSON_invoices); //string to JSON object 
   conca = invoices_data.concat([req.body.newInvoiceData]); //put json in an array
  //remove duplicate item
  let newinvoiceData = conca.filter((c, index) => {
    return conca.indexOf(c) === index;
  });
  fs.writeFileSync(invoiceFilename, JSON.stringify(newinvoiceData, null, 2)) 

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


app.post('/reports', async (req, res) => {
  const today_date = req.body.today_date
  console.log("today_date", today_date)
  // console.log("today_date sub", today_date.substring(0,10))


  const ticketZFilename = "client/src/database/ticketZ.json"
  const loadJSON_ticketZ = JSON.parse(fs.existsSync(ticketZFilename)) ? fs.readFileSync(ticketZFilename).toString()  : '""' 
  const ticketZ_data = JSON.parse(loadJSON_ticketZ); //string to JSON object 
  // let conca = ticketZ_data.concat([req.body.customerData.customer]); //put json in an array

  const loadJSON_ticketDB = JSON.parse(fs.existsSync(ticketZFilename)) ? fs.readFileSync("client/src/database/tickets.json").toString()  : '""' 
  const ticketsDB = JSON.parse(loadJSON_ticketDB); //string to JSON object 
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index
  }

  // console.log("ticketZ_data", ticketZ_data)
  console.log("type of ", typeof(ticketZ_data))
  console.log("ticketZ_data === '' ", ticketZ_data === '')

  let newTicketZData = []
  if (ticketZ_data === "") { // si fichier vide
      console.log("condition 1")
      console.log("nothing happen")
  } else { // si fichier non vide
    newTicketZData = newTicketZData.concat(ticketZ_data) //concatène 2 arrays
    console.log("condition 2")
    // console.log('ticketZ_data', ticketZ_data) // before changes
    console.log('newTicketZData.length :', newTicketZData.length)

  // const rapportJour =() => {
      let prev_registered_date = '2023-12-31T11:20:02.413Z'
      // const prev_registered_date_local = new Date(prev_registered_date).toLocaleString()
      let newTicketZDay = newTicketZData.filter(ticketZ => ticketZ.period_type === "day")
      if (newTicketZDay.length > 0 && newTicketZDay[newTicketZDay.length-1].periodtStart > prev_registered_date ) {
        prev_registered_date = newTicketZDay[newTicketZDay.length-1].periodtStart
      }

      if (ticketsDB.length > 0) {
        let ticketDB_filtered = ticketsDB.filter((ticket) => ticket.date_of_purchase >  prev_registered_date  && ticket.date_of_purchase.substring(0,10) !== today_date.substring(0,10) )
        // let ticketLocalDate = new Date(ticketDB_filtered[0].date_of_purchase).toLocaleString()

        if (ticketDB_filtered.length > 0) {
          let listDate = ticketDB_filtered.map((ticket) => ticket.date_of_purchase.substring(0,10)).filter(distinct) // Liste des dates des tickets
          console.log("listDate :", listDate)

          const startDate = new Date(listDate[0].substring(0,10)) //Thu May 18 2023 02:00:00 GMT+0200 (heure d’été d’Europe centrale)
          // const endDate = new Date(listDate[listDate.length-1].substring(0,10))//Thu May 18 2023 02:00:00 GMT+0200 (heure d’été d’Europe centrale)
          const endDateTmp = new Date(today_date.substring(0,10)).getTime() - 60*60*24*1000 
          const endDate = new Date(endDateTmp) // today_date -1 day
          const currentDate = new Date(startDate.getTime()) //Thu May 18 2023 02:00:00 GMT+0200 (heure d’été d’Europe centrale)
          let allDates = []; //liste complète de dates jour YYYY-MM-DD
          while (currentDate <= endDate ) {
            allDates.push(new Date(currentDate).toISOString().substring(0,10));
            currentDate.setDate(currentDate.getDate() + 1);
          }


          for (let i in  allDates ) {
            let  tickets = ticketDB_filtered.filter((ticket) => ticket.date_of_purchase.substring(0,10) === allDates[i] )
            let newTicketZDay = {}
            let periodEnd = ''
            // console.log('allDates.length', allDates.length)
            // console.log(i + ' ' + allDates[i] )
            if ( tickets.length > 0 ) {
              if (i !== allDates.length-1 ) {
                // console.log('date analyzed ',allDates[Number(i)])
                periodEnd = new Date(allDates[Number(i)+1] + " 06:59:59").toISOString()
              } else {
                console.log('date analyzed ',allDates[Number(i)])
                let dateEnd = new Date(allDates[i] + " 06:59:59")
                dateEnd.setDate(dateEnd.getDate() + 1)
                periodEnd = dateEnd.toISOString()
              }
                newTicketZDay = {
                id : newTicketZData.length === 0 ? 0 : newTicketZData[newTicketZData.length - 1].id + 1,
                period_type : "day",
                periodtStart : new Date(allDates[i] + " 7:00:00").toISOString(),
                periodEnd : periodEnd,
                total_ticket : tickets.length,
                total_TTC : tickets.map((ticket) => Number(ticket.TTC) ).reduce((tot, amount) => tot + amount).toFixed(2),
                total_HT : tickets.map((ticket) => Number(ticket.HT) ).reduce((tot, amount) => tot + amount).toFixed(2),
                total_TVA : tickets.map((ticket) => Number(ticket.TVA) ).reduce((tot, amount) => tot + amount).toFixed(2),
                total_CB : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "CB").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "CB").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2),
                total_Espece : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Espèces").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Espèces").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2),
                total_Cheque : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Chèque").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Chèque").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2),
                total_cumul : newTicketZData.length === 0 ? 0 : ticketsDB.filter((ticket) => ticket.date_of_purchase >  prev_registered_date  && ticket.date_of_purchase.substring(0,10) <= allDates[i].substring(0,10) ).map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2)
              } 
              // console.log("XH")
              // console.log("--------------------")
              // console.log("Ticket Z")
              // console.log("Rapport journalier")
              // console.log("Rapport numéro : X")
              // console.log("Pérode imprimée : ", allDates[i] )
              // console.log("--------------------")
              // console.log("Nombre de tickets : ", tickets.length)
              // console.log("Total TTC : ", tickets.map((ticket) => Number(ticket.TTC) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
              // console.log("Total HT : ", tickets.map((ticket) => Number(ticket.HT) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
              // console.log("Total TVA 5.5% : ", tickets.map((ticket) => Number(ticket.TVA) ).reduce((tot, amount) => tot + amount).toFixed(2), "€" )
              // console.log("")
              // console.log("Espèces : ", tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Espèces").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Espèces").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
              // console.log("Cartes bancaires : ", tickets.filter((ticket) => ticket.PAYMENT_METHOD === "CB").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "CB").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
              // console.log("Chèques : " , tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Chèque").length === 0 ? 0 : tickets.filter((ticket) => ticket.PAYMENT_METHOD === "Chèque").map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2), "€"  )
              // console.log("")
            } 
          //   else {
          //     newTicketZDay = {
          //       id : newTicketZData.length === 0 ? 0 : newTicketZData[newTicketZData.length - 1].id + 1,
          //       period_type : "day",
          //       periodtStart : "",
          //       periodEnd : "",
          //       total_ticket : tickets.length,
          //       total_TTC : 0,
          //       total_HT : 0,
          //       total_TVA : 0,
          //       total_CB : 0,
          //       total_Espece : 0,
          //       total_Cheque : 0,
          //       total_cumul : newTicketZData.length === 0 ? 0 : ticketsDB.filter((ticket) => ticket.date_of_purchase >  prev_registered_date  && ticket.date_of_purchase.substring(0,10) <= allDates[i].substring(0,10) ).map((ticket) => Number(ticket.TTC)  ).reduce((tot, amount) => tot + amount).toFixed(2)
          //   }
          // }//end else
          if (Object.keys(newTicketZDay).length !=0) {
            newTicketZData.push(newTicketZDay)
          }
          }//end loop for
        } else {
          console.log("Too soon !")
        }
      }
    // }

    // console.log('newTicketZData', newTicketZData)
 // CA TROUNE DEUX FOIS COMME D'HAB ... ou pas 
  }
  // console.log("newTicketZData",newTicketZData)
  fs.writeFileSync(ticketZFilename, JSON.stringify(newTicketZData, null, 2)) 

  // res.end()
  res.status(200).send({status : "OK"})
    // newTicketZData.push(
    //     {
    //         id : 0,
    //         period_type : "day",
    //         period : "01/01/2022 10:10:10 au 02/01/2022 10:10:10",
    //         total_ticket : 0,
    //         total_TTC: "",
    //         total_HT: "",
    //         total_TVA: "",
    //         total_CB: "",
    //         total_Espece: "",
    //         total_Cheque: "",
    //         total_cumul : ""
    //     })
    
    // }
});



app.post('/reportToPrint',  (req, res) => {
  // console.log("test time : ", new Date(req.body.data.date_of_purchase).toLocaleString(), ", typeof : ", typeof(new Date(req.body.data.date_of_purchase).toLocaleString()))
  // console.log(req.body.data)
  console.log("########################################################################################################################")


  console.log("Connecting to printer ...");
  let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: 'tcp://192.168.0.29'
  });

  let isConnected =  printer.isPrinterConnected();
  // console.log('Printer connection status', isConnected) // return Promise { <pending> }
  
  isConnected
  .then(connected => { 
    console.log("connection status :", connected )
    if (connected) {
      console.log("Printer connected !");
      printer.alignCenter();
      printer.setTextQuadArea();
      printer.println("X.H" );
      printer.setTextNormal();
      printer.println("19 RUE CIVIALE" );
      printer.println("75010 PARIS" );
      printer.println("TEL : 07.86.31.63.88" );
      printer.println("SIRET : 887752137 PARIS" );
      // printer.newLine(); 
      printer.drawLine();
      printer.println("Ticket Z");
      printer.println("Rapport journalier");
      printer.println("Rapport N." + req.body.data.id);
      printer.println("Periode imprimee :");
      printer.println(dateFormat(req.body.data.periodtStart) +" au "+ dateFormat(req.body.data.periodEnd));
      printer.drawLine();
      // printer.newLine(); 
      printer.leftRight("Nombre de tickets : ",req.body.data.total_ticket);
      printer.leftRight("Total TTC : ",req.body.data.total_TTC+"$");
      printer.leftRight("Total HT : ",req.body.data.total_HT+"$");
      printer.leftRight("Total TVA 5.5% : ",req.body.data.total_TVA+"$");
      printer.leftRight("Total cumul TTC : ",req.body.data.total_cumul+"$");
      printer.leftRight("Espèces : ",req.body.data.total_Espece+"$");
      printer.leftRight("Cartes bancaires : ",req.body.data.total_CB+"$");
      printer.leftRight("Chèques : ",req.body.data.total_Cheque+"$");

      printer.cut();
  
      try {
      let execute = printer.execute()
        console.log("Print done!");
      } catch (error) {
        console.log("Print failed:", error);
        // console.warn("Impossible de se connecter à l'imprimante !")
        // res.send("Impossible de se connecter à l'imprimante ! 无法连接到打印机 !")
      }
      res.json({"printerConnected" : true})

    } else {
      console.log("printer not connected ! ", new Date().toLocaleString())
      // res.render('error.ejs', {})
      // res.redirect('http://localhost:3000')
      // res.send("Impossible de se connecter à l'imprimante ! 无法连接到打印机 !")
      // res.status(404).send({"status" : "not OK"})

      res.json({"printerConnected" : false})
      // res.sendFile(path.join(__dirname, "/client/public", "test.html"));
      // res.status(404).render('trfygvbhj',{})
      // console.log("blabla")
    }
  })    
});





app.listen(port, (err) => {
    if (err) {
      throw err
    }
    console.log(`Server is running on http://localhost:${port}`)
  })
// };