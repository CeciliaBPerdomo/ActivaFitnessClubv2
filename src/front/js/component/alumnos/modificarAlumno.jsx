import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarAlumno = () => {
  const { store, actions } = useContext(Context);
  let navegacion = useNavigate();
  const params = useParams();

  const [cedula, setCedula] = useState(store.alumno[0]?.cedula);
  const [nombre, setNombre] = useState(store.alumno[0]?.nombre);
  const [apellido, setApellido] = useState(store.alumno[0]?.apellido);
  const [direccion, setDireccion] = useState(store.alumno[0]?.direccion);
  const [celular, setCelular] = useState(store.alumno[0]?.celular);
  const [fechanacimiento, setFechaNacimiento] = useState(
    store.alumno[0]?.fechanacimiento,
  );
  const [peso, setPeso] = useState(store.alumno[0]?.peso);
  const [altura, setAltura] = useState(store.alumno[0]?.altura);
  const [email, setEmail] = useState(store.alumno[0]?.email);
  const [mutualista, setMutualista] = useState(store.alumno[0]?.idmutualista);
  const [condiciones, setCondiciones] = useState(
    store.alumno[0]?.condicionesmedicas,
  );
  const [medicacion, setMedicacion] = useState(store.alumno[0]?.medicacion);
  const [emergencias, setEmergencias] = useState(store.alumno[0]?.emergencias);
  const [motivo, setMotivo] = useState(store.alumno[0]?.motivo);
  const [cuota, setCuota] = useState(store.alumno[0]?.idcuota);
  const [rol, setRol] = useState(store.alumno[0]?.rol);
  const [activo, setActivo] = useState(store.alumno[0]?.activo);
  const [observaciones, setObservaciones] = useState(
    store.alumno[0]?.observaciones,
  );
  const [ingreso, setIngreso] = useState(store.alumno[0]?.fechaingreso);
  const [foto, setFoto] = useState(store.alumno[0]?.foto);

  useEffect(() => {
    const info = async () => {
      await actions.obtenerAlumnoId(parseInt(params.theid));
    };

    actions.obtenerMutualistas();
    actions.obtenerMutualistaId(parseInt(params.theidMutualista));

    info();
  }, []);

  const modificar = (e) => {
    e.preventDefault()
    let id = parseInt(params.theid)

    if (actions.modificarAlumno(id, 
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
        foto)){
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

      //   setInterval(() => {
      //     navegacion("/ListadoAlumnos");
      // }, 5000);
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

        <form>
          <div className="row">
            {/* Cedula */}
            <div className="col">
              <label htmlFor="cedula" style={{ marginBottom: "10px" }}>
                Cédula:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Cédula (sin puntos ni guiones)"
                defaultValue={store.alumno[0]?.cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>

            {/* Nombre */}
            <div className="col">
              <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                defaultValue={store.alumno[0]?.nombre}
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
                defaultValue={store.alumno[0]?.apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>

          <br />
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
                defaultValue={store.alumno[0]?.direccion}
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
                defaultValue={store.alumno[0]?.celular}
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
                defaultValue={store.alumno[0]?.fechanacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className="row">
            {/* Peso */}
            <div className="col">
              <label htmlFor="Peso" style={{ marginBottom: "10px" }}>
                Peso:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Peso"
                defaultValue={store.alumno[0]?.peso}
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
                defaultValue={store.alumno[0]?.altura}
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
                defaultValue={store.alumno[0]?.fechaingreso}
                onChange={(e) => setIngreso(e.target.value)}
              />
            </div>
          </div>

          <br />
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
                defaultValue={store.alumno[0]?.email}
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
                defaultValue={store.alumno[0]?.foto}
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
                defaultValue={store.alumno[0]?.idmutualista}
                onChange={(e) => setMutualista(e.target.value)}
              >
                <option selected>{store.alumno[0]?.idmutualista}</option>
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
                defaultValue={store.alumno[0]?.condicionesmedicas}
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
                defaultValue={store.alumno[0]?.medicacion}
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
                defaultValue={store.alumno[0]?.emergencias}
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
                defaultValue={store.alumno[0]?.motivoentrenamiento}
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
                defaultValue={store.alumno[0]?.cuotasInfo.descripcion}
                onChange={(e) => setCuota(e.target.value)}
              >
                <option>{store.alumno[0]?.cuotasInfo.descripcion}</option>
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
                defaultValue={store.alumno[0]?.rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="Alumno">Alumno</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            {/* Estado */}
            <div className="col">
              <label htmlFor="Estado" style={{ marginBottom: "10px" }}>
                Estado:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={store.alumno[0]?.activo}
                onChange={(e) => setActivo(e.target.value)}
              >
                <option>{store.alumno[0]?.activo}</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
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
                defaultValue={store.alumno[0]?.observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div style={{ marginTop: "15px" }}>
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
