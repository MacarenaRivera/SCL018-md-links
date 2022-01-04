import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import Yargs from 'yargs';



const userPath = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;
const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;

// Función para validar la extensión del documento - retorna un objeto
export const file = (router)=>{
    const ext = path.extname(router);
    if(ext === '.md'){
        return readFile(router);
    }else{ console.log('No es un archivo md')}
}

//función para leer documento
export const readFile = (files)=>{
    try{
        if(fs.existsSync(files)){
        const data = fs.readFileSync(files, 'utf8')
        
        return readLinks(data)
    };
        
    }catch(err){
        console.log(err)
    }
}

//Función para leer y extraer links
export const readLinks =(file) =>{
    const lines = file.split('\n'); //separa en lineas el documento
    let arrayLinks = [];
    for(let i = 0; i < lines.length; i++){
        const line = lines[i];
        const links = line.matchAll(regularEx);
        const match = regularEx.test(line);
        if(match){
            for(const link of links){
                const data = {
                    text: link[1],
                    href: link[2],
                    file: userPath,
                    line: i + 1,  
                };
                arrayLinks.push(data);
            }
        }
    }
    return arrayLinks;
}

//Función para validar y ver status de links
export const validateLinks = (links)=>{
    const validate = links.map((link)=>
        fetch(link.href).then((response)=>{
            return{
                text: link.text,
                href: link.href,
                file: link.file,
                line: link.line,
                status: response.status,
                statusText: response.statusText,
            }
        })
    )
    return Promise.all(validate);
};

//Función bigboss
export const mdLinks = (router)=>{
    return new Promise((resolve, reject)=>{
        const links = file(router);
        if(option.validate){
            resolve(validateLinks(links));
        }else{
            resolve(links);
        }
        reject();
        
    })
}

mdLinks(userPath).then((results)=> console.table(results));



