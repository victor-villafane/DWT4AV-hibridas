import React from 'react'
import Layout from './Layout'

const ListadoPersonajes = ({ listado, titulo, ...res }) => {
    
    // return (
    //     <Layout>
    //         <div {...res} >
    //             <h1>{titulo}</h1>
    //             {
    //                 listado.map( personaje => <p key={personaje.id} >{personaje.nombre}</p> )
    //             }
    //         </div>
    //     </Layout>
    // )
    return (
        <Layout components={
            <div {...res} >
                <h1>{titulo}</h1>
                {
                    listado.map( personaje => <p key={personaje.id} >{personaje.nombre}</p> )
                }
            </div>
        } className="text-color" style={{}} />
    )    
}

export default ListadoPersonajes