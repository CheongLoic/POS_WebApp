const fs = require('fs');

//Code from this video : https://www.youtube.com/watch?v=EXx-t9CRKeo


export function loadJSON(filename = ''){
    return JSON.parse(fs.existsSync(filename)) 
    ? fs.readFileSync(filename).toString()
    : '""' 
}

export function saveJSON(filename='', json = '""'){
    return fs.writeFileSync(filename, JSON.stringify(json, null, 2))
}

export function addDataToJson(data, newData){
    const data2 = JSON.parse(data); //string to JSON object 
    return data2.push(newData); // add and return data in json object

}

 const newData = {
    id: 4,
    first_name: 'irene',
    last_name: 'blabugfdkhbla',
    company : "Co. 551",
    email: 'amy.sahkurjbgjbln.com',
    city : "Paris"
}




// console.log(data);
// const data2 = JSON.parse(data);
// console.log(typeof data2);
// data2.push(newData);
// console.log(data2);
// console.log(data);

const data = loadJSON("client/src/database/customers.json");
const dataToSave = addDataToJson(data, newData)
saveJSON('client/src/database/customers.json', dataToSave)

// console.log(customers);

// saveJSON("customers.js", customers)
