import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logo  from "../../img/Logo.png"
import { PreFooter } from "../component/preFooter.jsx"


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			
			<br/>
			<h1>Activa Fitness Club</h1>
			<br />
			
			<p>
				<img src={logo} style={{width: "10%"}}/>
			</p>

			<br /><br /><br />
			
			<PreFooter />
		</div>
	);
};
