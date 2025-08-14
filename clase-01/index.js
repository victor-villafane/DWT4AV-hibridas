const http = require("http")    //commonjs
//import http from "http"    

http.createServer( function(request, response){
    console.log("Hola desde el servidor!", request.url)
    response.end("llego la solicitud")
} ).listen(2025)
