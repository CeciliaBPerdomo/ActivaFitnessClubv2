import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearProveedor = () => {
  const { store, actions } = useContext(Context);

  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [observaciones, setObservaciones] = useState("")

  const guardar = async (e) => {
    e.preventDefault();

    if (nombre !== "" || rut !== "") {
      let resultado = await actions.crearProveedores(
        nombre,
        rut,
        direccion,
        telefono,
        email,
        observaciones
      )

      if (resultado === true) {
        toast.success("💪 Guardado con éxito", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });


        setNombre("")
        setRut("")
        setDireccion("")
        setObservaciones("")
        setEmail("")
        setTelefono("")

      } else {
        toast.error("No se puede guardar", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error("Faltan completar datos", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
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
        <h3 style={{ marginBottom: "15px" }}>
          Ingresar un nuevo proveedor
        </h3>
        <hr />
        <br />

        <form>
          <div className="row">
            {/* Nombre */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Nombre <i style={{ color: "red" }}>(Obligatorio)</i>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* RUT */}
            <div className="col">
              <label htmlFor="RUT" style={{ marginBottom: "10px" }}>
                RUT <i style={{ color: "red" }}>(Obligatorio)</i>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="RUT"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">

            {/* Direccion */}
            <div className="col">
              <label htmlFor="direccion" style={{ marginBottom: "10px" }}>
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

            {/* Telefono */}
            <div className="col">
              <label htmlFor="telefono" style={{ marginBottom: "10px" }}>
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

            {/* Email */}
            <div className="col">
              <label htmlFor="email" style={{ marginBottom: "10px" }}>
                Correo electrónico:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Observaciones */}
            <div className="col">
              <label htmlFor="observaciones" style={{ marginBottom: "10px" }}>
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
          </div>
          <br />
          <div style={{ marginTop: "15px", marginBottom: "35px" }}>
            <button
              type="submit"
              className="btn btn-outline-danger float-end w-25"

              onClick={(e) => guardar(e)}
            >
              Agregar
            </button>
          </div>
        </form>

      </div>
      <ToastContainer />
      <br />
    </>
  );
};
