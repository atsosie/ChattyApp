ChattyApp
=====================

A minimal and light chat application.

### Usage

Install dependencies with npm install.

```
npm install
```

Run the websocket server.

```
node chatty_server/server.js
```

Run the app server and visit the homepage in your browser.

```
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc., in the `build` folder.

For example, if you copy a file called my_image.png into the build folder, you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
