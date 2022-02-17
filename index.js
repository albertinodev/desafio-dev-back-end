const express = require("express");
const routes = require('./routes/tool');
const mongoose = require('mongoose');

const morgan = require('morgan');
const cookieParser = require("cookie-parser"); 

const PORT = process.env.PORT || 3000;

//Create Express App
const app = express();


//Meddleware Static Files
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));


//SwaggerUI import
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// Setup swagger to be acessible on especified /users/documentation
app.use('/tools/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
//app.use('/tools/add/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

// Cors for aceptiong requests from everwere
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(routes);


//404
app.use((req, res) => {
    res.status(404).json({ type: "error", message: "Página não encontrada" });
});


//connect to mongodb & listen for requests
const dbURI = "mongodb+srv://testedev:0907TesteDev2022@cluster0.zuj4j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
      app.listen(PORT);
      console.log("Server running in port: " + PORT);
 }).catch(err => console.log(err));