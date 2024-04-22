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


function FacturacionxMetodo() {
    const { store, actions } = useContext(Context)

    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [idmetodo, setIdMetodo] = useState("")

    useEffect(() => {
        actions.obtenerMetodos()
    }, []);

    const ordenarMensualidades = async (ordenar, tipo) => {
        let fechaI = fechaInicio.slice(0, 10)
        let fechaF = fechaFin.slice(0, 10)
        await actions.ordenarMensualidades(fechaI, fechaF, ordenar, tipo)
    }

    // Rango de fechas para ver los pagos mensuales
    const buscarMovimientos = async (e) => {
        e.preventDefault()

        if (fechaInicio !== "" && fechaFin !== "" && idmetodo != "") {
            await actions.obtenerPagosMensuales(fechaInicio, fechaFin)
            await actions.buscadorMensualidadxMetodo(idmetodo)

            //setDocImprimir(store.movimientosDiarios)
        } else {

            function mensaje(texto) {
                toast.error(texto, {
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

            if (idmetodo == "") {
                mensaje("No seleccionaste el método de pago")
            }

            if (fechaInicio == "") {
                mensaje("No seleccionaste la fecha de inicio")
            }

            if (fechaFin == "") {
                mensaje("No seleccionaste la fecha de fin")
            }

        }
    }

    return (
        <div className='container'>
            <h3 style={{ marginBottom: "25px" }}>Facturación por método de pago</h3>
            <hr />
            <br />

            <div className="container text-start">
                <div className="row">
                    <div className="col-3">
                        Método de pago:
                    </div>

                    <div className="col-3 float-start">
                        <select className="form-select"
                            value={idmetodo}
                            onChange={(e) => setIdMetodo(e.target.value)}
                        >
                            <option selected>Método de pago</option>
                            {store.metodos.map((item, id) => (
                                <option key={id} value={item.tipo}>{item.tipo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <br />

                <div className="row">
                    {/* Seleccionar fechas */}
                    <div className="col">
                        Seleccione el rango de fechas:
                    </div>

                    <div className="col d-flex justify-content-start">
                        <label style={{ marginRight: "5px", marginTop: "3px" }}>
                            Inicio:
                        </label>
                        <input type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>
                    <div className="col d-flex justify-content-start">
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

                            </th>
                            {/* Alumnos */}
                            <th scope="col" className="text-center align-middle">Alumnos

                            </th>

                            {/* Facturas */}
                            <th scope="col" className="text-center align-middle">Factura

                            </th>

                            {/* Monto */}
                            <th scope="col" className="text-center align-middle">Monto</th>
                        </tr>
                    </thead>

                    {store.movimientosDiarios ?
                        <tbody>
                            {
                                store.movimientosDiarios.map((item, id) => (
                                    <tr key={id}>
                                        <td className="text-start align-middle">{moment(item.fechapago).format("DD-MM-YYYY")}</td>
                                        <td className="text-center align-middle">{item.alumnoNombre} {item.alumnoApellido}</td>
                                        <td className="text-center align-middle">{item.factura}</td>
                                        <td className="text-center align-middle">$ {item.monto}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        :
                        <p>No hay movimientos</p>
                    }
                </table>
            </div>

            <ToastContainer />

        </div>
    )
}

export default FacturacionxMetodo