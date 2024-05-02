import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function ListadoTipoEjercicios() {
    const { store, actions } = useContext(Context);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        actions.obtenerTipoDeEjercicios();
    }, []);

    // Borra un tipo de ejercicio
    const borrar = (e, id) => {
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
                actions.borrarTipoEjercicio(id),
                    Swal.fire({
                        position: 'top-end',
                        title: 'Borrado!',
                        text: 'El tipo de ejercicio ha sido eliminado.',
                        icon: 'success'
                    }
                    )
            }
        })
    }

    // Buscador de tipo de ejercicio
    const buscar = async (valor) => {
        if (busqueda === "") {
            await actions.obtenerTipoDeEjercicios();
        } else {
            await actions.obtenerTipoDeEjercicios();
            await actions.buscadorTipoEjercicio(valor);
        }
    };

    return (
        <div className='container'>
            <div className="input-group mb-3 w-25 float-end">
                {/* Boton de busqueda */}
                <input
                    type="text"
                    className="form-control "
                    placeholder="🔎 Buscar tipo de ejercicio"
                    onChange={(e) => setBusqueda(e.target.value)}
                    value={busqueda}
                />
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    id="button-addon2"
                    onClick={(e) => buscar(busqueda)}
                >
                    Buscar
                </button>
            </div>

            <h3 style={{ marginBottom: "25px" }}>Tipos de ejercicios</h3>
            <hr />

            <div style={{ marginLeft: "45px" }}>
                <table className="table border"
                    style={{ color: "white", width: "500px" }}>
                    <thead>
                        <tr>
                            <th scope="col"><b>Descripción</b></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.tiposEjercicios.map((item, id) => (
                            <tr key={id}>
                                <td>{item.descripcion}</td>
                                <td>
                                    <Link to={"/ModificarTipoEjercicios/" + item.id} style={{ color: "white" }}>
                                        <i className="fa fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <i
                                        className="fa fa-trash"
                                        onClick={(e) => borrar(e, item.id)}
                                    >
                                    </i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </div>
    )
}

export default ListadoTipoEjercicios