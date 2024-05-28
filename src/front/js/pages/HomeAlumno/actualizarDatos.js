import React from "react";

const ActualizarDatos = () => {
    return (
        <>
            {/* // <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-outline-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa fa-pen"></i> Actualizar info
            </button>

            {/* // <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog border border-1" >
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: "black" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "red" }}>
                                Hola, {store.alumno[0]?.nombre} {store.alumno[0]?.apellido}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ backgroundColor: "black" }}>
                            Hola
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "black" }}>
                            <button type="button" className="btn btn-outline-danger">Actualizar</button>
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActualizarDatos;