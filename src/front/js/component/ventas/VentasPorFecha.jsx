import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// PDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

// Logo
import activa from "../../../img/LogoSinFondo.png"


function VentasPorFecha() {
    const { store, actions } = useContext(Context)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [docImprimir, setDocImprimir] = useState([])

    const buscarMovimientos = async (e) => {
        e.preventDefault()

        if (fechaInicio !== "" && fechaFin !== "") {
            await actions.obtenerVentasPorFechas(fechaInicio, fechaFin)
            setDocImprimir(store.ventasMensuales)
        } else {
            if (fechaInicio == "") {
                toast.error("No seleccionaste la fecha de inicio", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }

            if (fechaFin == "") {
                toast.error("No seleccionaste la fecha de fin", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
        }
    }

    // Imprimir 
    const imprimir = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();
        let montoTotal = 0

        let data = []           // Array de info
        let i = 35              // Renglones

        // Agregar la imagen al PDF (X, Y, Width, Height)
        doc.addImage(activa, 'PNG', 15, 10, 16, 15);

        // Titulo
        doc.text("Ventas", 65, 20)

        doc.setFontSize(11)
        doc.text("Desde: " + fechaInicio + ". Hasta: " + fechaFin + ".", 65, 25)

        // Info tabla
        docImprimir.map((item, id) => {
            i = i + 10 // Contador para cantidad del renglon

           // Informacion para la tabla
            data = [...data,
                [
                    item.fechacompra.slice(5, 16),
                    item.nombreUsuario,
                    item.nombreProducto,
                    item.cantidad,
                    item.TipoMetodo,
                    "$ " + (item.preciounitario * item.cantidad),
                ]
            ]
           
            montoTotal = parseInt(item.preciounitario * item.cantidad) + montoTotal
        })

        const columns = ["Fecha compra", "Alumno", "Producto", "Cantidad", "Forma de pago", "Total"]

        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: { halign: 'center' }, // Centra los titulos
            bodyStyles: { halign: "center" }, // Centra la info de la tabla

            head: [columns],
            body: data
        })


        doc.autoTable({
            startY: i,
            theme: 'plain',
            bodyStyles: { halign: "right" },

            body: [
                ["Total de compras: $"
                    + montoTotal
                ],
            ]
        })

        doc.save("Ventas_desde_" + fechaInicio + "_hasta_" + fechaFin + ".pdf");
    }

    return (
        <div className="container">
            <h4 style={{ marginBottom: "25px" }}>Ventas por rango de fechas</h4>
            <hr />
            <br />

             {/* Seleccionar fechas */}
             <div className="container text-start">
                <div className="row">

                    <div className="col-3 align-middle">
                        Seleccione el rango de fechas:
                    </div>

                    <div className="col-2 d-flex justify-content-start">
                        <label style={{ marginRight: "5px", marginTop: "3px" }}>
                            Inicio:
                        </label>
                        <input type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>
                    <div className="col-2 d-flex justify-content-start">
                        <label className="align-middle" style={{ marginRight: "5px", marginTop: "3px" }}>
                            Fin:
                        </label>
                        <input type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button
                            type="submit"
                            className="btn btn-outline-danger"
                            onClick={(e) => buscarMovimientos(e)}
                        > Buscar ventas realizadas
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <br />

            <div>
                {store.ventasMensuales.length > 1 ?
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
                                <th scope="col">Pago</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.ventasMensuales.map((item, id) => (
                                <tr key={id}>
                                <td className="align-middle">{item.fechacompra.slice(5, 16)}</td>
                                <td className="align-middle text-center">{item.nombreUsuario}</td>
                                <td className="align-middle text-center">{item.nombreProducto}</td>
                                <td className="text-center align-middle">{item.cantidad}</td>
                                <td className="text-center align-middle">$ {item.preciounitario}</td>
                                <td className="text-center align-middle">$ {item.preciounitario * item.cantidad}</td>
                                <td className="align-middle">{item.TipoMetodo}</td>
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
                    </table> :
                    <p>No hay ventas realizadas por ese rango de fechas.</p>
                }
            </div>

            <br />
           
            {/* PDFs */}
            <div>
                <button
                    type="button"
                    className="btn btn-outline-danger float-end"
                    onClick={imprimir}
                >
                    <i className="fa fa-print"></i>
                </button>
            </div>
            <br />
            <ToastContainer />
        </div>
    )
}

export default VentasPorFecha