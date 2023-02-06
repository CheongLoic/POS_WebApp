var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack'); 

// https://putaindecode.io/articles/premier-exemple-d-utilisation-de-webpack/
//https://jsramblings.com/creating-a-react-app-with-webpack/

module.exports = {
  // nos points d'entrée, par clé
  // (on peut en définir plusieurs)
  entry: {
    index: "./src/index.js",
  },

  // description de nos sorties
  output: {
    // ./dist
    path: path.join(__dirname, "build"),
    // nous aurons (vu notre point d'entrée)
    // - dist/index.js
    filename: "main.js",
    // notre base url
    // publicPath: "/",
  },
    //mode : 'development',

  resolve: {
  // ici, on peut ajouter nos extensions à résoudre lors d'un require()
  // on va rester simple en n'autorisant rien, ou .js(on) (comme en nodejs et
  // browserify)
    extensions: ["", ".js", ".json", ".jsx"],
    // fallback: {
    //     "fs": false,
    //     "zlib" : false,  //require.resolve('browserify-zlib')
    //     // "util": require.resolve('util/'), //false,
    //     // "buffer": false,
    //     // "assert": false,
    //     "net": false,
    //     "crypto": false,
    //     "electron-printer" : false,
    //     "electron" : false ,
    //     "os":false,
    //     "url":false,
    //     "child_process" : false,
    //     "http" : false,
    //     "https" : false,
    //     "printer" : false,
    //     "path": false,
    //     "dns" : false,
    //     "tls" : false,
    //     "constants" : false,
    //     "aws-sdk" : false,
    //     "querystring" : false,
    //     // "stream": false,
    //     // "express" : false,
        
    // }
  },

  // target: 'node',
  plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"  //path.join(__dirname, "public", "index.html")
      }),

      // https://www.gimtec.io/articles/process-is-not-defined/
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // }),


      // https://github.com/browserify/commonjs-assert/issues/55
    //   new webpack.ProvidePlugin({
    //     // Make a global `process` variable that points to the `process` package,
    //     // because the `util` package expects there to be a global variable named `process`.
    //          // Thanks to https://stackoverflow.com/a/65018686/14239942
    //     process: 'process/browser',
    //     Buffer: ['buffer', 'Buffer'],
    //  })
    ],

  // devServer: {
  // static: {
  //     directory: path.join(__dirname, "build"),
  // },
  // port: 3000,
  // },
  
module: {
  // liste de nos loaders
  // ! \\ à noter que les loaders sont exécutés en ordre inverse
  // les premiers en dernier, en utilisant la sortie du suivant
  rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader :  "babel-loader",
            options : {
              presets : ["@babel/preset-env", "@babel/preset-react"]
            } 
          } 
      },
      {
          test : /\.(ico|png|jpg|gif|svg|jpeg)$/,
          use: ['file-loader']
          // type : "asset/resource"
      },
      { 
          test: /\.(css|scss)$/, 
          use :   ['style-loader', "css-loader",   'sass-loader' ] ,
      },
      // {
      //     test: /\.svg$/,
      //     use: ['svg-url-loader', 'svg-inline-loader'],
      // },
    ],
     

    // loaders: [
    //   {
    //     // pour tous les fichiers qui finissent par .js
    //     test: /\.js$/,
    //     // ... en prenant bien soin d'exclure les node_modules
    //     exclude: /node_modules/,

    //     // on ajoute les loaders babel et eslint
    //     // à vous de voir ce que vous aurez besoin
    //     // ("rien" est une option tout à fait valable si vous codez en ES5
    //     // sans linter)
    //     loaders: ["babel", "eslint"],

    //     // à noter que l'on peut définir les loaders de cette façon
    //     // loader: "babel!eslint",

    //     // à noter aussi, Webpack va tenter de loader des modules ayant dans
    //     // leur nom "-loader". Si ce n'était pas le cas, ou que votre loader
    //     // ne comporte pas -loader, vous pouvez spécifier le nom entier :
    //     // loader: "babel-loader!eslint-loader",
    //   },
    //   // à l'inverse de node et browserify, Webpack ne gère pas les json
    //   // nativement, il faut donc un loader pour que cela soit transparent
    //   {
    //     test: /\.json$/,
    //     loaders: ["json"],
    //   },
    // //   {
    // //     // pour nos CSS, on va utiliser un plugin un peu particulier
    // //     // qui va nous permettre de require() nos CSS comme un module
    // //     // mais qui va tout de même permettre de sortir tout cela dans un seul
    // //     // fichier .css pour la production
    // //     // (selon un paramètre qu'on définira ci-dessous)
    // //     test: /\.css$/,
    // //     // cette méthode possède 2 paramètres :
    // //     // + loaders à utiliser si ce module est désactivé
    // //     // + loaders à utiliser dans tous les cas en amont
    // //     loader: ExtractTextPlugin.extract(
    // //       // si on extract pas, on utilisera le loader suivant
    // //       // (ce module chargera les styles dans des tags <style>, suffisant
    // //       // en mode dév)
    // //       // en production vous devrez vous charger d'utiliser un
    // //       // <link rel="stylesheet" ...
    // //       "style",
    // //       // dans tous les cas, on utilisera cssnext ainsi que le loader CSS
    // //       // de base (celui-ci permet de gérer les ressources dans le CSS
    // //       // en temps que modules: images, font etc)
    // //       "css!cssnext",
    // //     ),
    // //     // Si vous n'avez pas besoin d'avoir une CSS à part, vous pouvez
    // //     // simplement supprimer la partie "loader" ci-dessus et utiliser plutôt
    // //     // loaders: [
    // //     //  "style",
    // //     //  "css",
    // //     //  "cssnext",
    // //     // ],
    // //     // À noter que dans ce cas, il vous faudra supprimer le plugin
    // //     // ExtractTextPlugin dans la liste plus bas
    // //   },
    // //   // pour la suite, on va rester simple :
    // //   // un require() en utilisant le file-loader retournera une string avec
    // //   // le nom du fichier et (le plus important) copiera le fichier suivant
    // //   // le paramètre "name" dans l'output.path que nous avons défini tout
    // //   // au début de notre configuration.
    // //   // Notez qu'il dégagera la partie context du nom lors du retour en string
    // //   // et la remplacera par le l'output.path défini pour la copie.
    // //   {
    // //     // on chargera tous les formats d'images qui nous intéressent en tant
    // //     // que fichiers.
    // //     test: /\.(ico|jpe?g|png|gif)$/,
    // //     loaders: [
    // //       "file?name=[path][name].[ext]&context=./src",
    // //       // Vous remarquerez ici la méthode utilisée pour définir
    // //       // des options pour les loaders. Il en existe d'autres avec les
    // //       // versions les plus récentes en utilisant la clé "query"
    // //     ],
    // //   },
    // //   {
    // //     // idem pour les fonts
    // //     test: /\.(woff|ttf|otf|eot\?#.+|svg#.+)$/,
    // //     loaders: ["file?name=[path][name].[ext]&context=./src"],
    // //   },
    // //   {
    // //     // ici on se permet de loader des fichiers html et txt tels quels
    // //     test: /\.(html|txt)$/,
    // //     loaders: ["file?name=[path][name].[ext]&context=./src"],
    // //   },
    // ],
  }
    
};

// npm i -D @babel/core  @babel/preset-env @babel/preset-react babel-loader eslint-loader babel-eslint json-loader style-loader css-loader sass-loader file-loader sass