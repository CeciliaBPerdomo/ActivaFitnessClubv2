import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarProductos = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);

  const [nombre, setNombre] = useState(store.producto[0]?.nombre);
  const [cantidad, setCantidad] = useState(store.producto[0]?.cantidad);
  const [precioVenta, setPrecioVenta] = useState(
    store.producto[0]?.precioventa,
  );
  const [foto, setFoto] = useState(store.producto[0]?.foto);
  const [video, setVideo] = useState(store.producto[0]?.video);
  const [observaciones, setObservaciones] = useState(
    store.producto[0]?.observaciones,
  );
  const [proveedor, setProveedor] = useState(store.producto[0]?.proveedorid);

  useEffect(() => {
    actions.obtenerProveedores();
    actions.obtenerProductosId(parseInt(params.theid));
  }, []);

  const modificar = async (e) => {
    e.preventDefault();
    let id = parseInt(params.theid)

    // if (nombre !== "" && cantidad !== "" && precioVenta !== "" && proveedor !== "") {
      let resultado = await actions.modificarProductos(id, nombre, cantidad, precioVenta, observaciones, foto, video, proveedor)
      if (resultado === true) {
        toast.success("💪 Guardado con éxito", {
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
        toast.error("No se puede guardar", {
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
    // } else {
    //   toast.error("Faltan completar datos", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
  }

  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: "15px" }}>
          Modificación de Productos
        </h3>
        <hr />
        <br />

        <form>
          <div className="row">
            {/* Nombre */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Nombre <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                defaultValue={store.producto[0]?.nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Cantidad */}
            <div className="col">
              <label htmlFor="cantidad" style={{ marginBottom: "10px" }}>
                Cantidad <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Cantidad"
                defaultValue={store.producto[0]?.cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>

            {/* Precio venta */}
            <div className="col">
              <label htmlFor="precio" style={{ marginBottom: "10px" }}>
                Precio de venta <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Precio de venta"
                defaultValue={store.producto[0]?.precioventa}
                onChange={(e) => setPrecioVenta(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* Foto */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Foto URL:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="URL de la foto"
                defaultValue={store.producto[0]?.foto}
                onChange={(e) => setFoto(e.target.value)}
              />
            </div>

            {/* Video */}
            <div className="col">
              <label htmlFor="cantidad" style={{ marginBottom: "10px" }}>
                Video:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="URL del video"
                defaultValue={store.producto[0]?.video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* Provedor */}
            <div className="col">
              <label htmlFor="proveedor" style={{ marginBottom: "10px" }}>
                Proveedor <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
              >
                <option selected>
                  {store.producto[0]?.proveedorInfo.nombre}
                </option>
                {store.proveedores.map((item, id) => (
                  <option key={id} value={item.id}>{item.nombre}</option>
                ))}
              </select>
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
                defaultValue={store.producto[0]?.observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div style={{ marginTop: "15px", marginBottom: "40px" }}>
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
