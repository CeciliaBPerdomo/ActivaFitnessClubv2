import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


function ModificarEjercicios() {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [nombre, setNombre] = useState(store.ejercicio[0]?.nombre)
  const [descripcion, setDescripcion] = useState(store.ejercicio[0]?.descripcion)
  const [idTipo, setIdTipo] = useState(store.ejercicio[0]?.idTipo)
  const [foto, setFoto] = useState(store.ejercicio[0]?.foto)
  const [video, setVideo] = useState(store.ejercicio[0]?.video)


  useEffect(() => {
    // Datos del ejercicio
    actions.obtenerEjercicioId(parseInt(params.theid));
    // Tipos de ejercicios (select)
    actions.obtenerTipoDeEjercicios();
  }, []);

  const modificar = async (e) => {
    e.preventDefault();
    let id = parseInt(params.theid)

    if (descripcion != "" && nombre != "" && idTipo != "") {
      let resultado = await actions.modificarEjercicio(
        id, nombre, descripcion, foto, video, idTipo
      )

      if (resultado === true) {
        toast.success("💪 Modificación realizada con éxito", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
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
  };

  return (
    <div className='container'>
      <h3 style={{ marginBottom: "25px" }}>Modificar ejercicio</h3>
      <hr />
      <br />

      <form>
        <div className="row">
          {/* Nombre */}
          <div className="col">
            <label htmlFor="alumno" style={{ marginBottom: "10px" }}>
              Nombre <label style={{ color: "red" }}>(Obligatorio)</label>:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del ejercicio"
              defaultValue={store.ejercicio[0]?.nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>
        <br />

        <div className="row">
          {/* Descricpcion */}
          <div className="col">
            <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
              Descripción <label style={{ color: "red" }}>(Obligatorio)</label>:
            </label>
            <textarea
              rows="2"
              type="textarea"
              className="form-control"
              defaultValue={store.ejercicio[0]?.descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
        </div>

        <br />
        <div className="row">

          {/* Tipo de ejercicio */}
          <div className="col">
            <label htmlFor="metodo" style={{ marginBottom: "10px" }}>
              Tipo de Ejercicio <label style={{ color: "red" }}>(Obligatorio)</label>:
            </label>
            <select className="form-select"
              defaultValue={store.ejercicio[0]?.idTipo}
              onChange={(e) => setIdTipo(e.target.value)}
            >
              <option selected>{store.ejercicio[0]?.descripcionTipo}</option>
              {store.tiposEjercicios.map((item, id) => (
                <option key={id} value={item.id}>
                  {item.descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* Foto */}
          <div className="col">
            <label htmlFor="Foto" style={{ marginBottom: "10px" }}>
              Foto:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="URL de Foto"
              defaultValue={store.ejercicio[0]?.foto}
              onChange={(e) => setFoto(e.target.value)}
            />
          </div>

          {/* Video */}
          <div className="col">
            <label htmlFor="Video" style={{ marginBottom: "10px" }}>
              Video:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Video"
              defaultValue={store.ejercicio[0]?.video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>


        </div>

        <br />


        <br />
        <div style={{ marginBottom: "70px" }}>
          <button
            type="submit"
            className="btn btn-outline-danger float-end"
            onClick={(e) => modificar(e)}
          >
            Modificar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default ModificarEjercicios