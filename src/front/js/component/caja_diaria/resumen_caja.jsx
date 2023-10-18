import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResumenCajaDiaria = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.obtenerMovimientosCajaDiaria();
    }, []);


    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Resumen de movimientos caja diaria</h3>
                <hr />
                <br />

                <div>
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col" className="text-center">Cantidad de clientes</th>
                                <th scope="col" className="text-center">Total Ingresos (Mensualidades)</th>
                                <th scope="col" className="text-center">Total Ingresos (Ventas)</th>
                                <th scope="col" className="text-center">Total Egresos</th>
                                <th scope="col" className="text-center">Total</th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {store.cajaDiaria.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.fecha.slice(5, 16)}</td>
                                    <td className="text-center">{item.cantidadalumnos}</td>
                                    <td className="text-center">$ {item.totalmensualidades}</td>
                                    <td className="text-center">$ {item.totalventas}</td>
                                    <td className="text-center">$ {item.totalpagoprov}</td>
                                    <td className="text-center"
                                        style={{ color: "red" }}>
                                        $ {(item.totalmensualidades + item.totalventas) - item.totalpagoprov}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <ToastContainer />
            <br />
        </>
    )
}