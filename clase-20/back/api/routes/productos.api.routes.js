import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"
import { validateProducto } from "../../middlewares/producto.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()
//https://www.mongodb.com/try/download/compass
router.get("/",[validateToken], controllers.getProductos)           //endpoint
router.get("/:id/recomendaciones", [validateToken], controllers.getRecomendaciones)
router.get("/:id",[validateToken], controllers.getProductoById)
router.post("/",[validateProducto, validateToken], controllers.createProduct)
router.delete("/:id",[validateToken], controllers.deleteProduct)
router.put("/:id", [validateToken],controllers.reemplazarProduct)
router.patch("/:id", [validateToken],controllers.actualizarProduct)

export default router