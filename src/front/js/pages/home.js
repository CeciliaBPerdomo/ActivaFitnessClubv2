import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

// imagenes
import logo from "../../img/Logo.png"
import landing from "../../img/landing.jpg"

// Info adicional
import { PreFooter } from "../component/preFooter.jsx"


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Activa Fitness Club</h1>
			<br />
			<img src={landing} style={{ width: "30%", marginBottom: "30px" }} />
			<PreFooter />
		</div>
	);
};
