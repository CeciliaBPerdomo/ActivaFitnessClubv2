import React, { useEffect, useContext } from "react"
import { Context } from "../../store/appContext"
import { useParams } from "react-router-dom"

import Ejercicios_Rutina from "./ejercicios_rutina.jsx"

const VerEjerciciosRutina = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.obtenerRutina_IdRutina(params.theid)
    }, [])

    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>
                Rutina
            </h3>
            <hr />
            <br />

            <Ejercicios_Rutina ejercicios={store.ejercicios_rutina} />
        </div>
    )
}

export default VerEjerciciosRutina