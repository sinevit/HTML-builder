const path = require('path');
// const fs = require('fs');
const fs = require('fs/promises');
const src =  path.join(__dirname, '/styles');
const dist =  path.join(__dirname, '/project-dist');

(async function checkFiles(src, dist ){
    try {
        const files = await fs.readdir( src, {withFileTypes: true});
        let arrStyles =[]
        for (const file of files){
            if (file.isFile() && path.parse(path.join(src, file.name)).ext.slice(1) == 'css') {
                const contentFile = await fs.readFile(path.join(src, file.name), 'utf8');
                arrStyles.push(contentFile);
            }
        }

        await fs.writeFile(path.join(dist, 'bundle.css'), arrStyles.join("\n"));
      } catch (err) {
        console.error(err);
      }
})(src,dist);