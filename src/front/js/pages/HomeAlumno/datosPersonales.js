import React, { useContext } from "react";
import { Context } from "../../store/appContext";

const DatosPersonales = ({alumno}) => {
    const { actions, store } = useContext(Context)
    console.log(alumno)
    return (
        <div className={store.estadoDatosPersonales}>
            <h5>Mi información personal</h5>
            <hr />
        </div>
    )
}

export default DatosPersonales