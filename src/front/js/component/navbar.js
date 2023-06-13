import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../front/js/store/appContext.js";
import { Link } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context)


	// useEffect(() => {
		
	// }, []);


	return (
		<>
		<div className="container" 
		style={{background: "black", marginBottom: "25px", marginTop: "15px"}}>

			<div className="d-flex justify-content-between">

				<Link to="/" style={{textDecoration: "none"}}>
					<h3 style={{color: "red"}}>
						Activa Fitness Club
					</h3>
				</Link>
			
				<Link to = "/iniciosesion" 
					style={{textDecoration: "none", 
					color: "white"
					}}>
					
					{/* Chequea que este logueado */}
					{ store.auth === true ? 
						// Cierra sesión
						<button type="button" 
						className="btn btn-outline-danger"
						onClick={() => actions.logOut()}
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