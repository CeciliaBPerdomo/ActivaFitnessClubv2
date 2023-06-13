import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../front/js/store/appContext.js";
import { Link } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	// Boton de logueo
	const [visibilidadBoton, setVisibilidadBoton] = useState("")

	useEffect(() => {
		if (store.auth === true) {
			setVisibilidadBoton(false)
		} else {
			setVisibilidadBoton(true)
		}
	}, []);

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
					{ !store.auth ? 
						<button type="button" className="btn btn-outline-danger">
							Iniciar sesión
						</button>
						: 
						// Cierra sesión
						<button type="button" 
						className="btn btn-outline-danger"
						onClick={() => actions.logOut()}
						>
							Cerrar sesión
						</button>
					}
				</Link>
				</div>
			<hr />
			</div>
		</>
	);
};