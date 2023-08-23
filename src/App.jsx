import { useState, useEffect } from "react"
import Header from "./components/Header"
import Filtros from "./components/Filtros"
import ListadoGastos from "./components/ListadoGastos"
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from "./components/Modal"

const App = () => {
  const [presupuesto, setPresupuesto] = useState(JSON.parse(localStorage.getItem('presupuesto')))
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [])

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(presupuesto) {
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    if(Object.values(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [gastoEditar])

  useEffect(() => {
    if(filtro) {
      const gastosActualizados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosActualizados)
      return
    }

    setGastosFiltrados([])
  }, [filtro])

  const handleModal = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  const guardarGasto = gasto => {

    setGastos([...gastos, gasto])
  }

  const editarGasto = gasto => {
    const gastosActualizados = gastos.map(gastoState => {
      if(gastoState.id === gasto.id) {
        return gasto
      } else {
        return gastoState
      }
    })

    setGastos(gastosActualizados)
  }

  const eliminarGasto = gasto => {
    const gastosActualizados = gastos.filter(gastoState => gastoState.id !== gasto.id)
    setGastos(gastosActualizados)
  }

  const resetearApp = () => {
    const confirmacion = confirm('Estas seguro de que desear resetear la aplicacion? ')
    

    setPresupuesto(0)
    setIsValidPresupuesto(false)
    setGastos([])
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        resetearApp={resetearApp}
      />

      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} editarGasto={editarGasto} setGastoEditar={setGastoEditar}/>}

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro}/>
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados}/>
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleModal}/>
          </div>
        </>
      )}
      
    </div>
  )
}

export default App