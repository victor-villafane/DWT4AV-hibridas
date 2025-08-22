// const http = require("http")
import http from "http"
// const cafes = require("./data/productos.js")
import cafes from "./data/productos.js"
// const pages = require( "./pages/utils.js" )
import { createPage, createProductList } from "./pages/utils.js"
import { readFile } from "fs"

const server = http.createServer(function (request, response) {

    console.log(request.url)

    switch (request.url) {
        case "/":
            response.write(createPage("Home", "Nombre y apellido"))
            response.end()
            break
        case "/materia":
            response.write(createPage("Materia", "Aplicaciones hibridas"))
            response.end()
            break
        case "/profesor":
            response.write(createPage("Profesor", "ññ"))
            response.end()
            break
        case "/cafes":
            response.write(createPage("Listado de cafes", createProductList(cafes)))
            response.end()
            break
        case "/index.html":
            readFile("public/index.html", function (err, data) {
                if (err) console.error("No se encontro el archivo o no tiene permisos")
                response.write(data)
                response.end()
            })
            break
        case "/contacto.html":
            readFile("public/contacto.html", function (err, data) {
                if (err) console.error("No se encontro el archivo o no tiene permisos")
                response.write(data)
                response.end()
            })
            break
        case "/style.css":
            readFile("public/style.css", function (err, data) {
                if (err) console.error("No se encontro el archivo o no tiene permisos")
                response.write(data)
                response.end()
            })
            break
        case "/img/1.png":
            readFile("public/img/1.png", function (err, data) {
                if (err) console.error("No se encontro el archivo o no tiene permisos")
                response.write(data)
                response.end()
            })
            break
        default:
            response.write(createPage("404", "Pagian no encontrada"))
            response.end()
            break
    }
})

server.listen(2025, () => {
    console.log("Funcionando!")
})