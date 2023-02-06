const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const port = process.env.PORT || 5000 ;
const app = express();
app.use(express.json());
app.use(cors());

// Video for uploading an image : https://www.youtube.com/watch?v=1KZ-tJRLU5I&list=LL&index=3&t=603s


// app.get("/", (_, res) => {
    
//   console.log("Hello from server express consolo.log from '/' !");
// });

// app.get("/api", (_, res) => {
    
//     console.log("Hello from server express consolo.log  from 'api'  !");
//     res.send("Hello from server express res.send from 'api'!");
// });

const storage = multer.diskStorage({
  destination : path.join(__dirname, '/client/public', 'img'),
  filename : function ( req, file, cb) {
    cb(null, file.originalname)
  }
})

app.post('/products/addNewProduct', async (req,res) => {
  try { 
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


// var router = express.Router();
// router.get('/print', function (req, res) {
//     console.log("Before printing!");
//     const ThermalPrinter = require("node-thermal-printer").printer;
//     const PrinterTypes = require("node-thermal-printer").types;
    
//     console.log("After calling library");
//     console.log("Connecting to printer ...");
//     let printer = new ThermalPrinter({
//     type: PrinterTypes.EPSON,
//     interface: 'tcp://192.168.0.29'
//     });
//     console.log("Printer connected !");
    
//     printer.alignCenter();
//     printer.println("Hello world ! 2nd TEST !");
//     printer.cut();
    
//     try {
//     let execute = printer.execute()
//     console.log("Print done!");
//     } catch (error) {
//     console.log("Print failed:", error);
//     }
    
//     res.send("Try to print !");
// });




app.listen(port, (err) => {
    if (err) {
      throw err
    }
    console.log(`Server is running on http://localhost:${port}`)
  })
// };