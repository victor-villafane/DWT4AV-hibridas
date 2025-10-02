import React, { useState } from 'react'

const SpanText = () => {
    const [click, setClick] = useState(false)
    const handleClick = (nombre) => {
        // console.log(nombre)
        setClick(!click)
    }
    return (
        <>
            <span style={click ? { color: 'red' } : { color: 'blue' }} onClick={ handleClick } >
                Homero
            </span>
            <br></br>
        </>
    )
}

export default SpanText