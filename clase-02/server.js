const http = require("http")

const usuarios = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Perez"
    },
    {
        id: 2,
        nombre: "Pepe",
        apellido: "Perez"
    },
    {
        id: 3,
        nombre: "Juan",
        apellido: "Gonzalez"
    }        
]

const server = http.createServer( function(request, response){
    console.log("Route que me envio el cliente: ", request.url)
    response.write("<h1>Mi pagina</h1>")
    switch( request.url ){
        case "/":
            response.write("Hola bienvenido")
            response.write("Hola bienvenido")
            break
        case "/usuarios":
            // response.write("<ul>")
            // usuarios.forEach( usuario => {
            //     response.write(`<li>${usuario.id}-${usuario.nombre}-${usuario.apellido}</li>`)
            // } )
            // response.write("</ul>")
            response.write(`<table>
                                <tr>
                                    <th>id</th>
                                    <th>nombre</th>
                                    <th>apellido</th>
                                </tr>
                `)
            usuarios.forEach( usuario => {
                response.write(`<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                    </tr>`)
            } )
            response.write("</table>")
            response.end("Listado usuarios")
            break
        default:
            response.end("No se encontro la ruta")
            break    
    }
} )

server.listen( 2025, () => {
    console.log("Funcionando!...")
} )