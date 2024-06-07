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
  const [rol, setRol] = useState("Alumno");
  const [activo, setActivo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    actions.obtenerCuotas();
    actions.obtenerMutualistas();
  }, []);

  const guardar = async (e) => {
    e.preventDefault();

    // if (foto !== "") {
    //   const formData = new FormData()
    //   formData.append('image', foto)

    //    let imagenLink = await actions.guardarImagen(formData)
    //    console.log(imagenLink)
    // }

    if (cedula !== "" && nombre !== "" && apellido !== "" && direccion !== "" && activo !== "" && mutualista !== "" && email !== "" && cuota !== "") {

      // Crear link de imgur para las imagenes


      let resultado = await actions.crearAlumnos(
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

        await actions.suscripcion(email)

        setCedula("")
        setNombre("")
        setApellido("")
        setDireccion("")
        setCelular("")
        setFechaNacimiento("")
        setActivo("") // Genero
        setPeso("")
        setAltura("")
        setIngreso("")
        setEmail("")
        setFoto("")
        setMutualista("")
        setCondiciones("")
        setMedicacion("")
        setEmergencias("")
        setMotivo("")
        setCuota("")
        setRol("")
        setObservaciones("")

        // Problemas para guardar
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
      // Si faltan datos
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
  };

  return (
    <>
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
                value={activo}
                onChange={(e) => setActivo(e.target.value)}
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

        <div className="guardar" 
        style={{ marginTop: "15px", marginBottom: "75px" }}>
          <button
            type="button"
            className="btn btn-outline-success float-end w-25"
            onClick={(e) => guardar(e)}
          >
            Agregar alumno
          </button>
        </div>
        <ToastContainer />
      </div >
    </>
  );
};
