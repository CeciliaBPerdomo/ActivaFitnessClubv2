import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function IngresarVentaPorAlumno() {
    const { store, actions } = useContext(Context)
    const params = useParams();

    const [fechaCompra, setFechaCompra] = useState("")
    const [fechaPago, setFechaPago] = useState("")
    const [precio, setPrecio] = useState("")
    const [idUsuario, setIdUsuario] = useState(store.alumno[0]?.id)
    const [idProducto, setIdProducto] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [idMetodo, setIdMetodo] = useState("")
    const [observaciones, setObservaciones] = useState("")

    useEffect(() => {
        // Productos disponibles
        actions.obtenerProductos()

        // Forma de pagos
        actions.obtenerMetodos()

        // Alumnos 
        actions.obtenerAlumnoId(parseInt(params.theid))
    }, []);

    // Guarda la venta
    const guardar = async (e) => {
        e.preventDefault()

        function mensaje(texto) {
            toast.error(texto, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        let fechaP
        if (fechaPago == ""){
            fechaP = null
        } else {
            fechaP = fechaPago
        }
        
        
        if (fechaCompra != "" && idUsuario != "" && precio != "" && idProducto != ""  && cantidad != "" && idMetodo != "") {

            let resultado = await actions.crearVentas(fechaCompra, cantidad, precio, observaciones, fechaP, idProducto, store.alumno[0]?.id, idMetodo)
            let results = await actions.actualizarCantidadProducto(idProducto, cantidad, "Venta")

            if (resultado === true && results === true) {
                toast.success("💪 Guardado con éxito", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                /* Limpiar el formulario */
                setFechaCompra("");
                setPrecio("");
                setIdProducto("")
                setIdProveedor("")
                setIdMetodo("")
                setCantidad("")
                setObservaciones("")

            } else {
                toast.error("🖐️ No se pudo guardar", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

            // Chequea los datos que faltan y avisa, soy la mejor, lo se
        } else {
            if (!fechaCompra) {
                mensaje("🖐️ Falta fecha de venta")
            }

            if (!idUsuario) {
                mensaje("🖐️ Falta seleccionar el alumno")
            }

            if (!idProducto) {
                mensaje("🖐️ Falta seleccionar el producto")
            }

            if (!precio) {
                mensaje("🖐️ Falta precio de venta")
            }

            if (!cantidad) {
                mensaje("🖐️ Falta la cantidad comprada")
            }

            if (!idMetodo) {
                mensaje("🖐️ Falta seleccionar el metodo de pago")
            }
        }
    }

  return (
    <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Ingresar venta</h3>
            <hr />
            <br />

            <form>
                <div className="row" >
                    {/* Fecha de compra */}
                    <div className="col">
                        <label htmlFor="fecha_de_compra" style={{ marginBottom: "10px" }}>
                            Fecha <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Fecha de compra"
                            value={fechaCompra}
                            onChange={(e) => setFechaCompra(e.target.value)}
                        />
                    </div>

                    {/* Alumno */}
                    <div className="col">
                        <label htmlFor="alumno" style={{ marginBottom: "10px" }}>
                            Alumno <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Alumno"
                            value={store.alumno[0]?.nombre + " " + store.alumno[0]?.apellido}
                        />
                    </div>

                    {/* Producto */}
                    <div className="col">
                        <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                            Producto <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <select className="form-select"
                            value={idProducto}
                            onChange={(e) => setIdProducto(e.target.value)}
                        >
                            <option selected>Producto</option>
                            {store.productos.map((item, id) => (
                                <option key={id} value={item.id}>{item.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <br />
                <div className="row">
                    {/* Precio de venta */}
                    <div className="col">
                        <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                            Precio unitario <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Precio unitario de venta"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>

                    {/* Cantidad */}
                    <div className="col">
                        <label htmlFor="cantidad" style={{ marginBottom: "10px" }}>
                            Cantidad <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad comprada"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                    </div>

                    {/* Metodo de pago */}
                    <div className="col" style={{ marginBottom: "10px" }}>
                        <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                            Método de pago <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <select className="form-select"
                            value={idMetodo}
                            onChange={(e) => setIdMetodo(e.target.value)}
                        >
                            <option selected>Método de pago</option>
                            {store.metodos.map((item, id) => (
                                <option key={id} value={item.id}>{item.tipo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <br />
                <div className="row">
                    {/* Fecha de pago */}
                    <div className="col">
                        <label htmlFor="fecha_de_compra" style={{ marginBottom: "10px" }}>
                            Fecha de pago:
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Fecha de pago"
                            value={fechaPago}
                            onChange={(e) => setFechaPago(e.target.value)}
                        />
                    </div>

                    {/* Observaciones */}
                    <div className="col">
                        <label htmlFor="observaciones" style={{ marginBottom: "10px" }}>
                            Observaciones:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones / comentarios"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                        />
                    </div>
                </div>

                <br />
                {/* Guardar */}
                <div className="row">
                    <div style={{ marginTop: "15px" }}>
                        <button
                            type="submit"
                            className="btn btn-outline-danger float-end"
                            onClick={(e) => guardar(e)}
                        >
                            Guardar venta
                        </button>
                    </div>
                </div>

            </form>
            <ToastContainer />
        </div>
  )
}

export default IngresarVentaPorAlumno