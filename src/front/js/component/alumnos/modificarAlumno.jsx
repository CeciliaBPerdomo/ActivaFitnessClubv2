import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarAlumno = () => {
  const { store, actions } = useContext(Context);
  const { theid, theidMutualista } = useParams();

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
  const [genero, setGenero] = useState(""); // Genero
  const [observaciones, setObservaciones] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [foto, setFoto] = useState("");

  const [nombreMutualista, setNombreMutualista] = useState("")
  const [modalidad, setModalidad] = useState("")

  useEffect(() => {
    info();
  }, []);

  const info = async () => {
    let resp = await actions.obtenerDatosAlumno_byId(theid);

    if (resp) {
      setCedula(store.datos_alumno[0]?.cedula)
      setNombre(store.datos_alumno[0]?.nombre)
      setApellido(store.datos_alumno[0]?.apellido)
      setCedula(store.datos_alumno[0]?.cedula)
      setCelular(store.datos_alumno[0]?.celular)
      setDireccion(store.datos_alumno[0]?.direccion)

      setFechaNacimiento(store.datos_alumno[0]?.fechanacimiento)
      setIngreso(store.datos_alumno[0]?.fechaingreso)
      setGenero(store.datos_alumno[0]?.genero)
      setEmail(store.datos_alumno[0]?.email)
      setMutualista(store.datos_alumno[0]?.idMutualista)
      setCondiciones(store.datos_alumno[0]?.condicionesmedicas)
      setCuota(store.datos_alumno[0]?.idCuota) //Modalidad de entrenamiento
      setRol(store.datos_alumno[0]?.rol)

      setPeso(store.datos_alumno[0]?.peso)
      setAltura(store.datos_alumno[0]?.altura)
      setMedicacion(store.datos_alumno[0]?.medicacion)
      setEmergencias(store.datos_alumno[0]?.emergencias)
      setMotivo(store.datos_alumno[0]?.motivoentrenamiento)
      setObservaciones(store.datos_alumno[0]?.observaciones)
      setFoto(store.datos_alumno[0]?.foto)

      setNombreMutualista(store.datos_alumno[0]?.nombreMutualista)
      setModalidad(store.datos_alumno[0]?.descripcionCuota) 
    }

    await actions.obtenerMutualistas();
  };

  const modificar = async (e) => {
    e.preventDefault()

    let resultado = await actions.modificarAlumno_desdeAdmin(theid, cedula, nombre, apellido,
      direccion, celular, fechanacimiento, peso, altura, email, mutualista, condiciones, medicacion,
      emergencias, motivo, cuota, rol, genero, observaciones, ingreso, foto)

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
  }


  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: "25px" }}>
          Modificar información del alumno
        </h3>
        <hr />
        <br />

        <form className="border border-1 border-danger" style={{ padding: "10px" }}>

          {/* Nombre, Apellido, Cedula */}
          <div className="row">
            {/* Nombre */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Nombre:
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

          {/* Direccion, Celular, Fecha de nacimento */}
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

          {/* Genero, Peso, Altura y fecha de ingreso */}
          <div className="row">
            {/* Genero */}
            <div className="col">
              <label htmlFor="Estado" style={{ marginBottom: "10px" }}>
                Género:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option>{store.alumno[0]?.genero}</option>
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

          {/* Email, foto, mutualista */}
          <div className="row">
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
                Mutualista:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={mutualista}
                onChange={(e) => setMutualista(e.target.value)}
              >
                <option selected>{nombreMutualista}</option>
                {store.mutualistas.map((item, id) => (
                  <option key={id} value={item.id}>{item.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <br />

          {/* Condiciones medicas, medicacion, emergencias */}
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

          {/* Motivo del entrenamiento, modalidad, rol */}
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
                Modalidad:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={cuota}
                onChange={(e) => setCuota(e.target.value)}
              >
                <option>{modalidad}</option>
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
                <option value="Alumno">Alumno</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>


          </div>
          <br />

          {/* Observaciones */}
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
        </form>

        {/* Boton de actualizar info*/}
        <div style={{ marginTop: "15px" }}>
          <button
            type="submit"
            className="btn btn-outline-danger float-end w-25"
            onClick={(e) => modificar(e)}
          >
            Modificar info alumno
          </button>
        </div>

      </div>
      <ToastContainer />
      <br />
    </>
  );
};
