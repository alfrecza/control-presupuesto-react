import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltrados}) => {


    return(
        <div className="listado-gastos contenedor">
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>

            {gastosFiltrados.length > 0 ? 
                gastosFiltrados.map(gasto => (
                    <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
                ))
             : 
                gastos.map(gasto => (
                    <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
                ))
            }

            
        </div>
    )
}

export default ListadoGastos