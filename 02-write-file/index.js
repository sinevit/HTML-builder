const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

console.log('Hi! Please write something!')

rl.on('line', (input) => {
    if(input !== 'exit'){
        fs.appendFile(path.join(__dirname, 'text.txt'), `\n${input} `, (err) => {
            if (err) console.log(err)})
            console.log('______');
    }else{
        rl.close();
        console.log('\n Thank you! Good luck)')
    }
});

rl.on('SIGINT', () => {
    rl.close();
    console.log('\n Thank you! Good luck)')
})

