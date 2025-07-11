const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { el } = require('date-fns/locale');
const PORT = process.env.PORT || 8080;

//custom middleware logger
app.use(logger);//logger defines in the logEvents.js file

//cross-origin resource sharing (CORS) middleware
const whitelist = ['https://www.google.com', 'http://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:8080'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));v 
        }
    },  
    optionsSuccessStatus: 200 //for legacy browser support
}
app.use(cors(corsOptions)); //enable CORS for all routes

//built-in middleware note: these are aplied to all routes
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get(/^\/(index\.html)?$/, (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
}) 

app.get(/\/new-page(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

app.get(/\/old-page(\.html)?$/, (req, res) => {
    res.redirect(301, '/new-page.html');//by defult the status code is 302
})

//route handller
app.get('/hello', (req, res, next) => {
    console.log('attemp to load hello page');
    next();
}, (req, res) => {
    res.send('Hello World');
})

//midle ware
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('finished');
}

app.get('/chain', one, two, three);

// if the user tries to access any other route, we will send a 404 page
app.all(/'*/, (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
        return;
    }else if(req.accepts('json')) {
        res.json({error: '404 Not Found'});
        return;
    }
    else {
        res.type('txt').send('404 Not Found');
        return;
    }
});

//custom error handler
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
