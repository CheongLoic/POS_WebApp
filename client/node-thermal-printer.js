// export function TOPRINT() {
  const ThermalPrinter = require("node-thermal-printer").printer;
  const PrinterTypes = require("node-thermal-printer").types;
  const {CharacterSet}  = require("node-thermal-printer");
// try {
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    characterSet: CharacterSet.PC863_CANADIAN_FRENCH, 
    interface: 'tcp://192.168.0.29'
  });

  let isConnected =  printer.isPrinterConnected();
  // console.log('Printer connection status', isConnected)
  // console.log('isConnected === false', isConnected === false)
  // console.log('isConnected === true', isConnected === true)
  if (isConnected) {
    console.log('isConnected') 
    isConnected
    .then(valeur => { console.log( valeur + ' et truc') })
    .catch(err => { console.log(err +"FHHHHHHHHHHHHHHHHHHHHH") });
  }
  else {
    console.log('not isConnected') //marche pas 
  }

  printer.alignCenter();
  printer.println("Hello world! 2nd test+/*-.;:!*ù$%^&é'(-è_çà~#{[|`\^@]}¤€)=£€âêîûôäëïöü");
  // printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
//   { text:"DXXXXXXXXXXXXXXXXXXXXXXXXX", align:"LEFT", width:0.58, bold : true },
//   { text:"P.UxQTE", align:"CENTER", width:0.20, bold:true },
//   { text:"MONTANT", align:"RIGHT",  width:0.20, bold : true}
// ]);
  printer.cut();
  try {
    let execute = printer.execute(function(err){ 
      console.log(err , " fuzrygfhbj")
      // return (err + "fuzrygfhbj")
    })
    console.log("Print done!");
  } catch (error) {
    console.log("FUCK YOU !!!!!")
    console.log("Print failed:", error);
  }

  // printer.on('timeout', () => {
  //   console.error('Printer network connection timeout fizefhbzhj.');
  //   resolve(false);
  //   printer.destroy();
  // });
  






//   return null;~#{[|`\^@]}¤¤$£
// }
