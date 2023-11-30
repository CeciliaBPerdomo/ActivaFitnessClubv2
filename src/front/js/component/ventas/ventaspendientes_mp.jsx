import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function Ventaspendientes_mp() {
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
        <div>
        {store.ventas.msg == "No hay ventas realizadas" ?
            <p>No hay ventas realizadas aún.</p> :
            <table className="table" style={{ color: "white" }}>
                <thead>
                    <tr>
                        <th scope="col">
                            Fecha de venta
                        </th>
                        <th scope="col" className="text-center">Alumno</th>
                        <th scope="col" className="text-center">Producto
                        </th>
                        <th scope="col" className="text-center">Cantidad</th>
                        <th scope="col" className="text-center">Total</th>
                        <th scope="col" className="text-center"></th>

                    </tr>
                </thead>
                <tbody>
                    {ventasPendientesPago.map((item, id) => (
                        <tr key={id}>
                            <td className="align-middle">{item.fechacompra.slice(5, 16)}</td>
                            <td className="align-middle text-center">{item.nombreUsuario}</td>
                            <td className="align-middle text-center">{item.nombreProducto}</td>
                            <td className="text-center align-middle">{item.cantidad}</td>
                            <td className="text-center align-middle">$ {item.preciounitario * item.cantidad}</td>
                            <td className="text-center align-middle"><i className="fa fa-pen"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }

    </div>
    )
}

export default Ventaspendientes_mp