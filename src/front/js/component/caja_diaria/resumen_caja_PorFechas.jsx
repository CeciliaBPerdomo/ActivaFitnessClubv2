import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Formateo de fechas 
import moment from "moment";

// PDF
import { jsPDF } from "jspdf";
import activa from "../../../img/LogoSinFondo.png"
import autoTable from 'jspdf-autotable'

// Calculos
let CantidadAlumnos = 0
let montoTotal = 0

export const ResumenCajaDiariaPorFecha = () => {
    const { store, actions } = useContext(Context)

    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")

    // PDF 
    const [docImprimir, setDocImprimir] = useState([])

    // Imprimir 
    const imprimir = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        let data = []           // Array de info
        let i = 35              // Renglones

        // Agregar la imagen al PDF (X, Y, Width, Height)
        //doc.addImage(activa, 'PNG', 15, 10, 16, 15);

        // Titulo
        doc.text("Facturación", 65, 20)

        doc.setFontSize(11)
        doc.text("Desde: " + moment(fechaInicio).format("DD-MM-YYYY") +
            ". Hasta: " + moment(fechaFin).format("DD-MM-YYYY") + ".", 65, 25)

        // Info tabla
        docImprimir.map((item, id) => {
            i = i + 10 // Contador para cantidad del renglon

            // Informacion para la tabla
            data = [...data,
            [
                moment(item.fechapago).format("DD-MM-YYYY"),
                item.alumnoNombre + " " + item.alumnoApellido,
                item.factura,
                "$ " + item.monto,
                item.metodo,
            ]
            ]
            CantidadAlumnos++
            montoTotal = parseInt(item.monto) + montoTotal
        })

        const columns = ["Fecha", "Alumno", "Factura", "Monto", "Método de pago"]

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
                ["Total de alumnos: "
                    + CantidadAlumnos
                ],
                ["Total de facturación: $ "
                    + montoTotal
                ],
            ]
        })

        doc.save("Facturacion_" + fechaFin + ".pdf");
    }


    // Rango de fechas para ver los pagos mensuales
    const buscarMovimientos = async (e) => {
        e.preventDefault()

        if (fechaInicio !== "" && fechaFin !== "") {
            await actions.obtenerPagosMensuales(fechaInicio, fechaFin)
            setDocImprimir(store.movimientosDiarios)
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

    const ordenarMensualidades = async (ordenar, tipo) => {
        let fechaI = fechaInicio.slice(0, 10)
        let fechaF = fechaFin.slice(0, 10)
        await actions.ordenarMensualidades(fechaI, fechaF, ordenar, tipo)
    }

    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Facturación mensual</h3>
                <hr />
                <br />

                {/* Seleccionar fechas */}
                <div className="container text-start">
                    <div className="row">

                        <div className="col-3">
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
                        <div className="col-3 d-flex justify-content-start">
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
                            > Buscar movimientos
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <br />

                <div>
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                {/* Fecha */}
                                <th scope="col" className="text-start align-middle">Fecha
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("desc", "fecha")}
                                    >
                                        ↑
                                    </button>

                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("asc", "fecha")}
                                    >
                                        ↓
                                    </button>
                                </th>
                                {/* Alumnos */}
                                <th scope="col" className="text-center align-middle">Alumnos
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("desc", "alumno")}
                                    >
                                        ↑
                                    </button>

                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("asc", "alumno")}
                                    >
                                        ↓
                                    </button>
                                </th>

                                {/* Facturas */}
                                <th scope="col" className="text-center align-middle">Factura
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("desc", "factura")}
                                    >
                                        ↑
                                    </button>

                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("asc", "factura")}
                                    >
                                        ↓
                                    </button>
                                </th>

                                {/* Monto */}
                                <th scope="col" className="text-center align-middle">Monto</th>

                                {/* Metodo de pago */}
                                <th scope="col" className="text-center align-middle">Método de pago
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("desc", "metodo")}
                                    >
                                        ↑
                                    </button>

                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "5px", fontSize: "12px" }}
                                        onClick={() => ordenarMensualidades("asc", "metodo")}
                                    >
                                        ↓
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {store.movimientosDiarios.map((item, id) => (
                                <tr key={id}>
                                    <td className="text-start align-middle">{moment(item.fechapago).format("DD-MM-YYYY")}</td>
                                    <td className="text-center align-middle">{item.alumnoNombre} {item.alumnoApellido}</td>
                                    <td className="text-center align-middle">{item.factura}</td>
                                    <td className="text-center align-middle">$ {item.monto}</td>
                                    <td className="text-center align-middle">{item.metodo}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                <br />
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-danger float-end"
                        onClick={imprimir}>
                        <i className="fa fa-print"></i>
                    </button>
                </div>
            </div>
            <ToastContainer />
            <br />
        </>
    )
}