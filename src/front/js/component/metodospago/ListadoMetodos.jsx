import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListadoMetodos = () => {
  const { store, actions } = useContext(Context);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerMetodos();
  }, []);

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
      
        <ToastContainer />
      <br />
        </div>
    </>
  )
}