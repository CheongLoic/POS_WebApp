// import logo from './logo.svg';
import './App.css';
// import image_test from "./image_test.png" ;
import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom"; //react-router-dom v6
// import {Route, Switch} from "react-router-dom"; //react-router-dom v5
import Menu from "./components/Menu"
import Customers from "./components/Customers"
import Tickets from "./components/Tickets"
import Invoices from "./components/Invoices"
import Products from "./components/Product/Products"
import AddNewProduct from "./components/Product/AddNewProduct"
import Performances from "./components/Performances"
// import server from "./server";

// import { render, Printer, Text } from 'react-thermal-printer';
// import { connect } from 'net';



class App extends Component {
  
  // componentDidMount(){
  //   server();
    
  // }

  //  setup = (device) => {
	// 	return device.open()
	// 	.then(() => device.selectConfiguration(1))
	// 	.then(() => device.claimInterface(0))
	// }

  // print = (message, device) => {
	// 	// var string = document.getElementById("printContent").value + "\n";
	// 	var encoder = new TextEncoder();
	// 	var data = encoder.encode(message);
	// 	device.transferOut(1, data)
	// 	.catch(error => { console.log(error); })
	// }

  // TEST = () => {
  //   // fetch("/print")
  //   console.log(process.env.NODE_ENV);
  //   console.log("Before printing!");
  //   const ThermalPrinter = require("node-thermal-printer").printer;
  //   const PrinterTypes = require("node-thermal-printer").types;

    // ############################################""
//     const {PosPrinter} = require('electron').remote.require("electron-pos-printer");
// const path = require("path");

// const options = {
//     preview: false,
//     margin: '0 0 0 0',
//     copies: 1,
//     printerName: 'printer-80',
//     timeOutPerLine: 400,
//     pageSize: '80mm' // page size
// }
// #######################################################

    // console.log("After calling library");
    // console.log("Connecting to printer ...");
    // #######################################################
    // let printer = new ThermalPrinter({
    //   type: PrinterTypes.EPSON,
    //   interface: 'tcp://192.168.0.29'
    // });

// #######################################################
    // const electron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;

    // let printer = new ThermalPrinter({
    // type: PrinterTypes.EPSON,
    // interface: 'printer:printe-80',
    // driver: require("@thiagoelg/node-printer")
    // });

// you can also set the driver after init:
// printer.setPrinterDriver("printqueue.inf")
// #######################################################

// var printer = require("node-thermal-printer");
// printer.init({
//   type: 'epson',
//   interface: 'tcp://192.168.0.29'
// });

    // console.log("Printer connected !");
    
    // printer.alignCenter();
    // printer.println("Hello world ! 2nd TEST !");
    // printer.cut();
    
    // try {
    //   let execute = printer.execute()
    //   console.log("Print done!");
    // } catch (error) {
    //   console.log("Print failed:", error);
    // }
// #####################################

// const data = [
//  {
//       type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
//       value: 'SAMPLE HEADING',
//       style: {fontWeight: "700", textAlign: 'center', fontSize: "24px"}
//   },{
//       type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
//       value: 'Secondary text',
//       style: {textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red"}
//   },{
//       type: 'table',
//       // style the table
//       style: {border: '1px solid #ddd'},
//       // list of the columns to be rendered in the table header
//       tableHeader: ['Animal', 'Age'],
//       // multi dimensional array depicting the rows and columns of the table body
//       tableBody: [
//           ['Cat', 2],
//           ['Dog', 4],
//           ['Horse', 12],
//           ['Pig', 4],
//       ],
//       // list of columns to be rendered in the table footer
//       tableFooter: ['Animal', 'Age'],
//       // custom style for the table header
//       tableHeaderStyle: { backgroundColor: '#000', color: 'white'},
//       // custom style for the table body
//       tableBodyStyle: {'border': '0.5px solid #ddd'},
//       // custom style for the table footer
//       tableFooterStyle: {backgroundColor: '#000', color: 'white'},
//   }
// ]

// PosPrinter.print(data, options)
// .then(console.log)
// .catch((error) => {
//   console.error(error);
// });

    // ####################################################""
    // const data =  render(
    //   <Printer type="epson">
    //     <Text>Hello World</Text>
    //   </Printer>
    // );
    
    // const conn = connect({
    //   host: '192.168.0.29',
    //   port: 9100,
    //   timeout: 3000,
    // }, () => {
    //   conn.write(Buffer.from(data), () => {
    //     conn.destroy();
    //   });
    // });


    // var device;
  
	// function connectAndPrint() {
	// 	if (device == null) {
	// 		navigator.usb.requestDevice({ 
  //       filters: [ 
  //         { vendorId: 1155, productId: 22339 }, // <=== It's this one which is the MUNBYN ITPP047 POS Printer 
  //         { vendorId: 1208, productId: 3616 },
  //       ] })
	// 		.then(selectedDevice => {
	// 			device = selectedDevice;
	// 			console.log(device);
	// 			return this.setup(device);
	// 		})
	// 		.then(() => this.print("HELLLO"))
	// 		.catch(error => { console.log(error); })
	// 	}
	// 	else
  //   this.print("HELLLO");
	// // }

	// navigator.usb.getDevices()
	// .then(devices => {
	// 	if (devices.length > 0) {
	// 		device = devices[0];
	// 		return this.setup(device);
	// 	}
	// })
	// .catch(error => { console.log(error); });

  //   console.log("success!");
  // }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <img src={image_test} className="App-image_test" alt="image_test" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-Route"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a> */}

      <Routes>
      {/* <Switch> */}
        <Route exact path="/" element={<Menu/>}/>
        <Route exact path="/products" element={<Products/>}></Route>
        <Route exact path="/products/addNewProduct" element={<AddNewProduct/>}></Route>
        <Route exact path="/tickets" element={<Tickets/>}></Route>
        <Route exact path="/invoices" element={<Invoices/>}></Route>
        <Route exact path="/customers" element={<Customers/>}></Route>
        <Route exact path="/performances" element={<Performances/>}>P</Route>
        <Route path="*" element={() => "ERROR 404 PAGE NOT FOUND"}/>
      </Routes>
      {/* </Switch> */}
      </header>
      {/* <form method="/post" action="/print"> */}
      {/* <button onClick={this.TEST} >Print</button> */}
      {/* </form> */}

      
    </div>
  );
  }
}

export default App;
