import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

// Fecha
import moment from "moment";

// PDF
import { jsPDF } from "jspdf";
import activa from "../../../img/LogoSinFondo.png"
import autoTable from 'jspdf-autotable'


function VentasPendientes() {
    const { store, actions } = useContext(Context);
    const [ventasPendientesPago, setVentasPendientesPago] = useState([])

    const [docImprimir, setDocImprimir] = useState([])

    useEffect(() => {
        ventasPendientes()
    }, [])

    // Imprimir PDF
    const imprimir = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        let data = []           // Array de info
        let i = 50              // Renglones
        let fechaActual = moment().format('DD-MM-YYYY')

        // Agregar la imagen al PDF (X, Y, Width, Height)
        doc.addImage(activa, 'PNG', 15, 10, 16, 15);
        doc.text("Ventas pendientes de pago al: " + fechaActual, 65, 20)

        docImprimir.map((item, id) => {
            // totalDiario = (item.totalmensualidades + item.totalventas) - item.totalpagoprov
            // fecha = item.fecha.slice(5, 16)
            i = i + 10 // Contador para cantidad del renglon

            // Informacion para la tabla
            data = [...data, [
                item.fechacompra.slice(5, 16),
                item.nombreUsuario,
                item.nombreProducto,
                item.cantidad,
                "$ " + (item.preciounitario * item.cantidad),
               ]
            ]
        })

        const columns = ["Fecha de compra", "Alumno", "Producto", "Cantidad", "Total"]

        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: { halign: 'center' }, // Centra los titulos
            bodyStyles: { halign: "center" }, // Centra la info de la tabla

            head: [columns],
            body: data
        })

        doc.save("ventaspendientes_" + fechaActual + "_.pdf");
    }


    const ventasPendientes = async () => {
        await actions.obtenerVentas()
        let pendientes = []
        store.ventas.map((item, id) => {
            if (!item.fechapago) {
                pendientes = [...pendientes, item]
            }
        })

        setVentasPendientesPago(pendientes)
        setDocImprimir(pendientes)

    }



    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Ventas pendientes de pago</h3>
            <hr />
            <br />

            <div>
                {store.ventas.msg == "No hay ventas realizadas" ?
                    <p>No hay ventas pendientes.</p> :
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
                                <th scope="col" className="text-center">Precio unitario</th>
                                <th scope="col" className="text-center">Total</th>
                                <th scope="col"></th>
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
                                        <Link to={"/pagos_pendientes/" + item.idVenta} style={{ color: "white" }}>
                                            <i className="fa fa-ban"></i>
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

            <div className="container text-end">
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => imprimir()}
                > <i className="fa fa-print"></i>
                </button>
            </div>

            <ToastContainer />

        </div>
    )
}

export default VentasPendientes