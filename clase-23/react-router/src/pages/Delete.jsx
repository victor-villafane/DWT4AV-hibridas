import { Link, useNavigate, useParams } from "react-router"
import { useProducto } from "../hooks/useProductos"
import { deleteProduct } from "../services/productos.services"

const Delete = () => {
    const params = useParams()
    const navigate = useNavigate()

    const id = params.id
    const { producto, error, loading } = useProducto(id)

    if( error ) return <div>{error}</div>
    if( loading ) return <div>Cargando..</div>

    const handleDelete = () => {
        deleteProduct(id)
            .then( (res) => {
                if( !res.ok ) return res.json()
                navigate("/listado")
            } )
            .catch( (err) => console.error(err) )
            
    }

    return <div>
        <h2>Estas seguro que quieres eliminar {producto.modelo}</h2>
        <button onClick={handleDelete} >Si</button>
        <br />
        <Link to="/listado" >No</Link>
    </div>
}

export default Delete