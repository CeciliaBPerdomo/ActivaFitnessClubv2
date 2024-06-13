import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

// Hora
import moment from "moment";

export const ListaAlumnos = () => {
  const { store, actions } = useContext(Context);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    actions.obtenerAlumnos();
  }, []);

  const borrar = async (e, item) => {
    e.preventDefault();

    Swal.fire({
      position: 'center',
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
      title: `¿Estás seguro?`,
      text: `No podrás recuperar la info de ${item.nombre} ${item.apellido} luego!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        actions.borrarAlumno(item.id),
          Swal.fire({
            position: 'center',
            title: 'Borrado!',
            text: `El/La alumno/a ${item.nombre} ${item.apellido} ha sido eliminado/a`,
            icon: 'success'
          }
          )
      }
    })


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
            placeholder="Buscar alumno..."
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
                    style={{ marginLeft: "5px", fontSize: "12px" }}
                    onClick={() => actions.ordenarAlumnosDesc()}
                  >
                    ↑
                  </button>

                  <button type="button"
                    className="btn btn-outline-danger btn-sm"
                    style={{ marginLeft: "5px", fontSize: "12px" }}
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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store.alumnos.map((item, id) => (
                <tr key={id}>
                  <td className="align-middle"> {moment(item.fechaingreso).format("DD-MM-YYYY")}</td>
                  <td className="align-middle">{item.nombre} {item.apellido}</td>
                  <td className="align-middle">{item.direccion}</td>
                  <td className="align-middle">{item.cuotasInfo.descripcion}</td>
                  <td className="text-center align-middle">
                    <Link
                      to={"/AlumnoIndividual/" + item.id +
                        "/" + item.idmutualista}
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <Link to={"/MensualidadporAlumno/" + item.id} style={{ color: "white" }}>
                      <i className="fa fa-credit-card"></i>
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <Link to={"/nueva_rutina/" + item.id} style={{ color: "white" }}>
                      <i className="fa fa-dumbbell"></i>
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <Link to={"/ingresar_ventas_por_alumno/" + item.id} style={{ color: "white" }}>
                      <i className="fa fa-cart-plus"></i>
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <Link
                      to={"/ModificarAlumno/" + item.id}
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-pen"></i>
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <i
                      className="fa fa-trash"
                      onClick={(e) => borrar(e, item)}
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
