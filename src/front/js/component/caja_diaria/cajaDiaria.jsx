import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export const CajaDiaria = () => {
    const { store, actions } = useContext(Context)
    const [fecha, setFecha] = useState("")

    const buscarMovimientos = (e) => {
        e.preventDefault()
        actions.obtenerMovimientosDiarios(fecha)
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
                                        <td>${item.monto}</td>
                                        <td>{item.metodo}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>

                        

                        {/* Egresos */}
                        <div className="col">
                            <b>Egresos</b>
                            <hr />
                        </div>
                    
                    
                    </div>


                    <div className="row">
                        {/* Ventas */}
                        {/* <div className="col">
                            <b>Ingresos (Ventas)</b>
                            <hr />
                        </div> */}

                        <div className="col">

                        </div>

                    </div>
                </div>


            </div>

            <ToastContainer />
            <br />
        </>
    )
}