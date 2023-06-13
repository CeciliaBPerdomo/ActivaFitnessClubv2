import React, { Component } from "react";

export const Footer = () => (
	<div className="container bg-danger bg-opacity-10 border border-danger rounded border-2" 
	style={{marginTop: "60px"}}>
  		<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4" style={{margin: "10px"}}>
			<div className="col">
				<b>
				Activa Fitness Club
				</b>
				<br/>
				v. 1.0.4 (13/06/2023)
			</div>
			<div className="col"></div>
			<div className="col"></div>
			<div className="col" style={{marginTop: "10px"}}>Desarrollado por Cecilia Perdomo</div>
  		</div>
	</div>
);
