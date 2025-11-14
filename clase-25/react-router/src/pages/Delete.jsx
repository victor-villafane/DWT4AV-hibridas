import { Link, useNavigate, useParams } from "react-router"
import { useProducto } from "../hooks/useProductos"
import { deleteProduct } from "../services/productos.services"

const Delete = () => {
    const params = useParams()
    const navigate = useNavigate()

    const id = params.id
    const { producto, error, loading } = useProducto(id)

    if (error) return <div>{error}</div>
    if (loading) return <div>Cargando..</div>

    const handleDelete = () => {
        deleteProduct(id)
            .then((res) => {
                if (!res.ok) return res.json()
                navigate("/listado")
            })
            .catch((err) => console.error(err))

    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full" >
                <div className="flex flex-col items-center text-center" >
                    <h2 className="text-2xl font-bold text-slate-800 mb-2" >
                        Estas seguro que quieres eliminar {" "}
                        <span className="font-semibold text-slate-800" >
                            {producto.modelo}
                        </span>
                        ?
                    </h2>
                    <div className="flex gap-3 w-full" >
                        <Link className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-2xl transition-colors duration-200" to="/listado" >No</Link>
                        <button className="flex-1 px-6 py-3 bg-red-200 hover:bg-red-300 rounded-2xl transition-colors duration-200" onClick={handleDelete} >Si</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete