import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const ListaAlumnos = () => {
  const { store, actions } = useContext(Context);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerAlumnos();
  }, []);

  const borrar = async (e, id) => {
    e.preventDefault();
    let resultado = await actions.borrarAlumno(id)

    if (resultado === true) {
      toast.success("🤚 Borrado con éxito", {
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
      toast.error("🤚 No se puede borrar", {
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
      await actions.obtenerAlumnos()
    } else {
      await actions.obtenerAlumnos()
      await actions.buscadorAlumno(valor);
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-group mb-3 w-25 float-end">
          <input
            type="text"
            className="form-control "
            placeholder = "Buscar alumno..."
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
        <h3 style={{ marginBottom: "25px" }}>Alumnos</h3>
        <hr />
        <br />

        {/* Listado de mutualista */}
        <div style={{ marginTop: "35px" }}>
          <table className="table" style={{ color: "white" }}>
            <thead>
              <tr>
                <th scope="col">Fecha de ingreso</th>
                <th scope="col">Nombre
                <button type="button" 
                    className="btn btn-outline-danger btn-sm" 
                    style={{marginLeft: "5px", fontSize: "12px"}}
                    onClick={() => actions.ordenarAlumnosDesc()}
                  >
                       ↑ 
                  </button>
                  
                  <button type="button" 
                    className="btn btn-outline-danger btn-sm" 
                    style={{marginLeft: "5px", fontSize: "12px"}}
                    onClick={() => actions.ordenarAlumnosAsc()}
                  >
                     ↓ 
                  </button>
                </th>
                <th scope="col">Dirección</th>
                <th scope="col">Entrenamiento</th>
                <th scope="col" className="text-center">+ Info</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.alumnos.map((item, id) => (
                <tr key={id}>
                  <td> {moment(item.fechaingreso).format("DD-MM-YYYY")}</td>
                  <td>{item.nombre} {item.apellido}</td>
                  <td>{item.direccion}</td>
                  <td>{item.cuotasInfo.descripcion}</td>
                  <td className="text-center">
                    <Link
                      to={"/AlumnoIndividual/" + item.id +
                        "/" + item.idmutualista}
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                  </td>
                  <td>
                    <Link to={"/MensualidadporAlumno/" + item.id} style={{ color: "white" }}>
                      <i className="fa fa-credit-card"></i>
                    </Link>
                  </td>
                  <td className="text-center">
                    <i className="fa fa-dumbbell"></i>
                  </td>
                  <td className="text-center">
                    <Link
                      to={"/ModificarAlumno/" + item.id}
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-pen"></i>
                    </Link>
                  </td>
                  <td className="text-center">
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
