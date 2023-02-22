import {setAndGetDataFromLS, setDataInLS} from "./localStorageManager";
import customersDB from "../database/customers";


/*
* This function adds a customer in the DB
* */
export function addCustomer(customer) {
    let customers = getCustomers();
    customers.push(customer);
    updateCustomers(customers);
}

/*
* This function updates all the customers of the DB (replaces with the array in parameter)
* */
export function updateCustomers(customers) {
    setDataInLS("customers", customers);
}

/*
This function returns all the customers from DB
*/
export function getCustomers() {
    return setAndGetDataFromLS("customers", customersDB);
}

