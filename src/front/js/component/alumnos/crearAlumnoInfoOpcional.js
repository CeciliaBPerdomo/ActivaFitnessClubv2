import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const InfoAdicional = () => {
    const { actions, store } = useContext(Context)
    const navigate = useNavigate()

    const { id } = useParams()

    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [celular, setCelular] = useState("");
    const [fechanacimiento, setFechaNacimiento] = useState("");
    const [ingreso, setIngreso] = useState("");
    const [genero, setGenero] = useState("");
    const [email, setEmail] = useState("");
    const [mutualista, setMutualista] = useState("");
    const [condiciones, setCondiciones] = useState("");
    const [cuota, setCuota] = useState(""); //Modalidad de entrenamiento
    const [rol, setRol] = useState("");

    // Modificaciones 
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [medicacion, setMedicacion] = useState("");
    const [emergencias, setEmergencias] = useState("");
    const [motivo, setMotivo] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [foto, setFoto] = useState("");


    useEffect(() => {
        obtenerInfo()
    }, [])

    const obtenerInfo = async () => {
        await actions.obtenerAlumnoId(id)

        setNombre(store.alumno[0]?.nombre)
        setApellido(store.alumno[0]?.apeliido)
        setCedula(store.alumno[0]?.cedula)
        setCelular(store.alumno[0]?.celular)
        setDireccion(store.alumno[0]?.direccion)

        setFechaNacimiento(store.alumno[0]?.fechanacimiento)
        setIngreso(store.alumno[0]?.fechaingreso)
        setGenero(store.alumno[0]?.genero)
        setEmail(store.alumno[0]?.email)
        setMutualista(store.alumno[0]?.idmutualista)
        setCondiciones(store.alumno[0]?.condicionesmedicas)
        setCuota(store.alumno[0]?.cuotasInfo.id) //Modalidad de entrenamiento
        setRol(store.alumno[0]?.rol)
    }

    const omitirInfo = (e) => {
        e.preventDefault(e)
        navigate("/homeAdministrador")
    }


    // Mensaje de error cuando faltan datos
    function mensaje(texto) {
        toast.error(texto, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    const actualizarInfo = async (e) => {
        e.preventDefault()
        let resp = await actions.modificarAlumno_desdeAdmin(id, cedula,
            nombre, apellido, direccion, celular, fechanacimiento, peso, altura, email,
            mutualista, condiciones, medicacion, emergencias, motivo, cuota, rol,
            genero, observaciones, ingreso, foto)
        if (resp == true) {
            navigate("/homeAdministrador")
        } else {
            mensaje("No se pudo actualizar")
        }
    }

    return (
        <div className="container">
            <h3 style={{ marginBottom: "10px" }}>Ingresar alumnos
                <span style={{ fontSize: "16px" }}>  ➤ Información adicional</span>
                <button
                    className="btn btn-outline-secondary float-end"
                    onClick={(e) => omitirInfo(e)}
                >
                    Omitir
                </button>
            </h3>
            <hr />


            <form className="border border-1 border-danger" style={{ padding: "10px" }}>
                <div className="row">

                    {/* Peso */}
                    <div className="col-2">
                        <label htmlFor="Peso" style={{ marginBottom: "10px" }}>
                            Peso:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Peso"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                        />
                    </div>

                    {/* Altura */}
                    <div className="col-2">
                        <label htmlFor="Altura" style={{ marginBottom: "10px" }}>
                            Altura:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Altura"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                        />
                    </div>

                    {/* Foto */}
                    <div className="col">
                        <label htmlFor="foto" style={{ marginBottom: "10px" }}>
                            Foto:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Foto (URL)"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                        />
                    </div>
                </div>
                <br />

                <div className="row">


                    {/* Medicaciones */}
                    <div className="col">
                        <label htmlFor="medicacion" style={{ marginBottom: "10px" }}>
                            Medicación:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Si toma algún médicamento"
                            value={medicacion}
                            onChange={(e) => setMedicacion(e.target.value)}
                        />
                    </div>

                    {/* Emergencias */}
                    <div className="col">
                        <label htmlFor="emergencias" style={{ marginBottom: "10px" }}>
                            Emergencias:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Telefono en caso de emergencia"
                            value={emergencias}
                            onChange={(e) => setEmergencias(e.target.value)}
                        />
                    </div>
                </div>
                <br />

                <div className="row">
                    {/* Motivo */}
                    <div className="col">
                        <label htmlFor="motivo" style={{ marginBottom: "10px" }}>
                            Motivo del entrenamiento:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Motivo del entrenamiento"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                    </div>
                    {/* Observaciones */}
                    <div className="col">
                        <label htmlFor="observaciones" style={{ marginBottom: "10px" }}>
                            Observaciones:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                        />
                    </div>
                </div>
                <br />
            </form>

            <div className="guardar" style={{ marginTop: "15px", marginBottom: "75px" }}>
                <button
                    type="button"
                    className="btn btn-outline-success float-end w-25"
                    onClick={(e) => actualizarInfo(e)}
                >
                    Actualizar info alumno
                </button>

            </div>

            <ToastContainer />

        </div>
    )
}