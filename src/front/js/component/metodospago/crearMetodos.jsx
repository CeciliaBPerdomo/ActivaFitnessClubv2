import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearMetodos = () => {
  const { store, actions } = useContext(Context);
  const [tipo, setTipo] = useState("");
  const [observaciones, setObservaciones] = useState("");


  const guardar = async (e) => {
    e.preventDefault();

    if (tipo !== ""){
    let resultado = await actions.crearMetodos(tipo, observaciones)
    if (resultado === true) {
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
      setTipo("");
    setObservaciones("");
    } else {
      toast.error("No se pudo guardar", {
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
  } else {
    toast.error("Debe ingresar el tipo de método", {
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
  };

  return (
    <>
      <div className="container">
     
        <h3 style={{ marginBottom: "25px" }}>Métodos de pago</h3>
        <hr />
        <br />

        {/* Formulario de alta */}
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="descripcion" style={{ marginBottom: "10px" }}>
                Tipo:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                Observaciones:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
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

       
      </div>
      <ToastContainer />
      <br />
    </>
  );
};
