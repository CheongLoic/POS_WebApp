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
        if (a.product_full_name < b.product_full_name) {
          return -1;
        }
        if (a.product_full_name > b.product_full_name) {
            return 1;
          }
          // a must be equal to b
          return 0;
      })
 
     return newData;
 }

 export function sortProductByIDAsc(data) {
    // Tri croissant
    const newData = data.sort((a, b) => {
        if (a.product_id < b.product_id) {
          return -1;
        }
        if (a.product_id > b.product_id) {
            return 1;
          }
          // a must be equal to b
          return 0;
      })
 
     return newData;
 }

 export function sortDataTicketID_DESC(data) {
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

 export function sortDataTicketID_ASC(data) {
  // Tri croissant
  const newData = data.sort((a, b) => {
      if (a.ticket_id > b.ticket_id) {
        return 1;
      }
      if (a.ticket_id < b.ticket_id) {
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


 export function removeDiscountedProducts(data, unwanted_data) {
  let filtered_data = data.filter((product) => product.typeOfSale === "unit")
  for (let i in unwanted_data) {
    filtered_data = filtered_data.filter((product) => product.product_id !== unwanted_data[i].product_id)
  }

  return filtered_data;

 }



 export function sortCustomeByCompany(data) {
  // Tri croissant
  const newData = data.sort((a, b) => {
      if (a.company < b.company) {
        return -1;
      }
      if (a.company > b.company) {
          return 1;
        }
        // a must be equal to b
        return 0;
    })

   return newData;
}


/**
 * @param dateFormat (string) : "2023-02-21T06:00:00.000Z"
 * @return (string) "21/02/2023 05:00:00"
 */
export function dateFormat(date_of_purchase) {
  const dateHour = new Date(date_of_purchase).toLocaleString().split(' ')[1]
  const date = date_of_purchase.substring(0,10).split("-")
  return date[2] + "/"+ date[1] + "/"+ date[0] + " "+ dateHour;
}


export function sortPeriodtStartDesc(data) {
  // Tri décroissant
  const newData = data.sort((a, b) => {
      if (a.periodtStart < b.periodtStart) {
        return 1;
      }
      if (a.periodtStart > b.periodtStart) {
          return -1;
        }
        // a must be equal to b
        return 0;
    })

   return newData;
}