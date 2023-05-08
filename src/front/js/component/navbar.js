import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
		<div className="container" 
		style={{background: "black", marginBottom: "25px", marginTop: "15px"}}>
			<Link to="/" style={{textDecoration: "none"}}>
				<h3 style={{marginLeft: "-40px", color: "red"}}>
					Activa Fitness Club
				</h3>
			</Link>

			<Link to = "/homeAdministrador" style={{textDecoration: "none", color: "white"}}>
				Administrador
			</Link>
		</div>
		</>
	);
};