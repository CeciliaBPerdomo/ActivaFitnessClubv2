import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearCuota = () => {
  const { store, actions } = useContext(Context);
  let navegacion = useNavigate();

  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerCuotas();
  }, []);

  // Buscador
  const buscar = async (valor) => {
    if (busqueda === "") {
      actions.obtenerCuotas();
    } else {
      await actions.buscadorCuota(valor);
    }
  };

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

  const borrar = (e, id) => {
    e.preventDefault();
    if (actions.borrarCuotas(id)) {
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

  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder="🔎 Buscar disciplina"
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
        <hr />

        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.cuotas.map((item, id) => (
                <tr key={id}>
                  <td>{item.descripcion}</td>
                  <td>$ {item.precio}</td>
                  <td>
                    <Link to={"/ModificarCuota/" + item.id} style={{color: "white"}}>
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
        <ToastContainer />
      </div>
    </>
  );
};
