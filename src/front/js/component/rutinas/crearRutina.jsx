import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { func } from "prop-types";

function CrearRutina() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [idUsuario, setIdUsuario] = useState("")

    useEffect(() => {
        const info = async () => {
            await actions.obtenerAlumnoId(parseInt(params.theid));
        };

        info();

        setIdUsuario(params.theid)
    }, []);

    const guardar = async (e) => {
        e.preventDefault()

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

        if (fechaFin != "" && fechaInicio != "") {
            let resultado = await actions.crearRutina(fechaInicio, fechaFin, idUsuario)
            if (resultado) {
                toast.success("💪 Rutina creada con éxito", {
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
            if (!fechaInicio) {
                mensaje("🖐️ Falta fecha de inicio de la rutina")
            }

            if (!fechaFin) {
                mensaje("🖐️ Falta fecha de finalización de la rutina")
            }
        }

    }

    return (
        <div className='container'>
            <h3 style={{ marginBottom: "25px" }}>Nueva rutina de: {store.alumno[0]?.nombre} {store.alumno[0]?.apellido}</h3>
            <hr />
            <br />

            <div className="row">
                {/* Fecha inicio */}
                <div className="col">
                    <label htmlFor="fechaInicio" style={{ marginBottom: "10px" }}>
                        Fecha de inicio <label style={{ color: "red" }}>(Obligatorio)</label>:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>

                {/* Fecha finalización */}
                <div className="col">
                    <label htmlFor="Fecha fin" style={{ marginBottom: "10px" }}>
                        Fecha finalización <label style={{ color: "red" }}>(Obligatorio)</label>:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </div>

                {/* Guardar nueva rutina*/}
                <div className="col align-middle" style={{ marginTop: "31px" }}>
                    <button className="btn btn-outline-danger" onClick={(e) => guardar(e)}>Crear nueva rutina</button>
                </div>
            </div>
            <hr />
            <ToastContainer />
        </div>
    )
}

export default CrearRutina