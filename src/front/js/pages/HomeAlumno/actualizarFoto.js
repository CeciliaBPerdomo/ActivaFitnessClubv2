import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const ActualizarFoto = ({ id }) => {
    const { actions, store } = useContext(Context)

    const [motivo, setMotivo] = useState("")
    const [condiciones, setCondiciones] = useState("")
    const [emergencia, setEmergencia] = useState("")
    const [idMutualista, setidMutualista] = useState("")
    const [medicacion, setMedicacion] = useState("")
    const [observaciones, setObservaciones] = useState("")

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

    const [idCuota, setIdCuota] = useState("")
    const [rol, setRol] = useState("")
    const [fechaIngreso, setFechaIngreso] = useState("")
    const [foto, setFoto] = useState("")


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await actions.obtenerDatosAlumno_byId(id);

        setMotivo(store.datos_alumno[0].motivoentrenamiento)
        setCondiciones(store.datos_alumno[0].condicionesmedicas)
        setEmergencia(store.datos_alumno[0].emergencias)
        setidMutualista(store.datos_alumno[0].idMutualista)
        setMedicacion(store.datos_alumno[0].medicacion)
        setObservaciones(store.datos_alumno[0].observaciones)

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

        setIdCuota(store.datos_alumno[0].idCuota)
        setRol(store.datos_alumno[0].rol)
        setFechaIngreso(store.datos_alumno[0].fechaingreso)
        setFoto(store.datos_alumno[0].foto)
    };

    const actualizarDatos = async (e) => {
        e.preventDefault()
        await actions.modificarAlumno_desdeAdmin(id, cedula, nombre, apellido,
            direccion, celular, fecha, peso, altura, correo,
            idMutualista, condiciones, medicacion, emergencia, motivo,
            idCuota, rol, genero, observaciones, fechaIngreso, foto)
        await actions.obtenerDatosAlumno_byId(id)
    }

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