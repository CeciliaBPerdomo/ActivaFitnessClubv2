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


function ListadoComprasFechas() {
    const { store, actions } = useContext(Context)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [docImprimir, setDocImprimir] = useState([])

    const buscarMovimientos = async (e) => {
        e.preventDefault()

        if (fechaInicio !== "" && fechaFin !== "") {
            await actions.obtenerComprasPorFechas(fechaInicio, fechaFin)
            setDocImprimir(store.comprasMensuales)
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
        doc.text("Compras", 65, 20)

        doc.setFontSize(11)
        doc.text("Desde: " + fechaInicio + ". Hasta: " + fechaFin + ".", 65, 25)

        // Info tabla
        docImprimir.map((item, id) => {
            i = i + 10 // Contador para cantidad del renglon

            // Informacion para la tabla
            data = [...data,
            [
                item.fecha.slice(5, 16),
                item.cantidad,
                "$ " + item.preciocompra,
                item.nombreProveedor,
                item.TipoMetodo,
            ]
            ]
            // CantidadAlumnos++
            montoTotal = parseInt(item.preciocompra) + montoTotal
        })

        const columns = ["Fecha", "Cantidad", "Precio de compra", "Proveedor", "Forma de pago"]

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

        doc.save("Compras_desde_" + fechaInicio + "_hasta_" + fechaFin + ".pdf");
    }

    return (
        <div className="container">

            <h3 style={{ marginBottom: "25px" }}>
                Compras por rango de fechas
            </h3>
            <hr />

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
                        > Buscar compras
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <br />

            {/* Tabla que muestra el resultado */}
            <div>
                {store.comprasMensuales ?
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Fecha compra</th>
                                <th scope="col" className="text-center">Cantidad</th>
                                <th scope="col" className="text-center">Precio de compra</th>
                                <th scope="col" className="text-center">Proveedor</th>
                                <th scope="col">Pago</th>
                                <th scope="col">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.comprasMensuales.map((item, id) => (
                                <tr key={id}>
                                    <td className="align-middle">{item.fecha.slice(5, 16)}</td>
                                    <td className="text-center align-middle">{item.cantidad}</td>
                                    <td className="text-center align-middle">$ {item.preciocompra}</td>
                                    <td className="text-center align-middle">{item.nombreProveedor}</td>
                                    <td className="align-middle">{item.TipoMetodo}</td>
                                    <td className="align-middle">{item.observaciones}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> :
                    <p>No hay compras realizadas por ese rango de fechas.</p>
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

export default ListadoComprasFechas