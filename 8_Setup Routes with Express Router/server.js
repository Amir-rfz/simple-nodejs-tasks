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

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public'))); //static files for subdir

app.use('/', require('./routes/root')); //mounting the root router
app.use('/subdir', require('./routes/subdir')); //mounting the subdir router
app.use('/employees', require('./routes/api/employees'))

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
