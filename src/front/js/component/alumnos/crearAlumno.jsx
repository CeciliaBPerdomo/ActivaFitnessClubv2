import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const CrearAlumno = () => {
  const { store, actions } = useContext(Context);

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [email, setEmail] = useState("");
  const [mutualista, setMutualista] = useState("");
  const [condiciones, setCondiciones] = useState("");
  const [medicacion, setMedicacion] = useState("");
  const [emergencias, setEmergencias] = useState("");
  const [motivo, setMotivo] = useState("");
  const [cuota, setCuota] = useState("");
  const [rol, setRol] = useState("");
  const [activo, setActivo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    actions.obtenerCuotas();
    actions.obtenerMutualistas();
  }, []);

  const guardar = (e) => {
    e.preventDefault();

    if (
      actions.crearAlumnos(
        cedula,
        nombre,
        apellido,
        direccion,
        celular,
        fechanacimiento,
        peso,
        altura,
        email,
        mutualista,
        condiciones,
        medicacion,
        emergencias,
        motivo,
        cuota,
        rol,
        activo,
        observaciones,
        ingreso,
        foto,
      )
    ) {
      toast.success("💪 Guardado con éxito", {
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

    // setInterval(() => {
    //   navegacion("/ListadoAlumnos");
    // }, 5000);
  };

  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: "25px" }}>Ingresar alumnos</h3>
        <hr />
        <br />

        <form>
          <div className="row">
            {/* Cedula */}
            <div className="col">
              <label htmlFor="cedula" style={{ marginBottom: "10px" }}>
                Cédula <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Cédula (sin puntos ni guiones)"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>

            {/* Nombre */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Nombre <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Apellido */}
            <div className="col">
              <label htmlFor="apellido" style={{ marginBottom: "10px" }}>
                Apellido <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* Direccion */}
            <div className="col">
              <label htmlFor="direccion" style={{ marginBottom: "10px" }}>
                Dirección <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>

            {/* Celular */}
            <div className="col">
              <label htmlFor="Celular" style={{ marginBottom: "10px" }}>
                Celular:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            </div>

            {/* Fecha de nacimiento */}
            <div className="col">
              <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Fecha de nacimiento"
                value={fechanacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">

            {/* Genero */}
            <div className="col">
              <label htmlFor="Estado" style={{ marginBottom: "10px" }}>
                Género <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={activo}
                onChange={(e) => setActivo(e.target.value)}
              >
                <option>Género</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
            </div>

            {/* Peso */}
            <div className="col">
              <label htmlFor="Peso" style={{ marginBottom: "10px" }}>
                Peso:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Peso"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>

            {/* Altura */}
            <div className="col">
              <label htmlFor="Altura" style={{ marginBottom: "10px" }}>
                Altura:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Altura"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
              />
            </div>

            {/* Fecha de ingreso */}
            <div className="col">
              <label htmlFor="fechaI" style={{ marginBottom: "10px" }}>
                Fecha de ingreso:
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Fecha de ingreso"
                value={ingreso}
                onChange={(e) => setIngreso(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* E-mail */}
            <div className="col">
              <label htmlFor="mail" style={{ marginBottom: "10px" }}>
                Correo electrónico <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Foto */}
            <div className="col">
              <label htmlFor="foto" style={{ marginBottom: "10px" }}>
                Foto:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Foto (URL)"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
              />
            </div>

            {/* Mutualista */}
            <div className="col">
              <label htmlFor="mutualista" style={{ marginBottom: "10px" }}>
                Mutualista <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={mutualista}
                onChange={(e) => setMutualista(e.target.value)}
              >
                <option selected>Mutualista</option>
                {store.mutualistas.map((item, id) => (
                  <option key={id} value={item.id}>{item.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <br />
          <div className="row">
            {/* Condiciones medicas */}
            <div className="col">
              <label htmlFor="condiciones" style={{ marginBottom: "10px" }}>
                Condiciones médicas:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Condiciones médicas"
                value={condiciones}
                onChange={(e) => setCondiciones(e.target.value)}
              />
            </div>

            {/* Medicaciones */}
            <div className="col">
              <label htmlFor="medicacion" style={{ marginBottom: "10px" }}>
                Medicación:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Si toma algún médicamento"
                value={medicacion}
                onChange={(e) => setMedicacion(e.target.value)}
              />
            </div>

            {/* Emergencias */}
            <div className="col">
              <label htmlFor="emergencias" style={{ marginBottom: "10px" }}>
                Emergencias:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Telefono en caso de emergencia"
                value={emergencias}
                onChange={(e) => setEmergencias(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* Motivo */}
            <div className="col">
              <label htmlFor="motivo" style={{ marginBottom: "10px" }}>
                Motivo del entrenamiento:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Motivo del entrenamiento"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {/* Modalidad */}
            <div className="col">
              <label htmlFor="entrenamiento" style={{ marginBottom: "10px" }}>
                Modalidad <label style={{color: "red"}}>(Obligatorio)</label>:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={cuota}
                onChange={(e) => setCuota(e.target.value)}
              >
                <option>Modalidad</option>
                {store.cuotas.map((item, id) => (
                  <option
                    key={id}
                    value={item.id}
                  >
                    {item.descripcion}
                  </option>
                ))}
              </select>
            </div>

            {/* Rol */}
            <div className="col">
              <label htmlFor="rol" style={{ marginBottom: "10px" }}>
                Rol:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option>Rol</option>
                <option value="Alumno">Alumno</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            
          </div>

          <br />
          <div className="row">
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
          <div style={{ marginTop: "15px" }}>
            <button
              type="submit"
              className="btn btn-outline-danger float-end w-25"
              onClick={(e) => guardar(e)}
            >
              Agregar
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};
