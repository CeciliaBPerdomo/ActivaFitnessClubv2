import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { jsPDF } from "jspdf";
import activa from "../../../img/LogoSinFondo.png"
import autoTable from 'jspdf-autotable'

export const CierreMensual = () => {
    const { store, actions } = useContext(Context)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [observaciones, setObservaciones] = useState("")
    const [docImprimir, setDocImprimir] = useState([])

    let totalIngresos = 0   // Por mensualidades
    let CantidadAlumnos = 0
    let totalEgresos = 0
    let totalMen = 0
    let totalVen = 0

    // Busca los movimientos segun la fecha seleccionada
    const buscarMovimientos = async (e) => {
        e.preventDefault()

        if (fechaInicio !== "" && fechaFin !== "") {
            await actions.obtenerMovimientosMensuales(fechaInicio, fechaFin)
            setDocImprimir(store.movimientosMensuales)
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

    // Guardar movimientos
    const guardarMovimientos = async (e) => {
        e.preventDefault()
        let resultado = await actions.cerrarCajaMensual(fechaFin, totalMen, CantidadAlumnos, totalVen, totalEgresos, observaciones)

        if (resultado === true) {
            toast.success("💪 Balance mensual registrado con éxito", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        } else {
            toast.error("No se pudo registrar el movimiento", {
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

    // Imprimir 
    const imprimir = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();
        
        let data = []           // Array de info
        let totalDiario = 0
        let i = 50              // Renglones
        let fecha = ""          // Para formatear la fecha
        let fechaActual = moment().format('DD-MM-YYYY')

        // Agregar la imagen al PDF (X, Y, Width, Height)
        doc.addImage(activa, 'PNG', 15, 10, 16, 15);
        doc.text("Balance mensual " + fechaActual , 65, 20 )

        docImprimir.map((item, id) => {
            totalDiario = (item.totalmensualidades + item.totalventas) - item.totalpagoprov
            fecha = item.fecha.slice(5, 16)
            i = i + 10 // Contador para cantidad del renglon

            // Informacion para la tabla
            data = [...data, [
                fecha, 
                item.cantidadalumnos, 
                "$ " + item.totalmensualidades, 
                "$ " + item.totalventas, 
                "$ " + item.totalpagoprov, 
                "$ " + totalDiario]
            ], "Total alumnos: " + CantidadAlumnos
            
        })

        const columns = ["Fecha", "Cantidad de alumnos", "Mensualidades", "Ventas", "Proveedores", "Total"]

        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: {halign: 'center'}, // Centra los titulos
            bodyStyles: {halign: "center"}, // Centra la info de la tabla

            head: [columns],
            body: data
        })

        
        doc.autoTable({
            startY: i,
            theme: 'plain',
            bodyStyles: {halign: "right"}, 
           
            body: [
                ["Total de alumnos: "  + CantidadAlumnos],
                ["Total de ingresos: $ " + totalIngresos], 
                ["Total de egresos: $ " + totalEgresos],
                ["Total de mensual: $ " + totalMen]
            ]
        })
        
        doc.save("balanceMensual " + fechaActual + ".pdf");
    }


    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Cierre mensual de balance</h3>
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

                {/* Balance mensual segun el rango de fechas */}
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <table className="table" style={{ color: "white" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Cantidad de alumnos</th>
                                        <th scope="col">Total mensualidades</th>
                                        <th scope="col">Total ventas</th>
                                        <th scope="col">Total pago a proveedores</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Observaciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {store.movimientosMensuales.map((item, id) => (
                                        <tr key={id}>
                                            <td>{moment(item.fecha).format("DD-MM-YYYY")}</td>
                                            <td>{item.cantidadalumnos}</td>
                                            <td>$ {item.totalmensualidades}</td>
                                            <td>$ {item.totalventas}</td>
                                            <td>$ {item.totalpagoprov}</td>
                                            <td>$ {(item.totalmensualidades + item.totalventas) - item.totalpagoprov}</td>
                                            <td>{item.observaciones}</td>

                                            {/* Calculo de totales */}
                                            <td style={{
                                                visibility: "collapse",
                                                display: "none"
                                            }}>
                                                {totalIngresos = totalIngresos + parseInt(item.totalmensualidades) + parseInt(item.totalventas)}
                                                {CantidadAlumnos = CantidadAlumnos + parseInt(item.cantidadalumnos)}
                                                {totalEgresos = totalEgresos + parseInt(item.totalpagoprov)}
                                                {totalMen = totalMen + parseInt(item.totalmensualidades)}
                                                {totalVen = totalVen + parseInt(item.totalventas)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <br /> <br />
                    <div className="row">
                        {/* Division para que quede del otro lado, boluda */}
                        <div className="col">
                        </div>

                        <div className="col">
                            <b style={{ color: "red" }}>Totales</b>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col text-end">
                                        Cantidad de alumnos:
                                    </div>
                                    <div className="col text-start">
                                        {CantidadAlumnos}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col text-end">
                                        Total de ingresos:
                                    </div>
                                    <div className="col text-start">
                                        $ {totalIngresos}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col text-end">
                                        Total de egresos:
                                    </div>
                                    <div className="col text-start">
                                        $ {totalEgresos}
                                    </div>
                                </div>

                                <hr />
                                <div className="row">
                                    <div className="col text-end">
                                        Total:
                                    </div>
                                    <div className="col text-start">
                                        <b style={{ color: "red" }}>$ {totalIngresos - totalEgresos}</b>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <br /><br />

                {/* Observaciones */}
                <div className="container d-flex justify-content-end">
                    <input type="text"
                        className="form-control w-50"
                        placeholder="Observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                    />
                </div>
                <br />


                {/* cerrar balance mensual */}
                <div className="container text-end">
                    <button
                        type="submit"
                        className="btn btn-outline-danger"
                        style={{ marginRight: "5px" }}
                        onClick={(e) => guardarMovimientos(e)}
                    > Cerrar balance mensual
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => imprimir()}
                    > <i className="fa fa-print"></i>
                    </button>
                </div>


            </div>
            <ToastContainer />
            <br />
        </>
    )
}