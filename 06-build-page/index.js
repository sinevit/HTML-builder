const path = require('path');
// const fs = require('fs');
const fs = require('fs/promises');
// const src =  path.join(__dirname, '/files');
const dist =  path.join(__dirname, '/project-dist');


//сборщик стилей в style.css
(async function bundleStyles(src, dist ){
    try {
        //создает папку /project-dist
        const copyFolder =  await fs.mkdir( dist, { recursive: true });
        //читает папку /styles   
        const files = await fs.readdir( src, {withFileTypes: true});
        let arrStyles =[]
        //если css файл,то записывает в массив
        for (const file of files){
            if (file.isFile() && path.parse(path.join(src, file.name)).ext.slice(1) == 'css') {
                const contentFile = await fs.readFile(path.join(src, file.name), 'utf8');
                arrStyles.push(contentFile);
            }
        }
        //записывает из массива в /project-dist/style.css
        await fs.writeFile(path.join(dist, 'style.css'), arrStyles.join("\n"));
      } catch (err) {
        console.error(err);
      }
})(path.join(__dirname, '/styles'),dist);

//копирование assets
(async function copyAssetsFiles(src, dist ){
    try {
        await fs.rm(dist, { recursive: true, force: true });
        //создает папку /project-dist
        const copyFolder =  await fs.mkdir( dist, { recursive: true });
        //читает папку /assets    
        const files = await fs.readdir( src, {withFileTypes: true});
        // если файл, то копирует в соответствующую папку в /project-dist/assets, иначе рекрсивно запускает copyAssetsFiles
        for (const file of files){
            if (file.isFile()) {
                fs.copyFile(path.join(src, file.name), path.join(dist,file.name));
                console.log(`${file.name} copy`);
            }else{
                copyAssetsFiles(path.join(src,file.name), path.join(dist,file.name));
            }
        }
      } catch (err) {
        console.error(err);
      }
})(path.join(__dirname, '/assets'),path.join(dist, '/assets'));

//создание index.html
(async function bundleHTML(dist ){
    try {
        let template = await fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });

        //читает папку /components    
        const components = await fs.readdir( path.join(__dirname, 'components'), {withFileTypes: true});
        // если html файл, то считывает сдержимое файла. и заменяет в темплейт значение в {{}} на содержимое
        for (const component of components){
            if (component.isFile() && path.parse(path.join(__dirname, 'components', component.name)).ext.slice(1) == 'html') {
                const contentFile = await fs.readFile(path.join(__dirname, 'components', component.name), 'utf8');
                // console.log(component.name.slice(0,-5));
                template = template.replace(`{{${component.name.slice(0,-5)}}}`, contentFile);
            }
        }
        //записывает все в /project-dist/index.html
        await fs.writeFile(path.join(dist, 'index.html'), template);
      } catch (err) {
        console.error(err);
      }
})(dist);
