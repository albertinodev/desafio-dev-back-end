const express = require("express");
const routes = require('./routes');

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


app.listen(PORT, (err) => { 
    console.log(err, ": server"); 
    console.log("Server running in port: " + PORT);
});
