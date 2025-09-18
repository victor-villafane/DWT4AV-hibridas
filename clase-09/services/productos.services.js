import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.y5swe9e.mongodb.net/")
const db = client.db("hibridas")

export async function getProductos( eliminado = true ) {
  await client.connect()
  return db.collection("componentes").find().toArray()
}

export async function getProductoById(id) {
  await client.connect()
  return db.collection("componentes").findOne({ _id: new ObjectId(id) })
}

export function guardarProducto(producto){
  return db.collection("componentes").insertOne(producto)
}

export function editarProducto(producto){
  return db.collection("componentes").replaceOne({ _id: new ObjectId(id), producto })
}

export function borrarProducto(id){
  return db.collection("componentes").deleteOne({ _id: new ObjectId(id) })
}

export function actualizarProduct(producto){
  console.log("Llego a guardar", producto)
  return db.collection("componentes").updateOne({ _id: new ObjectId(id) }, { $set: producto })
}