import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


// Componentes
import { MenuAdministrador } from "./menuAdministrador.jsx";
import { Pendientes } from "../component/mensualidades/pendientes.jsx"
import { Cumples } from "../component/alumnos/cumple.jsx";
import VentasPendientes from "../component/ventas/ventaspendientes_mp.jsx"

// Fecha
import moment from "moment";

export const HomeAdministrador = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        //actions.clima()
    }, [])

    return (
        <>
            <div className="container">
                {/* Menu de administrador */}
                <div className="row">
                    <div className="col-3">
                        <MenuAdministrador />
                    </div>

                    {/* Separacion entre columnas */}
                    <div className="col-1"></div>

                    <div className="col-8">
                        {/* Fecha actual */}
                        <p className="text-end" style={{ fontSize: "18px" }}>
                            {moment().format('DD/MM/YYYY')}
                        </p>

                        <hr />

                        {/* Cumples */}
                        <div className="container bg-danger bg-opacity-10 border border-danger rounded border-2"
                            style={{ paddingTop: "10px" }}>
                            <p style={{ fontSize: "18px" }}>
                                <b>🎂 Cumpleaños de hoy</b>
                            </p>
                            <hr />
                            <Cumples />
                        </div>

                        <br />

                        {/* Fin de rutinas */}

                        {/* Mensualidades pendientes */}
                        <div className="container bg-danger bg-opacity-10 border border-danger rounded border-2"
                            style={{ paddingTop: "10px" }}>
                            <p style={{ fontSize: "18px" }}>
                                <b>
                                    Mensualidades pendientes
                                </b>
                            </p>
                            <hr />
                            < Pendientes />
                        </div>

                        <br />
                        {/* Ventas pendientes */}
                        <div className="container bg-danger bg-opacity-10 border border-danger rounded border-2"
                            style={{ paddingTop: "10px" }}>
                            <p style={{ fontSize: "18px" }}>
                                <b>
                                    Ventas pendientes
                                </b>
                            </p>
                            <hr />
                            < VentasPendientes />
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};