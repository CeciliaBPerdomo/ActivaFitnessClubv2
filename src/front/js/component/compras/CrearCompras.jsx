import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CrearCompras() {
    const { store, actions } = useContext(Context)

    const [fechaCompra, setFechaCompra] = useState("")
    const [precio, setPrecio] = useState("")
    const [idProducto, setIdProducto] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [idProveedor, setIdProveedor] = useState("")
    const [idMetodo, setIdMetodo] = useState("")
    const [observaciones, setObservaciones] = useState("")

    useEffect(() => {
        actions.obtenerProductos()
        actions.obtenerProveedores()
        actions.obtenerMetodos()
    }, []);

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

        if (fechaCompra != "" && precio != "" && idProducto != "" && idProveedor != "" && cantidad != "" && idMetodo != "") {

            let resultado = await actions.crearCompras(precio, fechaCompra, cantidad, observaciones, idProducto, idProveedor, idMetodo)
            let results = await actions.actualizarCantidadProducto(idProducto, cantidad, "Compra")

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
                toast.error("No se pudo guardar", {
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
                mensaje("Falta fecha de compra")
            }

            if (!precio) {
                mensaje("Falta precio de compra")
            }

            if (!idProducto) {
                mensaje("Falta seleccionar el producto")
            }

            if (!cantidad) {
                mensaje("Falta la cantidad comprada")
            }

            if (!idProveedor) {
                mensaje("Falta seleccionar el proveedor")
            }

            if (!idMetodo) {
                mensaje("Falta seleccionar el metodo de pago")
            }
        }
    }

    return (
        <div className="container">

            <h3 style={{ marginBottom: "25px" }}>
                Nueva compra
            </h3>
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

                    {/* Precio de compra */}
                    <div className="col">
                        <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                            Precio <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Precio de compra"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>
                </div>

                <br />
                <div className="row">
                    {/* Cantidad de compra */}
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

                    {/* Proveedor */}
                    <div className="col" style={{ marginBottom: "10px" }}>
                        <label htmlFor="proveedor" style={{ marginBottom: "10px" }}>
                            Proveedor <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <select className="form-select"
                            value={idProveedor}
                            onChange={(e) => setIdProveedor(e.target.value)}
                        >
                            <option selected>Proveedor</option>
                            {store.proveedores.map((item, id) => (
                                <option key={id} value={item.id}>{item.nombre}</option>
                            ))}
                        </select>
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
                            Guardar nueva compra
                        </button>
                    </div>
                </div>
            </form>
            <br />


            <ToastContainer />
        </div>
    )
}

export default CrearCompras