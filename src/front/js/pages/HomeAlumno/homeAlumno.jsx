import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
// Fecha
import moment from "moment";

import { MenuAlumno } from "./menuAlumno.jsx";
import DatosPersonales from "./datosPersonales.js";
import PagosMensualesAlumnos from "./mensualidades.js"
import RutinaAlumno from "./misRutinas.js";
import TiendaProductos from "./tiendaProductos.js";

export const HomeAlumno = () => {
    const params = useParams()
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.clima()

        if (params.idAlumno) {
            obtenerAlumno();
            actions.visualizarComponentes("Personales")
        }

    }, [])

    const obtenerAlumno = async () => {
        await actions.obtenerAlumnoId(params.idAlumno)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <MenuAlumno />
                </div>
                <div className="col">
                    <div style={{ marginBottom: "-20px" }}>
                        <p className="text-end">
                            {moment().format('DD/MM/YYYY')}
                        </p>
                    </div>

                    <div style={{ marginBottom: "-20px" }}>
                        {store.clima ?
                            <p className="text-end" style={{ fontSize: "18px" }}>
                                <img src={"http://openweathermap.org/img/w/" + store.clima?.weather?.[0]?.icon + ".png"} />
                                {Math.round(store.clima?.main?.temp) + " °C"}
                            </p> : null
                        }
                    </div>
                    <hr />
                    
                    <h3 style={{ color: "red" }}>
                        Hola, {store.alumno[0]?.nombre}
                    </h3>
                    <br />

                    <div style={{height: "750px"}}>

                        <div style={{ marginTop: "-5px" }}>
                            <DatosPersonales id={params.idAlumno} />
                        </div>

                        <div style={{ marginTop: "-770px" }}>
                            <PagosMensualesAlumnos id={params.idAlumno} />
                        </div>

                        <div style={{ marginTop: "-185px" }}>
                            <RutinaAlumno id={params.idAlumno} />
                        </div>

                        <div style={{ marginTop: "-180px" }}>
                            <TiendaProductos />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}