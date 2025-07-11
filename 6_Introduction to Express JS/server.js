const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

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
app.get(/\/*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
