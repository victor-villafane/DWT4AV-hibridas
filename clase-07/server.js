import express from "express";
import ProductosRoute from "./routes/productos.routes.js"
const app = express();

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )
app.use(ProductosRoute)

app.listen(2025, () => console.log("funcionando"));
