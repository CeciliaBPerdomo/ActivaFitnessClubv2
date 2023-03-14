import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearMetodos = () => {
  const { store, actions } = useContext(Context);
  let navegacion = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("");
  const [observaciones, setObservaciones] = useState("");


  useEffect(() => {
    actions.obtenerMetodos();
  }, []);

  const guardar = (e) => {
    e.preventDefault();

    if (actions.crearMetodos(tipo, observaciones)) {
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
    setTipo("");
    setObservaciones("");
  };

  const borrar = (e, id) => {
    e.preventDefault();
    if (actions.borrarMetodos(id)) {
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
           actions.obtenerMetodos();
        } else {
      await actions.buscadorMetodos(valor);
    }
  };


  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder="🔎 Buscar método de pago"
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

        {/* Listado de métodos de pago */}
        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Observaciones</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.metodos.map((item, id) => ( 
                <tr key={id}>
                  <td>{item.tipo}</td>
                  <td>{item.observaciones}</td>
                  <td>
                    <Link to={"/ModificarMetodos/" + item.id} style={{color: "white"}}> 
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
