//cross-origin resource sharing (CORS) middleware
const whitelist = ['https://www.google.com',
                    'http://www.yoursite.com',
                    'http://127.0.0.1:5500',
                    'http://localhost:8080'];
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