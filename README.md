# Markdown Links

## mrg-md-Links
Es una librería que esta desarrollada para leer documentos con extensión '.md' y nos permite validar URL o links entregándonos información y sus estados, ejemplo(404, Not Found). 

### Instalación
ejemplo npm ...

### Guía de uso

#### En Archivo Js
se debe importar .... const eje = require('hola')

#### En la Terminal
md.links index.js --validate

### CLI (Command Line Interface - Interfaz de Línea de Comando)
El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

### Planificación

 * Diagrama de Flujo en Miro. 

![diagrama de flujo](imagenes/diagramadeflujo.png)

* GitHub Proyects utilizando issues y milestones. 

[Md-links Proyect](https://github.com/MacarenaRivera/SCL018-md-links/projects/1)
