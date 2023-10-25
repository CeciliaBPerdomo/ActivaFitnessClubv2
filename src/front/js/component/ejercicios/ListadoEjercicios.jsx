import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function ListadoEjercicios() {
    const { store, actions } = useContext(Context);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        actions.obtenerEjercicios();
    }, []);

    // Buscador de tipo de ejercicio
    const buscar = async (valor) => {
        if (busqueda === "") {
            await actions.obtenerEjercicios();
        } else {
            await actions.obtenerEjercicios();
            await actions.buscadorEjercicio(valor);
        }
    };

    // Borra un ejercicio
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
                actions.borrarEjercicio(id),
                    Swal.fire({
                        position: 'top-end',
                        title: 'Borrado!',
                        text: 'El ejercicio ha sido eliminado.',
                        icon: 'success'
                    }
                    )
            }
        })


    }

    return (
        <div className='container'>
            <div className="input-group mb-3 w-25 float-end">
                {/* Boton de busqueda */}
                <input
                    type="text"
                    className="form-control "
                    placeholder="🔎 Buscar ejercicio"
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

            <h3 style={{ marginBottom: "25px" }}>Ejercicios</h3>
            <hr />

            <div >
                <table className="table"
                    style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre
                                <button type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    style={{ marginLeft: "3px", fontSize: "12px" }}
                                    onClick={() => actions.ordenarEjerciciosAsc()}
                                >
                                    ↑
                                </button>
                                <button type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    style={{ marginLeft: "3px", fontSize: "12px" }}
                                    onClick={() => actions.ordenarEjerciciosDesc()}
                                >
                                    ↓
                                </button>
                            </th>

                            <th>Descripción</th>
                            <th>Tipo
                            <button type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    style={{ marginLeft: "5px", fontSize: "12px" }}
                                onClick={() => actions.ordenarEjerciciosTipoDesc()}
                                >
                                    ↑
                                </button>
                                <button type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    style={{ marginLeft: "5px", fontSize: "12px" }}
                                onClick={() => actions.ordenarEjerciciosTipoAsc()}
                                >
                                    ↓
                                </button>
                            </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.ejercicios.map((item, id) => (
                            <tr key={id}>
                                <td className="align-middle">
                                    <img src={item.foto} alt={item.nombre} style={{ width: "60px" }} />
                                </td>
                                <td className="align-middle text-center">{item.nombre}</td>
                                <td className="align-middle">{item.descripcion}</td>
                                <td className="align-middle text-center">{item.descripcionTipo}</td>
                                <td className="align-middle text-center">
                                    <Link to={"/individualEjercicio/" + item.id} style={{ color: "white" }}>
                                        <i className="fa fa-eye"></i>
                                    </Link>
                                </td>
                                <td className="align-middle text-center">
                                    <Link to={"/modificarEjercicio/" + item.id} style={{ color: "white" }}>
                                        <i className="fa fa-pen"></i>
                                    </Link>
                                </td>
                                <td className="align-middle text-center">
                                    <i className="fa fa-trash"
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

export default ListadoEjercicios