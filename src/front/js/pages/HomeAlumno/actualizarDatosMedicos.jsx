import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const ActualizarDatosMedicos = ({ id }) => {
    const { actions, store } = useContext(Context)

    const [motivo, setMotivo] = useState("")
    const [condiciones, setCondiciones] = useState("")
    const [emergencia, setEmergencia] = useState("")
    const [idMutualista, setidMutualista] = useState("")
    const [mutualista, setMutualista] = useState("")
    const [medicacion, setMedicacion] = useState("")
    const [observaciones, setObservaciones] = useState("")

    useEffect(() => {
        fetchData();
        fetchMutualista()
    }, [])

    const fetchData = async () => {
        await actions.obtenerDatosAlumno_byId(id);

        setMotivo(store.datos_alumno[0].motivoentrenamiento)
        setCondiciones(store.datos_alumno[0].condicionesmedicas)
        setEmergencia(store.datos_alumno[0].emergencias)
        setMutualista(store.datos_alumno[0].nombreMutualista)
        setidMutualista(store.datos_alumno[0].idMutualista)
        setMedicacion(store.datos_alumno[0].medicacion)
        setObservaciones(store.datos_alumno[0].observaciones)
    };


    const fetchMutualista = async () => {
        await actions.obtenerMutualistas()
    }


    const actualizarDatos = async (e) => {
        e.preventDefault()
        await actions.modificarAlumno(id, motivo, condiciones, emergencia, parseInt(idMutualista), medicacion, observaciones)
        await actions.obtenerDatosAlumno_byId(id)
    }

    return (
        <div>
            {/* Boton de actualizar */}
            <button type="button" className="btn btn-outline-danger float-end"
                data-bs-toggle="modal" data-bs-target="#modal_medicos">
                <i className="fa fa-pen"></i> Actualizar datos médicos
            </button>

            {/* Modal */}
            <div className="modal fade" id="modal_medicos"
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
                            <div>
                                {/* Motivo entrenamiento */}
                                <div className="mb-4">
                                    <label className="mb-2">Motivo entrenamiento:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={motivo}
                                        onChange={(e) => setMotivo(e.target.value)}
                                    />
                                </div>

                                {/* Condiciones medicas */}
                                <div className="mb-4">
                                    <label className="mb-2">Condiciones médicas:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={condiciones}
                                        onChange={(e) => setCondiciones(e.target.value)}
                                    />
                                </div>

                                {/* Emergencias */}
                                <div className="mb-4">
                                    <label className="mb-2">Emergencias:</label>
                                    <input
                                    maxLength={15}
                                        type="text"
                                        className="form-control"
                                        value={emergencia}
                                        onChange={(e) => setEmergencia(e.target.value)}
                                    />
                                </div>

                                {/* Mutualista */}
                                <div className="mb-4">
                                    <label className="mb-2">Mutualista:</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        defaultValue={mutualista}
                                        onChange={(e) => setidMutualista(e.target.value)}
                                    >
                                        <option selected>{mutualista}</option>
                                        {store.mutualistas.map((item, id) => (
                                            <option key={id} value={item.id}>{item.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Medicacion */}
                                <div className="mb-4">
                                    <label className="mb-2">Medicación:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={medicacion}
                                        onChange={(e) => setMedicacion(e.target.value)}
                                    />
                                </div>

                                {/* Comentarios */}
                                <div className="mb-4">
                                    <label className="mb-2">Comentarios:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={observaciones}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Botones */}
                        <div className="modal-footer" style={{ backgroundColor: "black" }}>
                            <button type="button" onClick={(e) => actualizarDatos(e)} className="btn btn-outline-danger" data-bs-dismiss="modal">Actualizar</button>
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActualizarDatosMedicos