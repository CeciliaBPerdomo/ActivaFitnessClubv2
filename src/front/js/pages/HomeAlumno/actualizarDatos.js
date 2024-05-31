import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const ActualizarDatos = ({ id }) => {
    const { actions, store } = useContext(Context)

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [direccion, setDireccion] = useState("")
    const [cedula, setCedula] = useState("")
    const [celular, setCelular] = useState("")
    const [correo, setCorreo] = useState("")
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [genero, setGenero] = useState("")
    const [fecha, setFecha] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            await actions.obtenerDatosAlumno_byId(id);

            setNombre(store.datos_alumno[0].nombre)
            setApellido(store.datos_alumno[0].apellido)
            setDireccion(store.datos_alumno[0].direccion)
            setCedula(store.datos_alumno[0].cedula)
            setCelular(store.datos_alumno[0].celular)
            setCorreo(store.datos_alumno[0].email)
            setPeso(store.datos_alumno[0].peso)
            setAltura(store.datos_alumno[0].altura)
            setGenero(store.datos_alumno[0].genero)
            setFecha(store.datos_alumno[0].fechanacimiento)
        };

        fetchData();
    }, [])

    return (
        <>
            {/* Boton de actualizar */}
            <button type="button" className="btn btn-outline-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa fa-pen"></i> Actualizar info personal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog border border-1 border-danger rounded-3" >
                    <div className="modal-content">

                        {/* Encabezado */}
                        <div className="modal-header" style={{ backgroundColor: "black" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "red" }}>
                                Hola {store.datos_alumno[0]?.nombre} 👋
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Body latino */}
                        <div className="modal-body" style={{ backgroundColor: "black" }}>
                            <div>
                                {/* Nombre */}
                                <div className="mb-4">
                                    <label className="mb-2">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                {/* Apellido */}
                                <div className="mb-4">
                                    <label className="mb-2">Apellido:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                    />
                                </div>

                                {/* Direccion */}
                                <div className="mb-4">
                                    <label className="mb-2">Dirección:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu dirección"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                {/* Cedula y celular */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="mb-2">Cédula:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu cédula"
                                            value={cedula}
                                            onChange={(e) => setCedula(e.target.value)}
                                        />
                                    </div>

                                    <div className="col">
                                        <label className="mb-2">Celular:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu celular"
                                            value={celular}
                                            onChange={(e) => setCelular(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Correo electronico */}
                                <div className="mb-4">
                                    <label className="mb-2">Correo (email):</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tu email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>

                                {/* Genero y fecha de cumple */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="mb-2">Género:</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={genero}
                                            onChange={(e) => setGenero(e.target.value)}
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
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Peso y altura */}
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className="mb-2">Peso:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Tu peso"
                                            value={peso}
                                            onChange={(e) => setPeso(e.target.value)}
                                        />
                                    </div>

                                    <div className="col">
                                        <label className="mb-2">Altura:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Tu altura"
                                            value={altura}
                                            onChange={(e) => setAltura(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* Botones */}
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