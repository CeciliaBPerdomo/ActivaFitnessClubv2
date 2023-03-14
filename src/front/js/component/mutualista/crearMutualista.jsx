import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearMutualista = () => {
  const { store, actions } = useContext(Context);
  let navegacion = useNavigate();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("")

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerMutualistas();
  }, []);

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

  const borrar = (e, id) => {
    e.preventDefault();
    if (actions.borrarMutualista(id)) {
      toast.error("🤚 Borrado con éxito", {
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

  // Buscador
  const buscar = async (valor) => {
    if (busqueda === "") {
        actions.obtenerMutualistas();
     } else {
   await actions.buscadorMutualista(valor);
 }
};

  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder="🔎 Buscar mutualista..."
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


        {/* Listado de mutualista */}
        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Dirección</th>
                <th scope="col">Teléfono</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.mutualistas.map((item, id) => ( 
                <tr key={id}>
                  <td>{item.nombre}</td>
                  <td>{item.direccion}</td>
                  <td>{item.telefono}</td>
                  <td>
                    <Link to={"/ModificarMutualista/" + item.id} style={{color: "white"}}> 
                      <i className="fa fa-pen"></i>
                     </Link>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash"
                     onClick={(e) => borrar(e, item.id)}
                    >
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
      <br />
    </>
  );
};
