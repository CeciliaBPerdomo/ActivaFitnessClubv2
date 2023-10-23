import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";

// Alerta
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ModificarTipoEjercicio() {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [descripcion, setDescripcion] = useState(store.tipoEjercicio?.descripcion);

    useEffect(() => {
        actions.obtenerTipoEjercicioId(parseInt(params.theid));
    }, []);

    const modificar = async (e) => {
        e.preventDefault();
        let id = parseInt(params.theid)

        if (descripcion != "") {
            let resultado = await actions.modificarTipoEjercicio(
                id,
                descripcion
            )

            if (resultado === true) {
                toast.success("💪 Modificación realizada con éxito", {
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
                toast.error("No se pudo realizar la modificación", {
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
        } 
    };

    return (
        <div className='container'>
            <h3 style={{ marginBottom: "25px" }}>Modificar tipo de ejercicio</h3>
            <hr />
            <br />

            <form>
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
                            defaultValue={store.tipoEjercicio?.descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        <button
                            type="submit"
                            className="btn btn-outline-danger float-end w-25"
                            onClick={(e) => modificar(e)}
                        >
                            Modificar
                        </button>
                    </div>
                </div>
            </form>

            <br />
            <ToastContainer />
        </div>
    )
}

export default ModificarTipoEjercicio