import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearMutualista = () => {
  const { store, actions } = useContext(Context);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("")


  const guardar = (e) => {
    e.preventDefault();

    if (actions.crearMutualista(nombre, direccion, telefono)) {
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
    setNombre("");
    setDireccion("");
    setTelefono("")
  };

 
  return (
    <>
      <div className="container">
        
        <h3 style={{ marginBottom: "25px" }}>Mutualistas</h3>
        <hr />
        <br />

        {/* Formulario de alta */}
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="Nombre:" style={{ marginBottom: "10px" }}>
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="Direccion" style={{ marginBottom: "10px" }}>
                Dirección:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="Telefono" style={{ marginBottom: "10px" }}>
                Teléfono:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="row">
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
