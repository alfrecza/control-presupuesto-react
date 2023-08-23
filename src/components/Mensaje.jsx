

const Mensaje = ({children, tipo}) => {
  return (
    <p className={`alerta ${tipo}`}>{children}</p>
  )
}

export default Mensaje