import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearCuota = () => {
  const { store, actions } = useContext(Context);

  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const guardar = (e) => {
    e.preventDefault();

    if (actions.crearCuota(descripcion, precio)) {
      toast.success("💪 Guardado con éxito", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    /* Limpiar el formulario */
    setDescripcion("");
    setPrecio("");
  };

  
  return (
    <>
      <div className="container">
       
        <h3 style={{ marginBottom: "25px" }}>Valor de las mensualidades</h3>
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
                value={descripcion}
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
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
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
    </>
  );
};
