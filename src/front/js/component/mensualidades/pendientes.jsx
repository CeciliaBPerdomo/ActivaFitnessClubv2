import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";


export const Pendientes = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const cuota = async () => {
            await actions.vencimientosPendientes(moment().format('YYYY-MM-DD'))
        }
        cuota()
    }, [])


    return (
        <>
            <div>
                
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Alumno</th>
                                <th scope="col" className="text-center">Modalidad</th>
                                <th scope="col" className="text-center">Monto</th>
                                <th scope="col" className="text-center">Vencimiento factura</th>
                                <th scope="col">Observaciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {store.vencimientos.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.nombre} {item.apellido}</td>
                                    <td className="text-center">{item.cuotasInfo.descripcion}</td>
                                    <td className="text-center">$ {item.cuotasInfo.precio}</td>
                                    <td className="text-center">{item.proximovencimiento}</td>
                                    <td>{item.observaciones}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                <ToastContainer />
            </div >
        </>
    );
};
