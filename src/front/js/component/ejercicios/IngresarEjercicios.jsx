import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function IngresarEjercicios() {
    const { store, actions } = useContext(Context);

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [idTipo, setIdTipo] = useState("")
    const [foto, setFoto] = useState("")
    const [video, setVideo] = useState("")


    useEffect(() => {
        actions.obtenerTipoDeEjercicios();
    }, []);

    // Guarda la info
    const guardar = async (e) => {
        e.preventDefault();

        if (descripcion != "" && nombre != "" && idTipo != "") {

            let resultado = await actions.crearEjercicio(nombre, descripcion, foto, video, idTipo)

            if (resultado === true) {
                toast.success("💪 Guardado con éxito", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                /* Limpiar el formulario */
                setNombre("")
                setDescripcion("")
                setFoto("")
                setVideo("")
                setIdTipo("")

            } else {
                toast.error("No se pudo guardar", {
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
        } else {
            toast.error("Debes ingresar la información obligatoria", {
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
    };


    return (
        <div className='container'>
            <h3 style={{ marginBottom: "25px" }}>Ejercicios</h3>
            <hr />
            <br />

            <form>
                <div className="row">
                    {/* Nombre */}
                    <div className="col">
                        <label htmlFor="alumno" style={{ marginBottom: "10px" }}>
                            Nombre <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del ejercicio"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                </div>
                <br />
                <div className="row">
                    {/* Descricpcion */}
                    <div className="col">
                        <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                            Descripción <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <textarea
                            type="text"
                            rows="2"
                            className="form-control"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                </div>

                <br />
                <div className="row">

                    {/* Tipo de ejercicio */}
                    <div className="col">
                        <label htmlFor="metodo" style={{ marginBottom: "10px" }}>
                            Tipo de Ejercicio <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <select className="form-select"
                            value={idTipo}
                            onChange={(e) => setIdTipo(e.target.value)}
                        >
                            <option selected>Tipo de Ejercicio</option>
                            {store.tiposEjercicios.map((item, id) => (
                                <option key={id} value={item.id}>
                                    {item.descripcion}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Foto */}
                    <div className="col">
                        <label htmlFor="Foto" style={{ marginBottom: "10px" }}>
                            Foto:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="URL de Foto"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                        />
                    </div>

                    {/* Video */}
                    <div className="col">
                        <label htmlFor="Video" style={{ marginBottom: "10px" }}>
                            Video:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Video"
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
                        />
                    </div>


                </div>

                <br />


                <br />
                <div style={{ marginBottom: "70px" }}>
                    <button
                        type="submit"
                        className="btn btn-outline-danger float-end"
                        onClick={(e) => guardar(e)}
                    >
                        Guardar
                    </button>
                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

export default IngresarEjercicios