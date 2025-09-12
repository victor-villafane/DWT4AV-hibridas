import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"

const router = express.Router()
//https://www.mongodb.com/try/download/compass
router.get("/", controllers.getProductos)           //endpoint
router.get("/:id", controllers.getProductoById)
router.post("/", controllers.createProduct)
router.delete("/:id", controllers.deleteProduct)
router.put("/:id", controllers.reemplazarProduct)
router.patch("/:id", controllers.actualizarProduct)

export default router