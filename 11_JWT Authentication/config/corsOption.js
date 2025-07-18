//cross-origin resource sharing (CORS) middleware
const whitelist = require('./whitelist'); //import the whitelist from config/whitelist.js

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

module.exports = corsOptions;