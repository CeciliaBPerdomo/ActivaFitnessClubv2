import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


function VentasPendientes() {
    const { store, actions } = useContext(Context);
    const [ventasPendientesPago, setVentasPendientesPago] = useState([])

    useEffect(() => {
        ventasPendientes()
    }, [])

    const ventasPendientes = async () => {
        await actions.obtenerVentas()
        let pendientes = []
        store.ventas.map((item, id) => {
            if (!item.fechapago) {
                pendientes = [...pendientes, item]
            }
        })

        setVentasPendientesPago(pendientes)

    }



    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Ventas pendientes de pago</h3>
            <hr />
            <br />

            <div>
                {store.ventas.msg == "No hay ventas realizadas" ?
                    <p>No hay ventas realizadas aún.</p> :
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">
                                    Fecha de venta
                                    {/* <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarVentasFechaAsc()}
                                    >
                                        ↑
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarVentasFechaDesc()}
                                    >
                                        ↓
                                    </button> */}
                                </th>
                                <th scope="col" className="text-center">Alumno</th>
                                <th scope="col" className="text-center">Producto
                                </th>
                                <th scope="col" className="text-center">Cantidad</th>
                                <th scope="col" className="text-center">Precio unitario</th>
                                <th scope="col" className="text-center">Total</th>
                                {/* <th scope="col">Pago</th> */}
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasPendientesPago.map((item, id) => (
                                <tr key={id}>
                                    <td className="align-middle">{item.fechacompra.slice(5, 16)}</td>
                                    <td className="align-middle text-center">{item.nombreUsuario}</td>
                                    <td className="align-middle text-center">{item.nombreProducto}</td>
                                    <td className="text-center align-middle">{item.cantidad}</td>
                                    <td className="text-center align-middle">$ {item.preciounitario}</td>
                                    <td className="text-center align-middle">$ {item.preciounitario * item.cantidad}</td>
                                    {/* <td className="align-middle">{item.TipoMetodo}</td> */}
                                    <td className="align-middle">
                                        <Link to={"/detalleVenta/" + item.idVenta} style={{ color: "white" }}>
                                            <i className="fa fa-eye"></i>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={"/modificarVenta/" + item.idVenta} style={{ color: "white" }}>
                                            <i className="fa fa-pen"></i>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <i className="fa fa-trash"
                                            onClick={(e) => borrar(e, item.idVenta)}
                                        >
                                        </i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>

            <ToastContainer />

        </div>
    )
}

export default VentasPendientes