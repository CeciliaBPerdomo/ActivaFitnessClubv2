import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Swal from 'sweetalert2'

export const BalanceMensual = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.obtenerBalanceMensual();
    }, []);


    // Confirmacion de borrado
    const borrar = (id) => {
        Swal.fire({
            position: 'top-end',
            showClass: { popup: 'animate__animated animate__fadeInDown'},
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

            </div>
            <ToastContainer />
            <br />
        </>
    )
}