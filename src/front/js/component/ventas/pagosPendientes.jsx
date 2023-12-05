import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function PagosPendientes() {
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

        // Forma de pagos
        actions.obtenerMetodos()
    }, []);


    // Modifica la informacion
    const modificar = async (e) => {
        e.preventDefault();
        let id = parseInt(params.theid)



        if (!fechaPago) {
            toast.error("Debe ingresar la fecha de pago", {
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

        if (!idMetodo) {
            toast.error("Debe ingresar el método de pago", {
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

        if (fechaPago && idMetodo) {

            let resultado = await actions.modificarVenta(id, fechaCompra, cantidad, precio, observaciones, fechaPago, idProducto, idUsuario, idMetodo)
            if (resultado === true) {
                toast.success("💪 Deuda cancelada", {
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
    }


    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Cancelación de venta pendiente</h3>
            <hr />
            <br />

            <div className="row">
                <div className="col">Alumno: <b>{store.venta[0]?.nombreUsuario}</b></div>
                <div className="col">Fecha de compra: <b>{store.venta[0]?.fechacompra.slice(5, 16)}</b></div>
                <div className="col">Producto: <b>{store.venta[0]?.nombreProducto}</b></div>
            </div>

            <br />

            <div className="border border-danger rounded border-2" style={{ padding: "15px" }}>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="inputPassword6" className="col-form-label">Fecha de pago:</label>
                    </div>
                    <div className="col-3">
                        <input type="date"
                            id="inputPassword6"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            placeholder="Fecha de pago"
                            value={fechaPago}
                            onChange={(e) => setFechaPago(e.target.value)} />
                    </div>

                </div>

                <br />
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="inputPassword6" className="col-form-label">Método de pago:</label>
                    </div>
                    <div className="col-3">
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

                    <div className="col-2">
                        <button className="btn btn-outline-danger float-end" onClick={modificar}>Cancelar deuda</button>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default PagosPendientes