import React, { Component } from "react";

export const Footer = () => (
	<>
	<div className="container bg-danger bg-opacity-10 border border-danger rounded border-2" 
	style={{marginTop: "40px"}}>
		
  		<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4" style={{margin: "10px"}}>
			<div className="col">
				<b>
				💪 Activa Fitness Club
				</b>
				<br/>
				Versión: 2.06.12 (12/06/2024)
				{/* Version 1.0 --> 2023
				Version 2.01 --> 2024 
				el segundo digito corresponde al mes, el ultimo al dia
				*/}
			</div>
			<div className="col"></div>
			<div className="col"></div>
			<div className="col" style={{marginTop: "10px"}}>Desarrollado por: 
			<a href="https://ceciliaperdomo.vercel.app/" 
			style={{textDecoration: "none", color: "white"}}> 👩‍💻Cecilia Perdomo </a></div>
  		</div>
	</div>
	</>
);
