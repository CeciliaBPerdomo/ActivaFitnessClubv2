import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


export const ListadoProductos = () => {
  const { store, actions } = useContext(Context);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerProductos();
  }, []);

  // Borrar producto
  const borrar = (e, id) => {
    e.preventDefault();
    Swal.fire({
      position: 'top-end',
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
      title: '¿Estás seguro?',
      text: "No podrás recuperar la info luego!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        actions.borrarProductos(id),
          Swal.fire({
            position: 'top-end',
            title: 'Borrado!',
            text: 'El producto ha sido eliminado',
            icon: 'success'
          }
          )
      }
    })


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
                  <td>{item.nombreProveedor}</td>
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
