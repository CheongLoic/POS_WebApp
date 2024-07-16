# POS_WebApp

## A propos
This project aims to generate sales invoices and receipts written in ReactJS and NodeJS.
UX/UI design development is not the priority.

## How to run the code ? 
- Install Visual Studio Code : https://code.visualstudio.com/download
- Open VS Code and a terminal. Go to a directory to download the repository
- Clone the project  :  `git clone https://github.com/CheongLoic/POS_WebApp.git`
- Go to the folder "POS_WebApp" (server side), intall modules :  `npm install`
- Go to the folder "client" (client side), intall modules :  `npm install`
- Go to the folder "POS_WebApp" (server side), run :  `npm run dev`


## Functionalities
In the Home page, there are 6 buttons : 
- Tickets de caisses : create receipts
- Produits alimentaires : all the products in the store. Add and modify a product 
- Factures : create an invoice
- Clients : Customer data
- Promotions : All discounted produtcs
- Rapports : to get reports about data (in development)



## Bibliographies :
1. Repositories for connecting a receipt printer: 
- https://github.com/Klemen1337/node-thermal-printer
- https://github.com/possi/node-thermal-printer
- https://github.com/drffej/webusb.printer/blob/master/printer.html
- https://github.com/seokju-na/react-thermal-printer
2. Create a modal : https://www.youtube.com/watch?v=ZCvemsUfwPQ&list=LL&index=5
3. Detect barcode scan : https://www.youtube.com/watch?v=eF659dHmsAY&list=LL&index=11&t=13s
4. Generate barcode :  https://www.npmjs.com/package/react-barcode
5. React PDF : 
- https://react-pdf.org/
- React-pdf/renderer fontWeight : https://github.com/diegomura/react-pdf/issues/402


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

