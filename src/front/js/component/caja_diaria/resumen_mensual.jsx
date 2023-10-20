import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Swal from 'sweetalert2'

// PDF
import { jsPDF } from "jspdf";
import activa from "../../../img/LogoSinFondo.png"
import autoTable from 'jspdf-autotable'

// Grafica
import Chart from 'chart.js/auto'


export const BalanceMensual = () => {
    const { store, actions } = useContext(Context)
const [border, setBorder] = useState("")
    let yearSelected = 0

    //PDF
    let arrayResp = []

    useEffect(() => {
        actions.obtenerBalanceMensual();
    }, []);


    // Confirmacion de borrado
    const borrar = (id) => {
        Swal.fire({
            position: 'top-end',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            title: '¿Estás seguro?',
            text: "No podrás recuperar la info luego!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No!'
        }).then((result) => {
            if (result.isConfirmed) {
                actions.borrarBalanceMensual(id),
                    Swal.fire({
                        position: 'top-end',
                        title: 'Borrado!',
                        text: 'El balance mensual a sido eliminado.',
                        icon: 'success'
                    }
                    )
            }
        })


    }

    // Consulta del año que se desea visualizar
    const seleccionar = async (tipo) => {
        const { value: year } = await Swal.fire({
            icon: 'question',
            title: 'Seleccione el año que desea visualizar',
            input: 'select',
            inputOptions: {
                '2023': '2023',
                '2024': '2024',
                '2025': '2025',
                '2026': '2026',
            },
            inputPlaceholder: 'Año',
            showCancelButton: true,
        })
        yearSelected = year

        if (tipo == "PDF") {
            imprimirPDF()
        } else if ("Graficar") {
            graficar()
        }
    }

    // Busca los datos del año seleccionado
    const buscar = async () => {
        let resp = await actions.obtenerBalanceMensual();
        let total = 0

        if (resp) {
            store.mensual.map((item) => {
                if (item.fecha.slice(12, 16) == yearSelected) {
                    total = (item.totalmensualidades + item.totalventas) - item.totalpagoprov
                    arrayResp = [...arrayResp, item]
                }
            })
        }
    }

    // Genera el pdf
    const imprimirPDF = async () => {
        await buscar()

        const doc = new jsPDF();

        let data = []           // Array de info
        let i = 35              // Renglones

        // Agregar la imagen al PDF (X, Y, Width, Height)
        doc.addImage(activa, 'PNG', 15, 10, 16, 15);

        // Titulo
        doc.text("Balance anual: " + yearSelected, 65, 20)


        // Info tabla
        arrayResp.map((item, id) => {
            i = i + 10 // Contador para cantidad del renglon

            // Informacion para la tabla
            data = [...data,
            [
                moment(item.fecha).format("MM-YYYY"),
                item.cantidadalumnos,
                "$ " + item.totalmensualidades,
                "$ " + item.totalventas,
                "$ " + item.totalpagoprov,
                "$ " + ((item.totalmensualidades + item.totalventas) - item.totalpagoprov)
            ]
            ]
        })

        const columns = ["Fecha", "Cantidad de alumnos", "Total mensualidades", "Total de ventas", "Total de egresos", "Total"]

        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: { halign: 'center' }, // Centra los titulos
            bodyStyles: { halign: "center" }, // Centra la info de la tabla

            head: [columns],
            body: data
        })


        // doc.autoTable({
        //     startY: i,
        //     theme: 'plain',
        //     bodyStyles: { halign: "right" },

        //     body: [
        //         ["Total de alumnos: "
        //             + CantidadAlumnos
        //         ],
        //         ["Total de facturación: $ "
        //             + montoTotal
        //         ],
        //     ]
        // })

        doc.save("Balance_" + yearSelected + ".pdf");

    }

    const graficar = async () => {
        await buscar()
        const canvas = document.getElementById('grafica')

        // Check if a chart is already associated with this canvas
        if (canvas.chart) {
            // Destroy the existing chart
            canvas.chart.destroy();
        }

        const ctx = canvas.getContext('2d');
        setBorder("border")

        // Create the new chart
        canvas.chart = new Chart(ctx, {
            type: 'bar',
            options: {
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: { size: 18 }
                        }
                    }
                }
            },
            data: {
                labels: arrayResp.map(row => row.fecha.slice(7, 11)),
                datasets: [
                    {
                        label: 'Cantidad de Alumnos: ' + yearSelected,
                        data: arrayResp.map(row => row.cantidadalumnos)
                    },
                ]
            }
        }
        )

        const otraCanvas = document.getElementById('otra_grafica')

        // Check if a chart is already associated with this canvas
        if (otraCanvas.chart) {
            // Destroy the existing chart
            otraCanvas.chart.destroy();
        }

        const otra_ctx = otraCanvas.getContext('2d');

        // Create the new chart
        otraCanvas.chart = new Chart(otra_ctx, {
            type: 'bar',
            options: {
                plugins: {
                    title: {
                        font: { size: 18 },
                        display: true,
                        text: 'Ingresos / Egresos: ' + yearSelected
                    }
                }
            },
            data: {
                labels: arrayResp.map(row => row.fecha.slice(7, 11)),
                datasets: [
                    {
                        label: 'Ingresos de mensualidades',
                        data: arrayResp.map(row => row.totalmensualidades)
                    },
                    {
                        label: 'Ingresos por ventas',
                        data: arrayResp.map(row => row.totalventas)
                    },
                    {
                        label: 'Egresos',
                        data: arrayResp.map(row => row.totalpagoprov)
                    },
                ]
            }
        }
        )
    }

    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Balance mensual</h3>
                <hr />
                <br />

                <div>
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col" className="text-center">Cantidad de alumnos</th>
                                <th scope="col" className="text-center">Total mensualidades</th>
                                <th scope="col" className="text-center">Total de ventas</th>
                                <th scope="col" className="text-center">Total Egresos</th>
                                <th scope="col" className="text-center">Total</th>
                                <th scope="col" className="text-center">Observaciones</th>
                                <th scope="col" className="text-center"></th>

                            </tr>
                        </thead>

                        <tbody>
                            {store.mensual.map((item, id) => (
                                <tr key={id}>
                                    <td>{moment(item.fecha).format("MM / YY")}</td>
                                    <td className="text-center">{item.cantidadalumnos}</td>
                                    <td className="text-center">$ {item.totalmensualidades}</td>
                                    <td className="text-center">$ {item.totalventas}</td>
                                    <td className="text-center">$ {item.totalpagoprov}</td>
                                    <td className="text-center"
                                        style={{ color: "red" }}>
                                        $ {(item.totalmensualidades + item.totalventas) - item.totalpagoprov}
                                    </td>
                                    <td className="text-center">{item.observaciones}</td>
                                    <td className="text-center">
                                        <i className="fa fa-trash"
                                            onClick={() => borrar(item.id)}>
                                        </i>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <br />
                <div>
                    {/* PDF */}
                    <button
                        type="button"
                        className="btn btn-outline-danger float-end"
                        onClick={() => seleccionar("PDF")}
                    >
                        <i className="fa fa-print"></i>
                    </button>

                    {/* Grafica */}
                    <button
                        type="button"
                        className="btn btn-outline-danger float-end"
                        style={{ marginRight: "5px" }}
                        onClick={() => seleccionar("Graficar")}
                    ><i className="fa fa-signal"></i>
                    </button>
                </div>


                {/* Grafica */}
                <div className="container text-center" style={{marginTop: "60px"}}>
                    <div className="row" style={{}}>
                        <div className={"col " + border} style={{marginRight: "10px", padding: "10px"}}>
                            <canvas id="grafica"></canvas>
                        </div>
                        <div className={"col " + border}>
                            <canvas id="otra_grafica"></canvas>
                        </div>

                    </div>
                </div>
            </div>

            <ToastContainer />
            <br />
        </>
    )
}