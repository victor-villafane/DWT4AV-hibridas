import { Activity, useState } from "react"
import { recuperarCuenta } from "../services/auth.services"

const RecuperarCueta = () => {
    const [email, setEmail] = useState()
    const [ success, setSuccess ] = useState(false)
    const handleRecuperar = () => {
        recuperarCuenta(email)
            .then( async(res) => {
                if( !res.ok ) throw await res.json()
                return res.json() 
            } )
            .then( (data) => setSuccess(true) )
            .catch( err => console.error(err) )
    }

    return (
        <div>
            <Activity mode={success ? 'visible' : 'hidden'}>
                <p>Link de recuperacion enviado correctamente.</p>
            </Activity>
            <input type="text" onChange={ (e) => setEmail(e.target.value)  } />
            <button onClick={handleRecuperar} >Recuperar</button>
        </div>
    )
}
export default RecuperarCueta