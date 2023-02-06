const products = [
    {
        product_id: 0,
        product_name: 'Poisson Trident M',
        barCode_list: [
            {
                barCode : '0123456789101' ,
                quantity : "10",
                buying_price : "8",
                date_of_purchase : "2020-01-01" , 
                expiration_date : "2023-12-01"
            },
        ],
        price_history : [
            {
            date : "2020-01-01",
            product_price : "8.5"
            }
        ] , 
        typeOfSale : "weight",
        image :"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Scardinius_erythrophthalmus.jpg/330px-Scardinius_erythrophthalmus.jpg",
        display_on_screen : true
    },
    {
        product_id: 1,
        product_name: 'White Rabbit',
        barCode_list: [
            {
            barCode : '0123456789102' ,
            quantity : "20",
            buying_price : "2",
            date_of_purchase : "2020-01-01" , 
            expiration_date : "2023-12-02"
            },
            {
            barCode : '0123456789103' ,
            quantity : "10",
            buying_price : "2",
            date_of_purchase : "2020-01-01" , 
            expiration_date : "2023-12-03"
            }
        ],
        price_history : [
            {
            date : "2020-01-01",
            product_price : "2.99"
            },
            {
            date : "2022-01-01",
            product_price : "3.99"
            }
        ] , 
        typeOfSale : "unity",
        image :"./img/white_rabbit.jpg",
        display_on_screen : true
    }
];

export default products;