// const fs = require('fs');
const path = require('path');
const fs = require('fs/promises');
const src =  path.join(__dirname, '/secret-folder');


(async function checkFiles(src){
try {
    const files = await fs.readdir( src,{withFileTypes: true});
    for (const file of files){
        if (file.isFile()) {
            let fileName = path.parse(path.join(src, file.name)).name;
            let fileExt = path.parse(path.join(src, file.name)).ext.slice(1);
            let fileSize = (await fs.stat(path.join(src, file.name))).size/1024;

            console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
        }
    }
  } catch (err) {
    console.error(err);
  }
})(src);
