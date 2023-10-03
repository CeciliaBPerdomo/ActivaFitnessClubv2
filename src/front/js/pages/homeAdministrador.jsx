import React from "react";
import { Link } from "react-router-dom";
import logoActiva from "../../img/LogoSinFondo.png"
import { MenuAdministrador } from "./menuAdministrador.jsx";
import { Pendientes } from "../component/mensualidades/pendientes.jsx"
import moment from "moment";


export const HomeAdministrador = () => {
	return (
		<>
		<div className="container">
            {/* Menu de administrador */}
            <div className="row">
                <div className="col-3">
                    <MenuAdministrador />            
                </div>
                
                <div className="col-1">

                </div>

                <div className="col-8">
                    <p className="text-end" style={{fontSize: "18px"}}>
                        {moment().format('DD/MM/YYYY')}
                    </p>
                    
                    <hr />

                    <div className="container bg-danger bg-opacity-10 border border-danger rounded border-2"
                    style={{paddingTop: "10px"}}>
                        {/* Cumples */}

                        {/* Fin de rutinas */}
                        
                        {/* Mensualidades pendientes */}
                        <p style={{fontSize: "18px"}}>
                            <b>
                                Mensualidades pendientes
                            </b> 
                        </p>
                        <hr />
                        < Pendientes />
                    </div>
                </div>

            </div>
        </div>
        </>
	);
};