import { file, mdLinks } from '../index.js';


describe('file', () => {
  it("debería retornar un objeto", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Object);
  });
});


describe('mdLinks', () => {
  it("debería retornar una promesa", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});



