import { readFile, writeFile } from "node:fs/promises";

export async function getProductos( eliminado = true ) {
  return readFile("./data/productos.json", "utf-8")
    .then((data) => JSON.parse(data))
    .then( productos => {
      if( eliminado == true ){
        return productos.filter( p => p.eliminado != true )
      }else{
        return productos
      }
    } )
    .catch((err) => []);
}

export async function getProductoById(id) {
  return getProductos().then((productos) => {
    let producto;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        producto = productos[i];
      }
    }
    return producto;
  });
}

export function guardarProducto(producto){
  return getProductos().then( async (productos) => {
    
    const nuevoProducto = {
      id: productos.length + 1,
      ...producto
    }

    productos.push(nuevoProducto)
    
    await writeFile("./data/productos.json", JSON.stringify(productos))

    return nuevoProducto
  });
}

export function editarProducto(producto){
  return getProductos().then( async (productos) => {

    const nuevoListado = productos.filter( p => p.id != producto.id )

    nuevoListado.push(producto)
    
    await writeFile("./data/productos.json", JSON.stringify(nuevoListado))

    return producto
  });
}

export function borrarProducto(id){
  return getProductos().then( async (productos) => {

    const nuevoListado = productos.map( p => {
      if( p.id == id ){
        p.eliminado = true
      }
      return p
    } )

    await writeFile("./data/productos.json", JSON.stringify(nuevoListado))

    return id
  });
}