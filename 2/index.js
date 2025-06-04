const fs = require('fs');
const fsPromises = require('fs').promises;

const path = require('path');

const fileOps = async() => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'tepm.txt'), 'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'ali.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promissWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promissWrite.txt'), ' \n waaaaayyy', 'utf-8');
    } catch{
        console.error(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'tepm.txt'), 'utf-8' , (err, data) => {
//     if(err) throw err;
//     console.log(data);
// } )

console.log('hello .....');

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'hello back',(err) => {
//     if(err) throw err;
//     console.log('message replied')

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),' no ',(err) => {
//     if(err) throw err;
//     console.log('message append')
//     } )

//     fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'ali.txt'),(err) => {
//     if(err) throw err;
//     console.log('rename complete')})

// } )

// fs.appendFile(path.join(__dirname, 'files', 'append.txt'),'lala ',(err) => {
//     if(err) throw err;
//     console.log('message append')
// } )

process.on('uncaughtException', err => {
    console.error('There was an uncaught exception:', err);
    process.exit(1);
});

