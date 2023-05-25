import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export const CajaDiaria = () => {
    const { store, actions } = useContext(Context)
    const [fecha, setFecha] = useState("")
    let totalIngresos = 0   // Por mensualidades
    let CantidadAlumnos = 0
    let totalEgresos = 0

    const buscarMovimientos = async (e) => {
        e.preventDefault()
        await actions.obtenerMovimientosDiarios(fecha)
        await actions.obtenerEgresosDiarios(fecha)
    }

    const guardarMovimientos = (e) => {
        e.preventDefault()
        actions.cerrarCajaDiaria(fecha, totalIngresos, CantidadAlumnos, 0, totalEgresos, "Sin observaciones")

        toast.success("💪 Caja registrada con exito total", {
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

    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Movimientos de caja diaria</h3>
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
                            <b style={{color: "red"}}> Ingresos (Mensualidades) </b>
                            <hr />
                            <table className="table" style={{ color: "white" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Factura</th>
                                        <th scope="col">Monto</th>
                                        <th scope="col">Método de pago</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {store.diarios.map((item, id) => ( 
                                        <tr key={id}>
                                            <td>{item.factura}</td>
                                            <td>$ {item.monto}</td>
                                            <td>{item.metodo}</td>
                                            <td style={{
                                                visibility: "collapse", 
                                                display:"none"}}>
                                                {totalIngresos = totalIngresos + parseInt(item.monto)}
                                            </td>
                                            <td style={{
                                                visibility: "collapse", 
                                                display:"none"}}>
                                                {CantidadAlumnos = CantidadAlumnos + 1}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                     

                        {/* Egresos */}
                        <div className="col">
                            <b style={{color: "red"}}>Egresos</b>
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
                                                display:"none"}}>
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
                            <b style={{color: "red"}}>Totales</b>
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
                                        <b style={{color: "red"}}>$ {totalIngresos - totalEgresos}</b>
                                    </div>
                                </div>
                            </div>
    
                        </div>

                    </div>
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