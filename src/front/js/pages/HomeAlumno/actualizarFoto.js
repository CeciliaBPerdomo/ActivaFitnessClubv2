import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const ActualizarFoto = ({ id }) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await actions.obtenerDatosAlumno_byId(id);
    };

    return (
        <div style={{ marginTop: "10px" }}>

            {/* Boton de actualizar */}
            <button type="button" className="btn btn-outline-danger float-end" data-bs-toggle="modal" data-bs-target="#modal_foto">
                <i className="fa fa-pen"></i> Actualizar foto de perfil
            </button>

            <div className="modal fade" id="modal_foto"
                tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog border border-1 border-danger rounded-3" >
                    <div className="modal-content">

                        {/* Encabezado */}
                        <div className="modal-header" style={{ backgroundColor: "black" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "red" }}>
                                Hola {store.datos_alumno[0]?.nombre} 👋
                            </h1>
                        </div>

                        {/* Body latino */}
                        <div className="modal-body" style={{ backgroundColor: "black" }}>
                            <p>En breve estará disponible esta funcionalidad.</p>
                        </div>

                        {/* Botones */}
                        <div className="modal-footer" style={{ backgroundColor: "black" }}>
                            <button
                                type="button"
                                // onClick={(e) => actualizarDatos(e)} 
                                className="btn btn-outline-danger"
                                data-bs-dismiss="modal">
                                Actualizar
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal">
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ActualizarFoto