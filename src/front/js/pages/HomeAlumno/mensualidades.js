import React, { useContext } from "react";
import { Context } from "../../store/appContext";

const PagosMensualesAlumnos = () => {
    const { actions, store } = useContext(Context)
    // console.log(alumno)
    return (
        <div className={store.estadoPagosPersonales}>
            <h5>Mis pagos mensuales</h5>
            <hr />
        </div>
    )
}

export default PagosMensualesAlumnos