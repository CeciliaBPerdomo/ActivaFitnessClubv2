import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

// Alerta
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validacion de formulario
import { useForm } from "react-hook-form"

function IngresarTipoEjercicio() {
    const { store, actions } = useContext(Context);
    const [descripcion, setDescripcion] = useState("");

    // Validacion de formulario
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onFormSubmit = data => console.log(data);
    const onErrors = errors => console.error(errors);


    // Guarda la info
    const guardar = async (e) => {
        e.preventDefault();

        if (descripcion !== "") {

            let resultado = await actions.crearTipoEjercicio(descripcion)

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
                setDescripcion("");

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
            toast.error("Debes ingresar la descripción", {
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
            <h3 style={{ marginBottom: "25px" }}>Tipos de Ejercicios</h3>
            <hr />
            <br />
            <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="descripcion"
                            style={{ marginBottom: "10px" }}>
                            Descripción <label style={{ color: "red" }}>(Obligatorio)</label>:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        <button
                            type="submit"
                            className="btn btn-outline-danger float-end w-25"
                            onClick={(e) => guardar(e)}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </form>
            <br />
            <ToastContainer />

        </div>
    )
}

export default IngresarTipoEjercicio