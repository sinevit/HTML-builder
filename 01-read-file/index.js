const path = require('path');
console.log(path.join(__dirname, 'text.txt'));

const fs = require('fs');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf-8');
readableStream.on('data', chunk => console.log(chunk));
