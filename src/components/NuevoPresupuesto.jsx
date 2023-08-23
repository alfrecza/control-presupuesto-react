import React, { useState } from 'react'
import Mensaje from './Mensaje'


const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState(false)

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if(isNaN(presupuesto) || presupuesto <= 0 ) {
            setMensaje('El presupuesto ingresado no es válido')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        setMensaje('')
        setIsValidPresupuesto(true)
        localStorage.setItem('presupuesto', JSON.stringify(presupuesto))
        
    }


    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form className='formulario' onSubmit={handlePresupuesto}>
                <div className='campo'>
                    <label htmlFor="">Definir Presupuesto</label>
                    <input type="number" className='nuevo-presupuesto' placeholder='Añade tu presupuesto' value={presupuesto} onChange={(e) => setPresupuesto(Number(e.target.value))}/>
                </div>

                <input type="submit" value="Añadir"/>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto