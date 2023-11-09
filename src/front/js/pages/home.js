import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

// imagenes
import logo from "../../img/Logo.png"
import landing from "../../img/landing.jpg"
import banner from "../../img/banner.png"

// Info adicional
import { PreFooter } from "../component/preFooter.jsx"


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="row">
				<div className="col-5"></div>
				<div className="col">
					<img src={banner}
						style={{ height: "350px", marginBottom: "30px" }}
					/>
				</div>
				<div className="col"></div>
			</div>

			<PreFooter />
		</div>
	);
};
