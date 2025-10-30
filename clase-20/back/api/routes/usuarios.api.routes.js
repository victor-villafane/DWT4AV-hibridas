import express from "express"
import * as controllers from "../controllers/usuarios.api.controller.js"
import { validateUsuarios, validateLogin } from "../../middlewares/usuarios.validate.js"

const router = express.Router()

router.post("/",[validateUsuarios], controllers.createUser)
router.post("/login",[validateLogin], controllers.login)


export default router