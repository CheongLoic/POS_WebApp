# POS_WebApp

## About the project
This project is a Point of Sale (POS) web application. 
It aims to generate sales invoices and receipts after a customer has made a food purchase.

The code is written in ReactJS and NodeJS.

The UX/UI design development is basic.

The database is stored in JSON files in the folder `client/src/database` 

## How to run the code ? 
- Install Visual Studio Code : https://code.visualstudio.com/download
- Install Git : https://git-scm.com/downloads
- Install NodeJS : https://nodejs.org/en/download/prebuilt-installe
- Open VS Code and a terminal. Choose a directory where you want to clone the repository
- Clone the project by running the command in the terminal  :  `git clone https://github.com/CheongLoic/POS_WebApp.git`
- Go to the folder "POS_WebApp" (server side), intall modules :  `npm install`
- Go to the folder "client" (client side), intall modules :  `npm install`
- Go to the folder "POS_WebApp" (server side), run :  `npm run dev`


## Functionalities
On the [Menu page](http://localhost:3000/), there are 6 buttons that redirect to different web pages : 
1. [Tickets de caisse](http://localhost:3000/tickets) (receipt) : 
    - List of all the receipts after a client made a purchase. A receipt can be printed, downloaded or deleted.
    - On http://localhost:3000/tickets/addNewTicket, you can create a receipt by choosing the customers' selected products. 
Some products have barcodes, others do not. If a customer choose a product without barcode (like fruits and vegetables), click on the button `Choisir un produit sans code-barres` and choose a product to add it to the cart.

For products with barcodes, you can use a barcode scanner linked to your computer. Scan a barcode of a product already stored in the database (only EAN13 accepted)
2. [Produits alimentaires](http://localhost:3000/products) (food): List of all the products in the store. You can modify and add a new product. You can also download the catalogue of products
3. [Factures](http://localhost:3000/invoices) (invoices): List of all the invoices and you can create a new invoice
4. [Clients](http://localhost:3000/customers) : List of clients
5. [Promotions](http://localhost:3000/discounts) (discounts) : List of all discounted products. 
6. [Rapports](http://localhost:3000/reports) (reports) : to get 'Ticket Z' reports about sales data



## Bibliographies :
1. Repositories for connecting a receipt printer: 
    - https://github.com/Klemen1337/node-thermal-printer
    - https://github.com/possi/node-thermal-printer
    - https://github.com/drffej/webusb.printer/blob/master/printer.html
    - https://github.com/seokju-na/react-thermal-printer

The receipt printer used is a [MUNBYN thermal printer](https://www.amazon.fr/MUNBYN-Imprimante-imprimante-Compatible-Chromebook/dp/B0BRZ4VZD1/ref=asc_df_B0BRZ4VZD1/?tag=googshopfr-21&linkCode=df0&hvadid=701511052694&hvpos=&hvnetw=g&hvrand=8971795484163040522&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9197924&hvtargid=pla-2010043139937&psc=1&mcid=9d0d9ef375ec3bf5b55d4de354faf80d&gad_source=1) 
2. Tutorial to create a modal : https://www.youtube.com/watch?v=ZCvemsUfwPQ&list=LL&index=5
3. Tutorial to detect barcode scan : https://www.youtube.com/watch?v=eF659dHmsAY&list=LL&index=11&t=13s
4. Generate barcode :  https://www.npmjs.com/package/react-barcode
5. React PDF : 
    - documentation : https://react-pdf.org/
    - React-pdf/renderer fontWeight : https://github.com/diegomura/react-pdf/issues/402
6. Reading and Writing to a JSON file with NodeJS :  https://www.youtube.com/watch?v=EXx-t9CRKeo


<!----


//Loi française sur l'obligation sur les systèmes et logiciels  de caisse:
//https://bofip.impots.gouv.fr/bofip/10691-PGP.html/identifiant=BOI-TVA-DECLA-30-10-30-20210519


// Buffer issue :
//https://stackoverflow.com/questions/61631937/cant-resolve-buffer-in-c-portal-node-modules-string-decoder-node-modules-s
//Run the command : 'npm install buffer --save'

// To resolve "Module not found: Error: Can't resolve 'net' in 'C:\Users\LOL\Desktop\caisse\src'" :
//https://stackoverflow.com/questions/54275069/module-not-found-error-cant-resolve-net-in-node-modules-stompjs-lib
//Run the command 'npm i net -S'

//https://stackoverflow.com/questions/70007274/what-is-must-be-handling-a-user-gesture-to-show-a-permission-request-errror-m


To solve 'X.ps1 cannot be loaded because running scripts is disabled on this system'
https://bobbyhadz.com/blog/yarn-cannot-be-loaded-running-scripts-disabled
- pour avoir la liste des policy : `Get-ExecutionPolicy -List`
- `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`

https://github.com/theallmightyjohnmanning/electron-express/blob/master/main.js


kill servers :
https://levelup.gitconnected.com/how-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d


--->

