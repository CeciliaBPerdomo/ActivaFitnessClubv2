import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const ActualizarFoto = ({ id }) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        const fetchData = async () => {
            await actions.obtenerDatosAlumno_byId(id);

        };

        fetchData();
    }, [])

    return (
        <div style={{marginTop: "10px"}}>

            {/* Boton de actualizar */}
            <button type="button" className="btn btn-outline-danger float-end"
                data-bs-toggle="modal" data-bs-target="#modal_foto">
                <i className="fa fa-pen"></i> Actualizar foto de perfil
            </button>
            
        </div>
    )
}

export default ActualizarFoto