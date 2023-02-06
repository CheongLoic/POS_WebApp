// export function TOPRINT() {
  const ThermalPrinter = require("node-thermal-printer").printer;
  const PrinterTypes = require("node-thermal-printer").types;

  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.29'
  });

  printer.alignCenter();
  printer.println("Hello world! 2nd test");
  printer.cut();

  try {
    let execute = printer.execute()
    console.log("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
//   return null;
// }
