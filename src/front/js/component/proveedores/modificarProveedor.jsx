import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarProveedor = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);

  const [nombre, setNombre] = useState(store.proveedor[0]?.nombre);
  const [rut, setRut] = useState(store.proveedor[0]?.rut)
  const [direccion, setDireccion] = useState(store.proveedor[0]?.direccion)
  const [telefono, setTelefono] = useState(store.proveedor[0]?.telefono)
  const [email, setEmail] = useState(store.proveedor[0]?.mail)
  const [observaciones, setObservaciones] = useState(store.proveedor[0]?.observaciones)

  useEffect(() => {
    actions.obtenerProveedorId(parseInt(params.theid));
  }, []);

  const modificar = async (e) => {
    e.preventDefault();
    let id = parseInt(params.theid)

    let resultado = await actions.modificarProveedores(
      id,
      nombre,
      rut,
      direccion,
      telefono,
      email,
      observaciones
    )

    if (resultado === true) {
      toast.success("💪 Modificación realizada con éxito", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
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
          Modificar proveedor
        </h3>
        <hr />
        <br />
      
        <form>
          <div className="row">
            {/* Nombre */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                defaultValue={store.proveedor[0]?.nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* RUT */}
            <div className="col">
              <label htmlFor="RUT" style={{ marginBottom: "10px" }}>
                RUT:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="RUT"
                defaultValue={store.proveedor[0]?.rut}
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
                defaultValue={store.proveedor[0]?.direccion}
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
                defaultValue={store.proveedor[0]?.telefono}
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
                defaultValue={store.proveedor[0]?.mail}
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
                defaultValue={store.proveedor[0]?.observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div style={{ marginTop: "15px", marginBottom: "35px" }}>
            <button
              type="submit"
              className="btn btn-outline-danger float-end w-25"
              onClick={(e) => modificar(e)}
            >
              Modificar
            </button>
          </div>
        </form>

      </div>
      <ToastContainer />
      <br />
    </>
  );
};
