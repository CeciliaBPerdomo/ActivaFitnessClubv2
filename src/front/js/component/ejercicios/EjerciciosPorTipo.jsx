import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function EjerciciosPorTipo() {
    const { store, actions } = useContext(Context);
    const [idTipo, setIdTipo] = useState("")
    const [resultados, setResultados] = useState(false)

    useEffect(() => {
        actions.obtenerEjercicios();
        actions.obtenerTipoDeEjercicios();
    }, []);

    // Buscador de tipo de ejercicio
    const buscar = async (valor) => {
        console.log(valor)
        if (idTipo === "") {
            toast.error("Debe seleccionar un tipo de ejercicio, boboncho", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            await actions.obtenerEjercicios();
            let resp = await actions.buscadorEjercicioPorTipo(valor);
            setResultados(resp)
        }
    };

    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Ejercicios</h3>
            <hr />

            <div className="container">
                {store.tiposEjercicios ?
                    <div className="row">
                        <div className="col-2">
                            Seleccione el tipo de ejercicio:
                        </div>
                        <div className="col">
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
                        <div className="col">
                            <button
                                type="submit"
                                className="btn btn-outline-danger"
                                onClick={(e) => buscar(idTipo)}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    : <p>No hay tipos de ejercicios especificados</p>}
                <hr />

                {resultados ?
                    <div >
                        <table className="table" style={{ color: "white" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                   
                                    {/* <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th> */}
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
                                        {/* <td className="align-middle text-center">
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
                                </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <p>No hay ejercicios para este tipo especifico</p>}
            </div>
            <ToastContainer />
        </div>
    )
}

export default EjerciciosPorTipo