import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

// Video 
import ReactPlayer from 'react-player'

function VerEjercicioIndividual() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        // Datos del ejercicio
        actions.obtenerEjercicioId(parseInt(params.theid));
    }, []);

    return (
        <div className='container'>
            <h3 style={{ marginBottom: "25px" }}>{store.ejercicio[0]?.nombre}</h3>
            <hr />
            <br />

            <div className="d-flex justify-content-center">
                <img src={store.ejercicio[0]?.foto}
                    alt={store.ejercicio[0]?.nombre}
                    style={{ width: "300px" }}
                />
            </div>

            <div>
                <table className="table"
                    style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Descripción</th>
                            <th></th>
                            <th scope="col">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td className="align-middle">{store.ejercicio[0]?.descripcion}</td>
                        <td></td>
                        <td className="align-middle text-center">{store.ejercicio[0]?.descripcionTipo}</td>
                    </tbody>
                </table>
            </div>

            <hr />

            <div className="d-flex justify-content-center">
                <ReactPlayer
                    url={store.ejercicio[0]?.video}
                    className='react-player'
                    width='50%'
                />
            </div>
            <br />
            <hr />
        </div>
    )
}

export default VerEjercicioIndividual