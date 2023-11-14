import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function ModificarVenta() {
    const { store, actions } = useContext(Context)
    const params = useParams();

    const [fechaCompra, setFechaCompra] = useState(store.venta[0]?.fechacompra)
    const [fechaPago, setFechaPago] = useState(store.venta[0]?.fechapago)
    const [precio, setPrecio] = useState(store.venta[0]?.preciounitario)
    const [idUsuario, setIdUsuario] = useState(store.venta[0]?.idUsuario)
    const [idProducto, setIdProducto] = useState(store.venta[0]?.idProducto)
    const [cantidad, setCantidad] = useState(store.venta[0]?.cantidad)
    const [idMetodo, setIdMetodo] = useState(store.venta[0]?.idMetodo)
    const [observaciones, setObservaciones] = useState(store.venta[0]?.observaciones)

    useEffect(() => {
        // Venta a modificar
        actions.obtenerVentaId(params.theid)
        // Productos disponibles
        actions.obtenerProductos()

        // Forma de pagos
        actions.obtenerMetodos()

        // Alumnos 
        actions.obtenerAlumnos();
    }, []);

    // Modifica la informacion
    const modificar = async (e) => {
        e.preventDefault();
        let id = parseInt(params.theid)

        // modificarVenta: async                    (id, fechaCompra, cantidad, precioUnitario, observaciones, fechaPago, idProducto, idUsuario, idMetodo)
        let resultado = await actions.modificarVenta(id, fechaCompra, cantidad, precio, observaciones, fechaPago, idProducto, idUsuario, idMetodo)
        if (resultado === true) {
            toast.success("💪 Modificado con éxito", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error("No se puede modificar", {
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
    }

    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Modificar venta</h3>
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
                            type="text"
                            className="form-control"
                            placeholder="Fecha de compra"
                            value={store.venta[0]?.fechacompra.slice(5,16)}
                            onChange={(e) => setFechaCompra(e.target.value)}
                        />
                    </div>

                    {/* Alumno */}
                    <div className="col">
                        <label htmlFor="alumno" style={{ marginBottom: "10px" }}>
                            Alumno <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <select className="form-select" aria-label="Default select example"
                            value={idUsuario}
                            onChange={(e) => setIdUsuario(e.target.value)}>
                            <option selected>{store.venta[0]?.nombreUsuario}</option>
                            {store.alumnos.map((item, id) => (
                                <option key={id} value={item.id}>{item.nombre} {item.apellido}</option>
                            ))}
                        </select>
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
                            <option selected>{store.venta[0]?.nombreProducto}</option>
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
                            defaultValue={store.venta[0]?.preciounitario}
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
                            defaultValue={store.venta[0]?.cantidad}
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
                            <option selected>{store.venta[0]?.TipoMetodo}</option>
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
                            type="text"
                            className="form-control"
                            placeholder="Fecha de pago"
                            value={store.venta[0]?.fechapago.slice(5,16)}
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
                            defaultValue={store.venta[0]?.observaciones}
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
                            onClick={(e) => modificar(e)}
                        >
                            Modificar venta
                        </button>
                    </div>
                </div>

            </form>
            <ToastContainer />
        </div>
    )
}

export default ModificarVenta