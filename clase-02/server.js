const http = require("http")

const cafes = [
    {
        id: 1,
        nombre: "Café Expreso",
        precio: 200
    },
    {
        id: 2,
        nombre: "Café Americano",
        precio: "250"
    },
    {
        id: 3,
        nombre: "Café Americano",
        precio: 300
    }
]

const server = http.createServer(function (request, response) {
    response.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head>
<body>`)
    response.write("<h1>Mi espectacular página web!</h1>")
    switch (request.url) {
        case "/":
            response.write("Nombre y apellido")
            break
        case "/materia":
            response.write("Aplicaciones hibridas")
            break
        case "/profesor":
            response.write( "ññ" )
            break
        case "/cafes":
            response.write("<ul>")
            cafes.forEach( cafe => response.write( `<li>${cafe.id} - ${cafe.nombre} - ${cafe.precio}</li>` ) )
            response.write("</ul>")
            break
        default:
            response.write("No se encontro la ruta")
            break
    }
    response.end("</body></html>")
})

server.listen(2025, () => {
    console.log("Funcionando!...")
})