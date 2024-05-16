import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { MenuAlumno } from "./menuAlumno.jsx";

// Fecha
import moment from "moment";

export const HomeAlumno = () => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.clima()
    }, [])

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
                        Hola, {store.usuarioLogueado.nombre}
                    </h3>
                </div>
            </div>

        </div>
    )
}