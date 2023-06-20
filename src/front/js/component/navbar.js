import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../front/js/store/appContext.js";
import { Link } from "react-router-dom";
import logoActiva from "../../img/LogoSinFondo.png"


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	let inicioSes = ""

	const cerrarSesion = async () => {
		await actions.logOut()
		inicio()
	}

	const inicio = () => {
		if (localStorage.getItem("Token") !== null){
			return true
		} else {
			return false
		}
	}



	return (
		<>
		<div className="container" 
		style={{background: "black", marginBottom: "25px", marginTop: "25px"}}>

			<div className="d-flex justify-content-between">
				
				<Link to="/" style={{textDecoration: "none"}}>
					<h3 style={{color: "red"}}>
						<img src={logoActiva} style={{width: "36px"}}/> Activa Fitness Club
					</h3>
				</Link>

				{ inicio() === true ? 			
					<Link to = "/homeAdministrador" 
					style={{textDecoration: "none", 
					color: "white"
					}}>
						<h5>Menú principal</h5>
					</Link>
				: "" }
				
				<Link to = "/iniciosesion" 
					style={{textDecoration: "none", 
					color: "white"
					}}>
					
					{/* Chequea que este logueado */}
					{ inicio() === true ? 
						// Cierra sesión
						<button type="button" 
						className="btn btn-outline-danger"
						onClick={() => cerrarSesion()}
						>
							Cerrar sesión
						</button>
						:
						<button type="button" className="btn btn-outline-danger">
							Iniciar sesión
						</button>
					}
				</Link>
				</div>
			<hr />
			</div>
		</>
	);
};