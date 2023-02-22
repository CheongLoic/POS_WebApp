// export function TOPRINT() {
  const ThermalPrinter = require("node-thermal-printer").printer;
  const PrinterTypes = require("node-thermal-printer").types;
  const {CharacterSet}  = require("node-thermal-printer");

  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    characterSet: CharacterSet.PC863_CANADIAN_FRENCH, 
    interface: 'tcp://192.168.0.29'
  });

  printer.alignCenter();
  printer.println("Hello world! 2nd test+/*-.;:!*ù$%^&é'(-è_çà~#{[|`\^@]}¤€)=");
//   printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
//   { text:"DXXXXXXXXXXXXXXXXXXXXXXXXX", align:"LEFT", width:0.58, bold : true },
//   { text:"P.UxQTE", align:"CENTER", width:0.20, bold:true },
//   { text:"MONTANT", align:"RIGHT",  width:0.20, bold : true}
// ]);
  printer.cut();

  try {
    let execute = printer.execute()
    console.log("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
//   return null;
// }
