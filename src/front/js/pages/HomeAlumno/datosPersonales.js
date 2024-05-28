import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import ActualizarDatos from "./actualizarDatos";

const DatosPersonales = ({ id }) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.obtenerAlumnoId(id)
    }, [])

    return (
        <div
        className={store.estadoDatosPersonales}
        >
            <h5>Mi información personal</h5>
            <hr />

            <div className="card mb-3 border-danger mb-3" style={{ maxWidth: "740px", marginLeft: "30px", backgroundColor: "black" }}>
                <div className="row g-0">
                    {/* Nombre y apellido */}
                    <div className="card-header bg-danger"
                        style={{ color: "white", fontSize: "24px" }}>
                        {store.alumno[0]?.nombre} {store.alumno[0]?.apellido}
                    </div>

                    {/* Foto */}
                    <div className="col" 
                    style={{ 
                        padding: "12px", 
                        marginTop: "80px"
                    }}
                    >
                        <img
                            src={store.alumno[0]?.foto}
                            className="img-fluid rounded-circle" 
                            alt={store.alumno[0]?.nombre}
                            style={{ width: "450px", height: "300px" }}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text">

                                {/* Cedula y mail */}
                                <div className="row">
                                    <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                        Cédula: {store.alumno[0]?.cedula}
                                    </div>
                                    <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                        Mail: {store.alumno[0]?.email}
                                    </div>
                                </div>

                                {/* Celular y genero */}
                                <div className="row">
                                    <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                        Celular: {store.alumno[0]?.celular}
                                    </div>
                                    <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                        Género: {store.alumno[0]?.genero}
                                    </div>
                                </div>

                                {/* Cumple, altura y peso */}
                                <div className="row">
                                    <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                        Cumple: {store.alumno[0]?.fechanacimiento}
                                    </div>
                                    <div className="col-3 border border-1" style={{ padding: "8px" }}>
                                        Altura: {store.alumno[0]?.altura} cm
                                    </div>
                                    <div className="col-3 border border-1" style={{ padding: "8px" }}>
                                        Peso: {store.alumno[0]?.peso} kg
                                    </div>
                                </div>

                                 {/* Direccion */}
                                 <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Dirección: {store.alumno[0]?.direccion}
                                    </div>
                                </div>

                                {/* Modalidad de entrenamiento */}
                                <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Modalidad: {store.alumno[0]?.cuotasInfo.descripcion}
                                    </div>
                                </div>

                                {/* Mensualidad, fecha de ingreso */}
                                <div className="row">
                                    <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                        Mensualidad: ${store.alumno[0]?.cuotasInfo.precio}
                                    </div>
                                    <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                        Fecha ingreso: {store.alumno[0]?.fechaingreso}
                                    </div>
                                </div>

                                {/* Vencimiento mensualidad */}
                                <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Vencimiento mensualidad: {store.alumno[0]?.proximovencimiento}
                                    </div>
                                </div>

                                 {/* Motivo */}
                                 <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Motivo: {store.alumno[0]?.motivoentrenamiento}
                                    </div>
                                </div>

                                {/* Condiciones médicas */}
                                <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Condiciones médicas: {store.alumno[0]?.condicionesmedicas}
                                    </div>
                                </div>

                                {/* Emergencia */}
                                <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        En caso de emergencia: {store.alumno[0]?.emergencias}
                                    </div>
                                </div>

                                 {/* Mutualista */}
                                 <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Mutualista: {store.alumno[0]?.idmutualista}
                                    </div>
                                </div>

                                 {/* Medicacion */}
                                 <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Medicacion: {store.alumno[0]?.medicacion}
                                    </div>
                                </div>

                                 {/* Observaciones */}
                                 <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Comentarios: {store.alumno[0]?.observaciones}
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{padding: "15px"}}>
                    <ActualizarDatos />
                </div>
            </div>
        </div>
    )
}

export default DatosPersonales