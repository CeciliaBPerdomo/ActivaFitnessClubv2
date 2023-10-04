import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const BalanceMensual = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.obtenerBalanceMensual();
    }, []);


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
                                <th scope="col" className="text-center">Total Ingresos (Mensualidades)</th>
                                <th scope="col" className="text-center">Total Ingresos (Ventas)</th>
                                <th scope="col" className="text-center">Total Egresos</th>
                                <th scope="col" className="text-center">Total</th>
                                <th scope="col" className="text-center">Observaciones</th>
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