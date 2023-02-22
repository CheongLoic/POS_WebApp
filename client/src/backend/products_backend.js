import {setAndGetDataFromLS, setDataInLS} from "./localStorageManager";
import productsDB from "../database/products";


/*
* This function adds a product in the DB
* */
export function addProduct(product) {
    let products = getProducts();
    products.push(product);
    updateProducts(products);
}

/*
* This function updates all the products of the DB (replaces with the array in parameter)
* */
export function updateProducts(products) {
    setDataInLS("products", products);
}

/*
This function returns all the products from DB
*/
export function getProducts() {
    return setAndGetDataFromLS("products", productsDB);
}

