import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'fecha'


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
                                        <th scope="col">Cantidad de clientes</th>
                                        <th scope="col">Total Ingresos (Mensualidades)</th>
                                        <th scope="col">Total Ingresos (Ventas)</th>
                                        <th scope="col">Total Egresos</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Observaciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {store.cajaDiaria.map((item, id) => ( 
                                        <tr key={id}>
                                            <td>
                                                {
                                                (new Date(item.fecha).getDate() + 1)
                                                + "/" + 
                                                (new Date(item.fecha).getMonth() + 1)
                                                + "/" + 
                                                (new Date(item.fecha).getFullYear())
                                                }
                                                </td>
                                            <td className="text-center">{item.cantidadalumnos}</td>
                                            <td className="text-center">$ {item.totalmensualidades}</td>
                                            <td className="text-center">$ {item.totalventas}</td>
                                            <td className="text-center">$ {item.totalpagoprov}</td>
                                            <td className="text-center" 
                                            style={{color: "red"}}>
                                                $ {(item.totalmensualidades + item.totalventas) - item.totalpagoprov}
                                            </td>
                                            <td>{item.observaciones}</td>
                                            
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