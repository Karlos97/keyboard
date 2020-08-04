var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Uzycie clean webpack plugin powoduje usuwanie starych plikow (tych, ktore nie zostały utwoorzone podczas aktualnie wykonywanego budowania)
// Dzieki temu nie zostają stare (niepotrzebe) pliki - bo przy kazdym budowaniu zmienia się hash
var { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {

  //sprawdza czy jesteśmy w trybie developerskim
  //na podstawie atrybutu --mode podawanego w package.json przy skrypcie uruchomieniowym
  const isDevMode = !(argv.hasOwnProperty('mode') && argv.mode === 'production')

  const mode = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
//wyciagnalem dista tutaj, z tego wzgledu ze mozna potrzebowac rozny adres dist w zaleznosci od srodowiska
// np. distPath = mode === 'dev' ? 'dist/esm' : 'dist'
  const distPath = 'dist'

  return {
    //webpackowe entry. w obiekcie entry, jako klucz (name) jest nazwa wynikowego pliku ktory bedzie w dist
    //jako wartsc jest glowny plik js z src ( ten ktory zbiera wszystko w danym programie)
    entry: {
      name: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, distPath),
      filename: "[name].[hash].js",
      //filename buduje się z nazwy (name) okreslonej u gory jako klucz, i hasha
      //hash jest po to, ze na stronach działa cache (pamiec plikow)
      //cache powoduje ze uzytkownikowi pobierają się RAZ pliki ze stylami itp itd i są u niego na urządzeniu np. przez miesiac
      //dzieki temu za drugim trzecim ... wejsciem strona ładuje się migiem
      //i hash robi to, że jak wystawisz na produkcje zmiany w js, czy tam w css
      //to bez hasha urządzenie uzytkownika by nie wiedzialo ze cos sie zmienilo, i moglby te zmiany zobaczyc np. za miesiac
      //zalezy jak silny cache jest, a przy hashu poniewaz doszedl de facto nowy plik(bo ma inna nazwe)
      //to te zmiany zobaczy od razu
    },
    // ktore rozszerzenia plików ma webpack brac pod uwage (piszesz tak i nie ruszasz)
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    plugins: [
      //zapewnia ładowanie tych zbudowanych rzeczy w plikach .html bez koniecznosci recznego importu (sprobuj zaimportowac w przypadku uzycia hashu)
      new htmlWebpackPlugin({
        inject: true,
        template: "./src/index.html",
        filename: "index.html",
      }),
      //minimalizuje cssy
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
      }),
      //uzycie tego co czysci stare pliki

      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              //to jest loader do czystego jsa
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-object-rest-spread"],
              },
            },
          ],
        },
        {
          test: /\.html$/,
          //html loader sluzy do exportowania zminifikowanego htmla
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(css|scss)$/i,
          use: [
            mode === "prod" ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          //url loader uzyty do prawidłowego ładowania sciezek do obrazkow itp
          test: /\.(png|jpg|jpeg|git)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].[hash5].[ext]",
                limit: 10000,
                outputPath: "assets/images",
              },
            },
          ],
        },
        {
          //url loader uzyty do prawidłowego ładowania sciezek do fontów, ikonek itp
          test: /\.(eot|woff2?|ttf|otf|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 5000,
                name: "[name].[hash5].[ext]",
                outputPath: "assets/fonts",
              },
            },
          ],
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 5000,
                name: "[name].[hash5].[ext]",
                outputPath: "assets/sound",
              },
            },
          ],
        },
      ],
    },
    //ustawienie devservera
    //content base- sciezka z ktorej ma czytac, compress - czy kompresowac pliki, port to wiadomo
    devServer: {
      contentBase: path.join(__dirname, distPath),
      compress: true,
      port: 9001,
      // hot: true,
      // hot - gryzie sie z css, fajne, bo nie trzeba od nowa uzupelniac formularzy, zmienia tylko element, który został zmienion w kodzie
      //sourcemap daje to, że gdy jest jako false, to nie wiadomo byłoby,gzie wystąpił błąd (w skrypcie, stylach itp) - po zbundlowaniu bylby nie do namierzenia
      // jak jest na true(gdy jest tryb dev) to wepback robi sobie "mape" plików, dzieki temu wie gdzie wskazac ew. blad
      // sourceMap: isDevMode,
    },
    devtool: isDevMode ? "source-map" : false,
  };
 
}