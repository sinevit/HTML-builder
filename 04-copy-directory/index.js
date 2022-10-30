const path = require('path');
// const fs = require('fs');
const fs = require('fs/promises');
const src =  path.join(__dirname, '/files');
const dist =  path.join(__dirname, '/files-copy');

(async function checkFiles(src, dist ){
    try {

        //создает папку /files-copy, recursive =true - не приводит к ошибке если папка создана
        const copyFolder =  await fs.mkdir( dist, { recursive: true });
        //проходит по папке /files-copy и удаляет файлы (unlink)
        const oldfiles = await fs.readdir( dist, {withFileTypes: true});
        for (const oldfile of oldfiles){
            await fs.unlink(path.join(dist, oldfile.name));
        }
        //проходит по папке /files и копирует файлы в /files-copy (copyFile)
        const files = await fs.readdir( src, {withFileTypes: true});
        for (const file of files){
            if (file.isFile()) {
                await fs.copyFile(path.join(src, file.name), path.join(dist,file.name));
                console.log(`${file.name} copy`)
            }
        }
      } catch (err) {
        console.error(err);
      }
})(src,dist);


