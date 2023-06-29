import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearPagoProveedor = () => {
  const { store, actions } = useContext(Context);
  const [proveedor, setProveedor] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [factura, setFactura] = useState("");
  const [monto, setMonto] = useState("");
  const [idmetodo, setIdMetodo] = useState("");
  const [observaciones, setObservaciones] = useState("")

  useEffect(() => {
    actions.obtenerProveedores();
    actions.obtenerMetodos();
  }, []);

  const guardar = async (e) => {
    e.preventDefault();


    if (fechaPago !== "" && proveedor !== "" && factura !== "" && monto !== "" && idmetodo !== "") {
      let resultado = await actions.crearPagoProveedores(fechaPago, factura, monto, proveedor, idmetodo, observaciones)
      if (resultado === true) {
        toast.success("💪 Guardado con éxito", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        /* Limpiar el formulario */
        setFechaPago("");
        setFactura("");
        setMonto("")
        setObservaciones("")
        setProveedor("")
        setIdMetodo("")
      } else {
        toast.error("No se puede guardar", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error("Faltan completar datos", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: "25px" }}>Ingresar pago de proveedores</h3>
        <hr />
        <br />

        <form>
          <div className="row">
            {/* Proveedor */}
            <div className="col">
              <label htmlFor="idProvedor" style={{ marginBottom: "10px" }}>
                Id de Proveedor <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
              >
                <option selected>Proveedor</option>
                {store.proveedores.map((item, id) => (
                  <option key={id} value={item.id}>{item.nombre}</option>
                ))}
              </select>
            </div>

            {/* Fecha de pago */}
            <div className="col">
              <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                Fecha de pago <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Fecha de pago"
                value={fechaPago}
                onChange={(e) => setFechaPago(e.target.value)}
              />
            </div>

            {/* Numero de factura */}
            <div className="col">
              <label htmlFor="factura" style={{ marginBottom: "10px" }}>
                Factura <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Número de factura"
                value={factura}
                onChange={(e) => setFactura(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* Monto */}
            <div className="col">
              <label htmlFor="monto" style={{ marginBottom: "10px" }}>
                Monto <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Monto de la factura"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>

            {/* Metodo de pago */}
            <div className="col">
              <label htmlFor="metodo" style={{ marginBottom: "10px" }}>
                Método de pago <label style={{ color: "red" }}>(Obligatorio)</label>:
              </label>
              <select
                className="form-select"
                value={idmetodo}
                onChange={(e) => setIdMetodo(e.target.value)}
              >
                <option selected>Método de pago</option>
                {store.metodos.map((item, id) => (
                  <option key={id} value={item.id}>{item.tipo}</option>
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
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
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
                Guardar pago
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
      <br />
    </>
  );
};
