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