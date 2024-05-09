import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function CrearRutina() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [idUsuario, setIdUsuario] = useState("")

    useEffect(() => {
        const info = async () => {
            // Datos del alumno --> Nombre en titulo
            await actions.obtenerAlumnoId(parseInt(params.theid));
            await actions.obtenerRutina_IdUsuario(parseInt(params.theid))
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
            await actions.obtenerRutina_IdUsuario(idUsuario)
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
    const eliminar = async (e, id) => {
        e.preventDefault()
        Swal.fire({
            position: 'top-end',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            title: '¿Estás seguro?',
            text: "No podrás recuperar la info luego!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No!'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminar(),
                    Swal.fire({
                        position: 'top-end',
                        title: 'Borrado!',
                        text: 'La rutina ha sido eliminada.',
                        icon: 'success'
                    }
                    ) 
                    
            }
        })

        const eliminar = async () => {
            let resp = await actions.borrarRutina(id)
            if (resp){
                await actions.obtenerRutina_IdUsuario(idUsuario)
            }
        }
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
                <h5 style={{ marginBottom: "25px", color: "red" }}><u>Rutinas</u></h5>

                <table className="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Fecha de finalización</th>
                            <th scope="col" className="text-center">Fecha de inicio</th>
                            {/* Modificar */}
                            <th scope="col" className="text-center">Ver rutina</th>
                            {/* Ver */}
                            <th scope="col" className="text-center">Agregar / Modificar ejercicios</th>
                            {/* Borrar */}
                            <th scope="col" className="text-center">Eliminar rutina</th>
                        </tr>
                    </thead>

                    <tbody>
                        {store.rutinas.map((item, id) => (
                            <tr key={id}>
                                <td className="text-center align-middle">{item.fechafinalizacion.slice(5, 16)}</td>
                                <td className="text-center align-middle">{item.fechacomienzo.slice(5, 16)}</td>
                                <td className="text-center align-middle">
                                    <Link to={"/VerEjerciciosRutina/" + item.idRutina}>
                                        <i className="fa fa-eye" style={{ color: "white" }}></i>
                                    </Link>
                                </td>
                                <td className="text-center align-middle">
                                    <Link to={"/AgregarEjerciciosRutina/" + item.idRutina}>
                                        <i className="fa fa-pen" style={{ color: "white" }}></i>
                                    </Link>
                                </td>
                                <td className="text-center align-middle">
                                    <i className="fa fa-trash" 
                                    onClick={(e) => eliminar(e, item.idRutina)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* : <p>No hay rutinas para este alumno</p>
            } */}
            </div>

            <ToastContainer />
        </div>
    )
}

export default CrearRutina