import { call } from "./api.services"

export function getProductos() {
    return call({uri: 'productos'})
}

export function getProductoById(id) {
    return call({uri: 'productos/' + id})
}

export function createProduct(producto){
    return call( {uri: 'productos', method: 'POST', body: producto} )
}

export function editProduct(id, producto){
    return call( {uri: 'productos/' + id, method: 'PUT', body: producto} )
}

export function deleteProduct(id){
    return call({uri: 'productos/' + id, method: 'DELETE'})
}