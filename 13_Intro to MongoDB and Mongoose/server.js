const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const cors = require('cors');
const corsOptions = require('./config/corsOption')
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const { el } = require('date-fns/locale');
const PORT = process.env.PORT || 8080;

//custom middleware logger
app.use(logger);//logger defines in the logEvents.js file

app.use(credentials); //enable credentials for CORS

app.use(cors(corsOptions)); //enable CORS for all routes

//built-in middleware note: these are aplied to all routes
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//middleware to parse cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root')); //mounting the root router
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh')); //route for handling refresh tokens
app.use('/logout', require('./routes/logout')); //route for handling logout

app.use(verifyJWT); //apply JWT verification middleware to all routes below this line
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
