import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarCuota = () => {
    const params = useParams();
    const {store, actions} = useContext(Context);
  
    const [descripcion, setDescripcion] = useState(store.cuota.descripcion);
    const [precio, setPrecio] = useState(store.cuota.precio);

    
    useEffect(() => {
        actions.obtenerCuotaId(parseInt(params.theid));
    }, []);

    const modificar = (e) => {
        e.preventDefault()
        let id = parseInt(params.theid)

        if (actions.modificarAlumno(id, descripcion, precio)){
            toast.success("💪 Modificación realizada con éxito", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // setInterval(() => {
            //     navegacion("/CrearCuota");
            // }, 5000);
        }
    }

    return(
        <>
        <div className="container">
        <h3 style={{ marginBottom: "15px" }}>Modificación de las mensualidades</h3>
        <hr /> 
        <br /> 
            <form>
                <div className="row">
                    <div className="col">
                    <label htmlFor="descripcion" style={{ marginBottom: "10px" }}>
                        Descripción:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Descripción"
                        defaultValue={store.cuota.descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    </div>
                    <div className="col">
                    <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                        Precio:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Precio"
                        defaultValue={store.cuota.precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    </div>
                </div>
                <div style={{ marginTop: "15px", marginBottom: "25px" }}>
              <button
                type="submit"
                className="btn btn-outline-danger float-end w-25"
                onClick={(e) => modificar(e)}
              >
                Actualizar
              </button>
            </div>
            </form>
        </div>
        <ToastContainer />
        <br />
        </>
    )
}