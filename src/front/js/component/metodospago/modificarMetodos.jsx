import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarMetodos = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);

  const [tipo, setTipo] = useState(store.metodo.tipo);
  const [observaciones, setObservaciones] = useState(
    store.metodo.observaciones,
  );

  useEffect(() => {
    actions.obtenerMetodoId(parseInt(params.theid));
  }, []);

  const modificar = async (e) => {
    e.preventDefault();
    let id = parseInt(params.theid);

    let resultado = await actions.modificarMetodo(id, tipo, observaciones)
    if (resultado === true) {
      toast.success("💪 Modificación realizada con éxito", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("No se pudo realizar la modificación", {
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
        <h3 style={{ marginBottom: "15px" }}>
          Modificación de los métodos de pago
        </h3>
        <hr />
        <br />

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
                defaultValue={store.metodo.tipo}
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
                defaultValue={store.metodo.observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "15px" }}>
              <button
                type="submit"
                className="btn btn-outline-danger float-end w-25"
                onClick={(e) => modificar(e)}
              >
                Actualizar
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
