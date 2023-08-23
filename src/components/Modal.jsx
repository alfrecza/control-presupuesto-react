
import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import iconCerrarBTN from '../assets/img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, editarGasto, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    
    useEffect(() => {
        if(Object.values(gastoEditar).length > 0) {
            const {nombre, cantidad, categoria} = gastoEditar

            setNombre(nombre)
            setCantidad(cantidad)
            setCategoria(categoria)
        }
    }, [gastoEditar])

    const cerrarModal = () => {
        setTimeout(() => {
            setModal(false)        
        }, 400);

        setAnimarModal(false)
    }
    
    const generarId = () => {
        const fecha = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2);

        return fecha + random
    }

    const generarFecha = () => {
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }
        const fechaFormateada = new Date().toLocaleDateString('es-ES', opciones)

        return fechaFormateada


    }

    generarFecha()

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return
        }

        if(Object.values(gastoEditar).length > 0) {
            setTimeout(() => {
                editarGasto({nombre, cantidad, categoria, id: gastoEditar.id, fecha: gastoEditar.fecha})
                setGastoEditar({})
            }, 400);
            cerrarModal()          
            return
        }

        setTimeout(() => {
            guardarGasto({nombre, cantidad, categoria, id: generarId(), fecha: generarFecha()})            
        }, 400);

        cerrarModal()
    }

    return(
        <div className="modal">
            <div className="cerrar-modal">
                <img src={iconCerrarBTN} alt="icono cerrar modal" onClick={cerrarModal}/>
            </div>

            <form action="" className={`formulario ${animarModal ? "animar" : ''}`} onSubmit={handleSubmit}>
                <legend>{Object.values(gastoEditar).length > 0 ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input type="text" id='nombre' value={nombre} placeholder='Añade el nombre del gasto' onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" value={cantidad} id='cantidad' placeholder='Añade la cantidad del gasto: Ej. 300' onChange={(e) => setCantidad(Number(e.target.value))}/>
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="tarjeta">Tarjetas</option>
                    </select>
                </div>

                <input type="submit" value={Object.values(gastoEditar).length > 0 ? 'Guardar cambios' : 'Agregar gasto'}/>
            </form>
        </div>
    )
}

export default Modal