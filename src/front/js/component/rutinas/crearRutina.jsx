import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CrearRutina() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [idUsuario, setIdUsuario] = useState("")
    let tabla = false

    useEffect(() => {
        const info = async () => {
            await actions.obtenerAlumnoId(parseInt(params.theid));

            let rutina = await actions.obtenerRutinas()

            if (!rutina) {
               let buscador = await actions.buscadorRutinas(parseInt(params.theid))
               if(buscador){
                tabla = true
               }
            }
        };

        info();

        setIdUsuario(params.theid) // Para guardar el id de usuario en la rutina
    }, []);

    // Crea una nueva rutina
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

    // Elimina una nueva rutina 
    const eliminar = async(id) => {

    }

    return (
        <div className='container'>
            <h3 style={{ marginBottom: "25px" }}>Rutina de: {store.alumno[0]?.nombre} {store.alumno[0]?.apellido}</h3>
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

            <br />
            <div>
                <h5 style={{ marginBottom: "25px" }}><u>Listado de rutinas</u></h5>
                { !tabla ? 
                <table className="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Fecha de finalización</th>
                            <th scope="col">Fecha de inicio</th>
                            {/* Modificar */}
                            <th scope="col"></th>
                             {/* Ver */}
                             <th scope="col"></th>
                            {/* Borrar */}
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {store.rutinas.map((item, id) => (
                            <tr key={id}>
                                <td>{item.fechafinalizacion.slice(5, 16)}</td>
                                <td>{item.fechacomienzo.slice(5, 16)}</td>
                                <td><i className="fa fa-eye"></i></td>
                                <td><i className="fa fa-pen"></i></td>
                                <td><i className="fa fa-trash"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <p>No hay rutinas para este alumno</p>
            }
            </div>

            <ToastContainer />
        </div>
    )
}

export default CrearRutina