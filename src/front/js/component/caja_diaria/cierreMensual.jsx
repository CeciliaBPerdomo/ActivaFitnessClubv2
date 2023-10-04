import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const CierreMensual = () => {
    const { store, actions } = useContext(Context)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [observaciones, setObservaciones] = useState("")

    useEffect(() => {
        // actions.obtenerBalanceMensual();
    }, []);

    // Busca los movimientos segun la fecha seleccionada
    const buscarMovimientos = async (e) => {
        e.preventDefault()

        if (fechaInicio !== "" && fechaFin !== "") {
            await actions.obtenerMovimientosMensuales(fechaInicio, fechaFin)
        } else {
            if (fechaInicio == "" && fechaFin == "") {
                toast.error("No seleccionaste ninguna fecha", {
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
                                            <td>{fecha}</td>
                                            <td>{item.cantidadalumnos}</td>
                                            <td>$ {item.totalmensualidades}</td>
                                            <td>$ {item.totalventas}</td>
                                            <td>$ {item.totalpagoprov}</td>
                                            <td style={{
                                                visibility: "collapse",
                                                display: "none"
                                            }}>
                                                {/* {totalIngresos = totalIngresos + parseInt(item.monto)} */}
                                            </td>
                                            <td>{item.observaciones}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <br /> <br />
                    <div className="row">
                        {/* Ventas */}
                        <div className="col">
                            {/* <b style={{color: "red"}}>Ingresos (Ventas)</b> */}
                            {/* <hr /> */}
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
                                        {/* {CantidadAlumnos} */}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col text-end">
                                        Total de ingresos:
                                    </div>
                                    <div className="col text-start">
                                        {/* $ {totalIngresos} */}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col text-end">
                                        Total de egresos:
                                    </div>
                                    <div className="col text-start">
                                        {/* $ {totalEgresos} */}
                                    </div>
                                </div>

                                <hr />
                                <div className="row">
                                    <div className="col text-end">
                                        Total:
                                    </div>
                                    <div className="col text-start">
                                        {/* <b style={{ color: "red" }}>$ {totalIngresos - totalEgresos}</b> */}
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
                    className="btn btn-outline-danger w-50"
                    onClick={(e) => guardarMovimientos(e)}
                > Cerrar balance mensual
                </button>
            </div>


            </div>
            <ToastContainer />
            <br />
        </>
    )
}