// Tickets de caisse
const tickets = [
    {
        ticket_id: 0,
        date_of_purchase : "2022-01-30",
        product_list : [
            {
                product_id : 0,
                product_name : 'Poisson Trident M',
                quantity : "2",
                product_price : "8.5",
                product_total_price : "17"
            },
            {
                product_id : 1,
                product_name : 'White Rabbit',
                quantity : "3",
                product_price : "3.99",
                product_total_price : "11.97"
            }
        ],
        TVA : "1.59", //TVA du panier total
        HT : "27.38", //HT du panier total
        TTC : "28.97",
    }
];

export default tickets;