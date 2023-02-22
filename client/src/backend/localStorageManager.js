/*
 This function gets data from the localStorage with the key specified.
*/
export function getDataFromLS(key) {
    let dataJSON = localStorage.getItem(key);

    if (dataJSON === null)
        return null;
    else
        return JSON.parse(dataJSON);
}

/*
 This function stores data in the localStorage with the key specified.
*/
export function setDataInLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/*
 This function gets data from the localStorage with the key specified.
 If the key doesn't exist, this function stores data in the localStorage with the key specified et return de data
*/
export function setAndGetDataFromLS(key, data) {
   let dataFromLS = getDataFromLS(key);

    if (dataFromLS === null) {
        setDataInLS(key, data);
        dataFromLS = getDataFromLS(key);
    }

    return dataFromLS;
}


export function sortDataByFullName(data) {
    // Tri croissant
    const newData = data.sort((a, b) => {
        if (a.full_product_name < b.full_product_name) {
          return -1;
        }
        if (a.full_product_name > b.full_product_name) {
            return 1;
          }
          // a must be equal to b
          return 0;
      })
 
     return newData;
 }

 export function sortDataTicketID(data) {
    // Tri décroissant
    const newData = data.sort((a, b) => {
        if (a.ticket_id < b.ticket_id) {
          return 1;
        }
        if (a.ticket_id > b.ticket_id) {
            return -1;
          }
          // a must be equal to b
          return 0;
      })
 
     return newData;
 }


 export function sortDataInvoiceID_desc(data) {
    // Tri décroissant
    const newData = data.sort((a, b) => {
        if (a.invoice_id < b.invoice_id) {
          return 1;
        }
        if (a.invoice_id > b.invoice_id) {
            return -1;
          }
          // a must be equal to b
          return 0;
      })
 
     return newData;
 }

 export function sortDataInvoiceID_asc(data) {
    // Tri décroissant
    const newData = data.sort((a, b) => {
        if (a.invoice_id < b.invoice_id) {
          return -1;
        }
        if (a.invoice_id > b.invoice_id) {
            return 1;
          }
          // a must be equal to b
          return 0;
      })
 
     return newData;
 }