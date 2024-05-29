import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

const ActualizarDatos = () => {
    const { actions, store } = useContext(Context)

    return (
        <>
            {/* Boton de actualizar */}
            <button type="button" className="btn btn-outline-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa fa-pen"></i> Actualizar info
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog border border-1" >
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: "black" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "red" }}>
                                Hola, {store.alumno[0]?.nombre}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ backgroundColor: "black" }}>
                            <div>
                                <div className="mb-4">
                                    <label className="mb-2">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu nombre"
                                    // value={direccion}
                                    // onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Apellido:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu apellido"
                                    // value={direccion}
                                    // onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="mb-2">Cédula:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu cédula"
                                        // value={direccion}
                                        // onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>

                                    <div className="col">
                                        <label className="mb-2">Celular:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu celular"
                                        // value={direccion}
                                        // onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Correo (email):</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu email"
                                    // value={direccion}
                                    // onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="mb-2">Género:</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                        // value={activo}
                                        // onChange={(e) => setActivo(e.target.value)}
                                        >
                                            <option>Género</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label className="mb-2">Fecha de nacimiento:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Tu cédula"
                                        // value={direccion}
                                        // onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="mb-2">Peso:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Tu peso"
                                        // value={direccion}
                                        // onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>

                                    <div className="col">
                                        <label className="mb-2">Áltura:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Tu áltura"
                                        // value={direccion}
                                        // onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Dirección:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu dirección"
                                    // value={direccion}
                                    // onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                            </div>

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