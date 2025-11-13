import { Activity, useState } from "react"
import { Link, useParams } from "react-router"
import { restablecerContrasenia } from "../services/auth.services"

const RestablecerContrasenia = () => {
    const [ pass, setPass ] = useState()
    const [success, setSuccess] = useState(false)
    const params = useParams()
    const email = params.email

    const handleRestablecer = () => {
        restablecerContrasenia(email, pass)
            .then( async(res) => {
                if( !res.ok ) throw await res.json()
                setSuccess(true)
            } )
            .catch( err => console.error(err) )
    }
    
    return (
        <div>
            <Activity mode={ success ? 'visible' : 'hidden' } >
                <p>Contraseña cambiada exitosamente</p>
                <Link to="/login" >login</Link>
            </Activity>
            <h2>Ingresar nueva contraseña</h2>
            <input type="text" onChange={ (e) => setPass(e.target.value) } />
            <button onClick={handleRestablecer} >Restablecer</button>
        </div>
    )
}

export default RestablecerContrasenia