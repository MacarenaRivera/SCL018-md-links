import { file, readFile, readLinks, validateLinks, mdLinks } from "../index.js";
const path = 'test/test2.md'
const option = '--validate';


describe("file", () => {
  it("debería retornar true", () => {
    const result = file(path);
    expect(result).toBeTruthy()
  });
  it("debería retornar false", () => {
    const result = file('hola');
    expect(result).toBeFalsy()
  });
});

describe("readFile", () => {
  it("debería retornar un arrego de objetos", () => { 
   const result = [
    {
      text: 'Sitio oficial de GitHub Pages', 
      href: 'https://pages.github.com/',     
      file: '--coverage',
      line: 2
    },
    {
      text: 'Pixar',
      href: 'https://www.pixar.com/error404',
      file: '--coverage',
      line: 4
    }
  ]
   expect(readFile(path)).toEqual(result);
  });
  it("debería arrojar error", () => {
    expect(() => {
      readFile();
    }).toThrow();
  });
});

describe("readLinks", () => {
  it("debería retornar un arreglo", () => {
    const result = readLinks(path);
    expect(result).toBeInstanceOf(Array);
  });
});

describe("validateLinks", () => {
  it('debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
 });
});

describe("mdLinks", () => {
  it("debería retornar una promesa", () => {
    return mdLinks(path, option).then(res => {
      expect(res).toBeInstanceOf(Array);
    });
  });
});
