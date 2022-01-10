import fs from "fs";
import path from "path";
import fetch from "node-fetch";


const userPath = process.argv[2];

// Función para validar la extensión del documento 
export const file = (router) => {
  const ext = path.extname(router.toLowerCase());
  if (ext === ".md") {
    return true;
  } else {
    console.log("No es un archivo md");
  }
};

//función para leer documento  
export const readFile = (files) => {
    try{
      const data = fs.readFileSync(files, "utf8");
      return readLinks(data);
    }catch(e){
      throw new Error('Documento no válido')
    }
};

//Función para buscar y extraer los links del documento
export const readLinks = (file) => {
  const lines = file.split("\n"); //separa en lineas el documento
  let arrayLinks = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
    const links = line.matchAll(regularEx);
    const match = regularEx.test(line);
    if (match) {
      for (const link of links) {
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
};

//Función para validar links
export const validateLinks = (links) => {
  const validate = links.map((link) =>
    fetch(link.href).then((response) => {
      return {
        text: link.text,
        href: link.href,
        file: link.file,
        line: link.line,
        status: response.status,
        statusText: response.statusText,
      };
    })
  );
  return Promise.all(validate);
};

//Función bigboss
export const mdLinks = (files, option) => {
  return new Promise((resolve, reject) => {
    const links = readFile(files);
    if (option.validate) {
      resolve(validateLinks(links));
    } else {
      resolve(links);
    }
    reject(new TypeError('error'));
  });
};


