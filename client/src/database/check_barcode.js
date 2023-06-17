// import products from './products.json'
// const product = require('products.json')

const fs = require("fs");
const productFilename = "products.json"
  const loadJSON_products = JSON.parse(fs.existsSync(productFilename)) ? fs.readFileSync(productFilename).toString()  : '""' 
  const products = JSON.parse(loadJSON_products); //string to JSON object 

const test =(product) =>{
  let count_wrong_barcode =0
    products.map((product) => {
        product.barCode_list.map((BARCODELIST) => {
            if (BARCODELIST.barCode.length !== 13  && product.typeOfSale === "unit" && product.barCode_available === true ) {
              count_wrong_barcode +=1
              return (console.log(product.product_id, " ", product.product_full_name, " ", BARCODELIST.barCode))}
    
        })
    })
    console.log('count_wrong_barcode', count_wrong_barcode)

}

test()