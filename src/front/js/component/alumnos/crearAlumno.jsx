import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const CrearAlumno = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate()

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [mutualista, setMutualista] = useState("");
  const [condiciones, setCondiciones] = useState("");
  const [cuota, setCuota] = useState(""); //Modalidad de entrenamiento
  const [rol, setRol] = useState("Alumno");

  useEffect(() => {
    actions.obtenerCuotas();
    actions.obtenerMutualistas();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setIngreso(formattedDate);
  }, []);


  const cancelar = (e) => {
    e.preventDefault(e)
    navigate("/homeAdministrador")
  }

  const guardar = async (e) => {
    e.preventDefault()

    // Mensaje de error cuando faltan datos
    function mensaje(texto) {
      toast.error(texto, {
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


    // chequeo que se ingresen todos los datos
    if (cedula !== "" && nombre !== "" && apellido !== "" && direccion !== "" && genero !== "" && mutualista !== "" && email !== "" && cuota !== "") {
      let resultado = await actions.crearAlumnos(cedula, nombre, apellido, direccion, celular, fechanacimiento, 0, 0, email, mutualista, condiciones, "", "", "", cuota, rol, genero, "", ingreso, "")

      if (resultado === true) {
        //await actions.suscripcion(email)

        let idAlumno = await store.alumno.id
        let url = "/infoAdicional/" + idAlumno
        navigate(url)

        setCedula("")
        setNombre("")
        setApellido("")
        setDireccion("")
        setCelular("")
        setFechaNacimiento("")
        setGenero("")
        setIngreso("")
        setEmail("")
        setMutualista("")
        setCondiciones("")
        setCuota("")
        setRol("")

        // Problemas para guardar
      } else {
        mensaje(store.msgErrores)
      }
      // Si faltan datos
    } else {
      if (!nombre) {
        mensaje("Falta completar el nombre")
      }

      if (!apellido) {
        mensaje("Falta completar el apellido")
      }

      if (!cedula) {
        mensaje("Falta completar la cédula")
      }

      if (!direccion) {
        mensaje("Falta completar la dirección")
      }

      if (!celular) {
        mensaje("Falta completar el número de celular")
      }

      if (!fechanacimiento) {
        mensaje("Falta completar la fecha de nacimiento")
      }

      if (!genero) {
        mensaje("Falta elegir el género")
      }

      if (!mutualista) {
        mensaje("Falta elegir la mutualista")
      }

      if (!condiciones) {
        mensaje("Falta completar las condiciones médicas")
      }

      if (!cuota) {
        mensaje("Falta completar elegir la modalidad de entrenamiento")
      }

    }
  };

  return (
    <div className="container">
      <h3 style={{ marginBottom: "10px" }}>Ingresar alumnos
        <span style={{ fontSize: "16px" }}>  ➤ Datos obligatorios</span>
      </h3>
      <hr />
      <br />

      <form className="border border-1 border-danger" style={{ padding: "10px" }}>
        {/* Nombre, Apellido y cedula */}
        <div className="row">
          {/* Nombre */}
          <div className="col">
            <label htmlFor="nombre" style={{ marginBottom: "10px" }}>Nombre:</label>
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
              Apellido:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>

          {/* Cedula */}
          <div className="col">
            <label htmlFor="cedula" style={{ marginBottom: "10px" }}>
              Cédula:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Cédula (sin puntos ni guiones)"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Direccion */}
        <div className="row">
          {/* Direccion */}
          <div className="col">
            <label htmlFor="direccion" style={{ marginBottom: "10px" }}>
              Dirección:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Celular, fecha de nacimiento, fecha de ingreso */}
        <div className="row">
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

        {/* Correo electronico, genero */}
        <div className="row">
          {/* Genero */}
          <div className="col-4">
            <label htmlFor="Estado" style={{ marginBottom: "10px" }}>
              Género:
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option>Género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>

          {/* E-mail */}
          <div className="col">
            <label htmlFor="mail" style={{ marginBottom: "10px" }}>
              Correo electrónico:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Mutualista, Condiciones medicas, Modalidad, Rol */}
        <div className="row">
          {/* Mutualista */}
          <div className="col">
            <label htmlFor="mutualista" style={{ marginBottom: "10px" }}>
              Mutualista:
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

          {/* Modalidad */}
          <div className="col">
            <label htmlFor="entrenamiento" style={{ marginBottom: "10px" }}>
              Modalidad:
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
          <div className="col-2">
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
      </form >

      <div className="guardar" style={{ marginTop: "15px", marginBottom: "75px" }}>
        <button
          className="btn btn-outline-secondary float-end"
          style={{ marginLeft: "5PX" }}
          onClick={(e) => cancelar(e)}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="btn btn-outline-success float-end w-25"
          onClick={(e) => guardar(e)}
        >
          Agregar nuevo alumno
        </button>
      </div>

      <ToastContainer />
    </div >
  );
};
