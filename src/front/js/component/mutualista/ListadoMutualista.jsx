import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListadoMutualista = () => {
  const { store, actions } = useContext(Context);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerMutualistas();
  }, []);

  // Eliminar  
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

        <ToastContainer />
      <br />
      </div>
    </>
    )
}