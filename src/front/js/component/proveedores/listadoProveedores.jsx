import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListadoProveedores = () => {
  const { store, actions } = useContext(Context);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerProveedores();
  }, []);

  const borrar = async (e, id) => {
    e.preventDefault();

    let resultado = await actions.borrarProveedores(id)
    if (resultado === true) {
      toast.success("🤚 Borrado con éxito", {
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
      toast.error("No se puede borrar", {
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

  // Buscador
  const buscar = async (valor) => {
    if (busqueda === "") {
      await actions.obtenerProveedores();
    } else {
      await actions.obtenerProveedores();
      await actions.buscadorProveedor(valor);
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder="🔎 Buscar proveedor..."
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

        <h3 style={{ marginBottom: "25px" }}>Proveedores</h3>
        <hr />
        <br />

        {/* Listado de productos */}
        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">RUT</th>
                <th scope="col">Dirección</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Mail</th>
                <th scope="col" className="text-center">+ Info</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.proveedores.map((item, id) => (
                <tr key={id}>
                  <td>{item.nombre}</td>
                  <td>{item.rut}</td>
                  <td>{item.direccion}</td>
                  <td>{item.telefono}</td>
                  <td>{item.mail}</td>
                  <td className="text-center">
                    <Link
                      to={"/ProveedorDetalle/" + item.id}
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={"/ModificarProveedor/" + item.id}
                      style={{ color: "white" }}
                    >
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