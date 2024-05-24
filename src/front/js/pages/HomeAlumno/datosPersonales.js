import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

const DatosPersonales = ({ id }) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.obtenerAlumnoId(id)
    }, [])

    /*
    altura : ""
   condicionesmedicas: ""
   emergencias: ""
   id : 3
   idcuota: 1
   idmutualista : 1
   medicacion : ""
   observaciones : ""
   proximovencimiento  : "2024-04-02" */

    return (
        <div
        className={store.estadoDatosPersonales}
        >
            <h5>Mi información personal</h5>
            <hr />

            <div className="card mb-3 border-danger mb-3" style={{ maxWidth: "740px", marginLeft: "30px", backgroundColor: "black" }}>
                <div className="row g-0">
                    <div className="card-header bg-danger"
                        style={{ color: "white", fontSize: "24px" }}>
                        {store.alumno[0]?.nombre} {store.alumno[0]?.apellido}
                    </div>
                    <div className="col-md-4 d-flex justify-content-center" style={{ padding: "12px" }}>
                        <img
                            src={store.alumno[0]?.foto}
                            className="img-fluid rounded-circle"
                            alt={store.alumno[0]?.nombre}
                            style={{ width: "100%" }}
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

                                {/* Mensualidad */}
                                <div className="row">
                                    <div className="col-5 border border-1" style={{ padding: "8px" }}>
                                        Mensualidad: ${store.alumno[0]?.cuotasInfo.precio}
                                    </div>
                                    <div className="col-6 border border-1" style={{ padding: "8px" }}>
                                        Fecha ingreso: {store.alumno[0]?.fechaingreso}
                                    </div>
                                </div>

                                 {/* Motivo */}
                                 <div className="row">
                                    <div className="col-11 border border-1" style={{ padding: "8px" }}>
                                        Motivo: {store.alumno[0]?.motivoentrenamiento}
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatosPersonales