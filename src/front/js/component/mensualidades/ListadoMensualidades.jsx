import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export const ListadoMensualidades = () => {
  const { store, actions } = useContext(Context);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerMensualidades();
  }, []);

  const borrar = (e, id) => {
    e.preventDefault();
    if (actions.borrarMensualidad(id)) {
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
          actions.obtenerMensualidades();
       } else {
     await actions.buscadorMensualidad(valor);
   }
  };

  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder="🔎 Buscar factura..."
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
        <h3 style={{ marginBottom: "25px" }}>Pago de mensualidades</h3>
        <hr />
        <br />

        {/* Listado de mensualidades */}
        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Fecha de pago</th>
                <th scope="col">Alumno</th>
                <th scope="col">Factura</th>
                <th scope="col">Monto</th>
                <th scope="col">Observaciones</th>
                <th scope="col" className="text-center"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.pagos.map((item, id) => (
                <tr key={id}>
                  <td>{ item.fechapago
                  // (new Date(item.fechapago).getDate() + 1)
                  // + "/" + 
                  // (new Date(item.fechapago).getMonth() + 1)
                  // + "/" + 
                  // (new Date(item.fechapago).getFullYear())
                  }
                  </td>
                  <td>{item.alumnoInfo.nombre} {item.alumnoInfo.apellido}</td>
                  <td>{item.factura}</td>
                  <td>$ {item.monto}</td>
                  <td>{item.observaciones}</td>
                  <td>
                    <Link to ={"/ModificarMensualidad/" + item.id} style={{color: "white"}}>
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
