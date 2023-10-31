import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModificarCompra() {
    const { store, actions } = useContext(Context)
    const params = useParams();

    const [fechaCompra, setFechaCompra] = useState(store.compra[0]?.fecha)
    const [precio, setPrecio] = useState(store.compra[0]?.preciocompra)
    const [idProducto, setIdProducto] = useState(store.compra[0]?.idProducto)
    const [cantidad, setCantidad] = useState(store.compra[0]?.cantidad)
    const [idProveedor, setIdProveedor] = useState(store.compra[0]?.idProveedor)
    const [idMetodo, setIdMetodo] = useState(store.compra[0]?.idMetodo)
    const [observaciones, setObservaciones] = useState(store.compra[0]?.observaciones)


    useEffect(() => {
        actions.obtenerCompraId(parseInt(params.theid));

        actions.obtenerProductos()
        actions.obtenerProveedores()
        actions.obtenerMetodos()
    }, []);

    const modificar = async (e) => {
        e.preventDefault();
        let id = parseInt(params.theid)

        let resultado = await actions.modificarCompra(id, precio, fechaCompra, cantidad, observaciones, idProducto, idProveedor, idMetodo)
        if (resultado === true) {
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

            <h3 style={{ marginBottom: "25px" }}>
                Modificar información de compra
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
                            defaultValue={store.compra[0]?.fecha}
                            onChange={(e) => setFechaCompra(e.target.value)}
                        />
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
                            defaultValue={store.compra[0]?.preciocompra}
                            onChange={(e) => setPrecio(e.target.value)}
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
                            <option selected>{store.compra[0]?.nombreProducto}</option>
                            {store.productos.map((item, id) => (
                                <option key={id} value={item.id}>{item.nombre}</option>
                            ))}
                        </select>
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
                            defaultValue={store.compra[0]?.cantidad}
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
                            <option selected>{store.compra[0]?.nombreProveedor}</option>
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
                            <option selected>{store.compra[0]?.TipoMetodo}</option>
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
                            defaultValue={store.compra[0]?.observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                        />
                    </div>
                </div>

                <br />
                {/* Modificar */}
                <div className="row">
                    <div style={{ marginTop: "15px" }}>
                        <button
                            type="submit"
                            className="btn btn-outline-danger float-end"
                            onClick={(e) => modificar(e)}
                        >
                            Modificar compra
                        </button>
                    </div>
                </div>
            </form>
            <br />


            <ToastContainer />
        </div>
    )
}

export default ModificarCompra