const fs = require('fs');

// for when we work with large files

const rs = fs.createReadStream('./files/largeText.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/newLargeText.txt');

// rs.on('data' , (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws)