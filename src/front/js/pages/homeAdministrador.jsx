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
        actions.clima()
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
                        <div className="row">
                            <div className="col-10 float-end">
                                {/* Fecha actual y clima */}
                                {store.clima ?
                                    <p className="text-end" style={{ fontSize: "18px"}}>
                                        <img src={"http://openweathermap.org/img/w/" + store.clima?.weather?.[0]?.icon + ".png"} />
                                        {Math.round(store.clima?.main?.temp) + " °C"}
                                    </p> : null
                                }
                            </div>
                            <div className="col items-center">
                                <p style={{ fontSize: "18px", marginTop: "7px" }}>
                                    {moment().format('DD/MM/YYYY')}
                                </p>
                            </div>
                        </div>

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
                        {/* <div className="container bg-danger bg-opacity-10 border border-danger rounded border-2"
                            style={{ paddingTop: "10px" }}>
                            <p style={{ fontSize: "18px" }}>
                                <b>
                                    Ventas pendientes
                                </b>
                            </p>
                            <hr />
                            < VentasPendientes />
                        </div> */}

                    </div>

                </div>
            </div>
        </>
    );
};