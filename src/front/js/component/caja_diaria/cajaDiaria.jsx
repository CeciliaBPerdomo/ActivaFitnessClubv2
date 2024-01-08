import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";


export const CajaDiaria = () => {
    const { store, actions } = useContext(Context)
    let [fecha, setFecha] = useState("")
    const [observaciones, setObservaciones] = useState("")
    let totalIngresos = 0   // Por mensualidades
    let CantidadAlumnos = 0
    let totalEgresos = 0


    useEffect(() => {
        const info = async () => {
            await actions.obtenerMovimientosDiarios(moment().format('YYYY-MM-DD'));
            await actions.obtenerEgresosDiarios(moment().format('YYYY-MM-DD'))
        }
        info()
    }, []);

    const buscarMovimientos = async (e) => {
        e.preventDefault()
        if (fecha !== "") {
            await actions.obtenerMovimientosDiarios(fecha)
            await actions.obtenerEgresosDiarios(fecha)
        } else {
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
    }

    const guardarMovimientos = async (e) => {
        e.preventDefault()

        if (fecha == "") {
            fecha = moment().format('YYYY-MM-DD')
        }

        let controlFecha = await actions.cajadiariaControlFecha(fecha)

        if (!controlFecha) {
            let resultado = await actions.cerrarCajaDiaria(fecha, totalIngresos, CantidadAlumnos, 0, totalEgresos, observaciones)

            if (resultado === true) {
                toast.success("💪 Caja registrada con éxito", {
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
        } else { 
            // Actualiza los datos  
            let modif = await actions.modificarCajaDiariaPorFecha(fecha, totalIngresos, CantidadAlumnos, 0, totalEgresos, observaciones)
            if (modif === true) {
                toast.success("💪 Caja actualizada con éxito", {
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
    }

return (
    <>
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Balance diario</h3>
            <hr />
            <br />

            <div className="container text-start">
                <div className="row">
                    <div className="col-2">Seleccione la fecha:</div>
                    <div className="col-2 d-flex justify-content-start">
                        <input type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button
                            type="submit"
                            className="btn btn-outline-danger w-50"
                            onClick={(e) => buscarMovimientos(e)}
                        > Buscar movimientos
                        </button>
                    </div>
                </div>
            </div>

            <br />
            <hr />
            <br />

            <div className="container text-center">
                <div className="row">

                    {/* Ingreso por mensualidades */}
                    <div className="col">
                        <b style={{ color: "red" }}> Ingresos (Mensualidades) </b>
                        <hr />
                        <table className="table" style={{ color: "white" }}>
                            <thead>
                                <tr>
                                    <th scope="col">Alumno</th>
                                    <th scope="col">Factura</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Método de pago</th>
                                </tr>
                            </thead>

                            <tbody>
                                {store.diarios.map((item, id) => (
                                    <tr key={id}>
                                        <td>{item.alumnoNombre} {item.alumnoApellido}</td>
                                        <td>{item.factura}</td>
                                        <td>$ {item.monto}</td>
                                        <td>{item.metodo}</td>
                                        <td style={{
                                            visibility: "collapse",
                                            display: "none"
                                        }}>
                                            {totalIngresos = totalIngresos + parseInt(item.monto)}
                                        </td>
                                        <td style={{
                                            visibility: "collapse",
                                            display: "none"
                                        }}>
                                            {CantidadAlumnos = CantidadAlumnos + 1}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Egresos */}
                    <div className="col">
                        <b style={{ color: "red" }}>Egresos</b>
                        <hr />
                        <table className="table" style={{ color: "white" }}>
                            <thead>
                                <tr>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Factura</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Método de pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.egresosDiarios.map((item, id) => (
                                    <tr key={id}>
                                        <td>{item.proveedor}</td>
                                        <td>{item.factura}</td>
                                        <td>$ {item.monto}</td>
                                        <td>{item.metodo}</td>
                                        <td style={{
                                            visibility: "collapse",
                                            display: "none"
                                        }}>
                                            {totalEgresos = totalEgresos + parseInt(item.monto)}
                                        </td>
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

            <div className="container d-flex justify-content-end">
                <input type="text"
                    className="form-control w-50"
                    placeholder="Observaciones"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                />
            </div>
            <br />

            {/* cerrar caja */}
            <div className="container text-end">
                <button
                    type="submit"
                    className="btn btn-outline-danger w-50"
                    onClick={(e) => guardarMovimientos(e)}
                > Cerrar caja
                </button>
            </div>
        </div>

        <ToastContainer />
        <br />
    </>
)
}