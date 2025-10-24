import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.y5swe9e.mongodb.net/")
const db = client.db("hibridas")

export async function createUser(usuario){
    await client.connect()
    const existe = await db.collection("usuarios").findOne({email: usuario.email})
    if( existe ) throw new Error("No se pudo registrar el usuario")

    const nuevoUsuario = { ...usuario, password: null, passwordConfirm: null }

    nuevoUsuario.password = await bcrypt.hash(usuario.password, 10)

    await db.collection("usuarios").insertOne(nuevoUsuario)

    return {...nuevoUsuario, password: undefined}
}

export async function login(usuario){
    await client.connect()
    const existe = await db.collection("usuarios").findOne({email: usuario.email})
    if( !existe ) throw new Error("No se pudo ingresar")
    
    return { ...existe, password: undefined, passwordConfirm: undefined }
}