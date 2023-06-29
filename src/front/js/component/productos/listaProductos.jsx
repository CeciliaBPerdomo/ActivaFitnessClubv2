import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListadoProductos = () => {
  const { store, actions } = useContext(Context);
  let navegacion = useNavigate();

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerProductos();
  }, []);

  const borrar = (e, id) => {
    e.preventDefault();
    if (actions.borrarProductos(id)) {
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
      await actions.obtenerProductos();
   } else {
      await actions.obtenerProductos();
      await actions.buscadorProductos(valor);
   }
};

  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder="🔎 Buscar producto..."
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

        <h3 style={{ marginBottom: "25px" }}>Productos</h3>
        <hr />
        <br />

        {/* Listado de productos */}
        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col" className="text-center">Cantidad</th>
                <th scope="col" className="text-center">Precio</th>
                <th scope="col">Proveedor</th>
                <th scope="col" className="text-center">+ Info</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.productos.map((item, id) => (
                <tr key={id}>
                  <td>{item.nombre}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-center">$ {item.precioventa}</td>
                  <td>{item.proveedorInfo.nombre}</td>
                  <td className="text-center">
                    <Link
                      to={"/ProductoDetalle/" + item.id}
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={"/ModificarProductos/" + item.id}
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
