import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import torta from "../../../img/cumple.jpg"

export const Cumples = () => {
    const { store, actions } = useContext(Context);
    const [cumples, setCumples] = useState([])

    useEffect(() => {
        buscarCumples()
    }, [])

    const buscarCumples = async () => {
        let resp = await actions.obtenerAlumnos();
        let arrayCumples = []

        if (resp) {
            let fechaActual = moment().format('MM-DD')

            store.alumnos.map((item, id) => {
                if (item.fechanacimiento.slice(5) == fechaActual) {
                    arrayCumples = [...arrayCumples, item.nombre + " " + item.apellido]
                }
            })
        }
        setCumples(arrayCumples)
    }

    return (
        <>
            <div className="row" style={{ paddingBottom: "15px" }}>
                <div className="col-3">
                    <img src={torta} alt="Cumpleaños" style={{ width: "150px" }} className="rounded mx-auto d-block opacity-75" />
                </div>

                {cumples != "" ?
                    <div className="col">
                        <br />
                        {cumples.map((item, id) =>
                            <p key={id}>{item}</p>
                        )}
                    </div>
                    : 
                    <div className="col">
                        <br />
                        <p>No hay cumpleaños en el día de hoy.</p>
                    </div>
                }
                <ToastContainer />
            </div >
        </>
    );
};
