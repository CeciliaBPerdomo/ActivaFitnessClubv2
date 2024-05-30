import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import ActualizarDatos from "./actualizarDatos";
import ActualizarDatosMedicos from "./actualizarDatosMedicos.jsx";

const DatosPersonales = ({ id }) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.obtenerDatosAlumno_byId(id)
    }, [])

    return (

        <div className={store.estadoDatosPersonales}>
            <h5>Tu información personal</h5>
            <hr />

            <div className="card mb-3 border-danger mb-3" style={{ maxWidth: "740px", marginLeft: "30px", backgroundColor: "black" }}>
                <div className="row g-0">
                    {/* Nombre y apellido */}
                    <div className="card-header bg-danger"
                        style={{ color: "white", fontSize: "24px" }}>
                        {store.datos_alumno[0]?.nombre} {store.datos_alumno[0]?.apellido}
                    </div>

                    {/* Foto */}
                    <div className="col"
                        style={{
                            padding: "12px",
                            marginTop: "80px"
                        }}
                    >
                        <img
                            src={store.datos_alumno[0]?.foto}
                            className="img-fluid rounded-circle"
                            alt={store.datos_alumno[0]?.nombre}
                            style={{ width: "450px", height: "300px" }}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">

                            {/* Cedula y mail */}
                            <div className="row">
                                <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                    Cédula: {store.datos_alumno[0]?.cedula}
                                </div>
                                <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                    Mail: {store.datos_alumno[0]?.email}
                                </div>
                            </div>

                            {/* Celular y genero */}
                            <div className="row">
                                <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                    Celular: {store.datos_alumno[0]?.celular}
                                </div>
                                <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                    Género: {store.datos_alumno[0]?.genero}
                                </div>
                            </div>

                            {/* Cumple, altura y peso */}
                            <div className="row">
                                <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                    Cumple: {store.datos_alumno[0]?.fechanacimiento}
                                </div>
                                <div className="col-3 border border-1" style={{ padding: "8px" }}>
                                    Altura: {store.datos_alumno[0]?.altura} cm
                                </div>
                                <div className="col-3 border border-1" style={{ padding: "8px" }}>
                                    Peso: {store.datos_alumno[0]?.peso} kg
                                </div>
                            </div>

                            {/* Direccion */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Dirección: {store.datos_alumno[0]?.direccion}
                                </div>
                            </div>

                            {/* Boton para actualizar los datos personales */}
                            <div className="row" style={{ marginBottom: "12px", marginTop: "12px" }}>
                                <div className="col-11">
                                    <ActualizarDatos id={id} />
                                </div>
                            </div>

                            {/* Modalidad de entrenamiento */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Modalidad: {store.datos_alumno[0]?.descripcionCuota}
                                </div>
                            </div>

                            {/* Mensualidad, fecha de ingreso */}
                            <div className="row">
                                <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                    Mensualidad: ${store.datos_alumno[0]?.precioCuota}
                                </div>
                                <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                    Fecha ingreso: {store.datos_alumno[0]?.fechaingreso}
                                </div>
                            </div>

                            {/* Vencimiento mensualidad */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Vencimiento mensualidad: {store.datos_alumno[0]?.proximovencimiento}
                                </div>
                            </div>

                            <div className="row" style={{ marginBottom: "12px", marginTop: "12px" }}>
                                <div className="col-11">
                                </div>
                            </div>

                            {/* Motivo */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Motivo: {store.datos_alumno[0]?.motivoentrenamiento}
                                </div>
                            </div>

                            {/* Condiciones médicas */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Condiciones médicas: {store.datos_alumno[0]?.condicionesmedicas}
                                </div>
                            </div>

                            {/* Emergencia */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    En caso de emergencia: {store.datos_alumno[0]?.emergencias}
                                </div>
                            </div>

                            {/* Mutualista */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Mutualista: {store.datos_alumno[0]?.nombreMutualista}
                                </div>
                            </div>

                            {/* Medicacion */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Medicacion: {store.datos_alumno[0]?.medicacion}
                                </div>
                            </div>

                            {/* Observaciones */}
                            <div className="row">
                                <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                    Comentarios: {store.datos_alumno[0]?.observaciones}
                                </div>
                            </div>

                            {/* Boton para actualizar datos medicos */}
                            <div className="row" style={{ marginBottom: "12px", marginTop: "12px" }}>
                                <div className="col-11">
                                    <ActualizarDatosMedicos id={id} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DatosPersonales