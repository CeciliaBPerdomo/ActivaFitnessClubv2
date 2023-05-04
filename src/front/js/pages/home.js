import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logo  from "../../img/Logo.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Activa Fitness Club</h1>
			<br />
			<p>
				<img src={logo} style={{width: "10%"}}/>
			</p>

			<h2>Alumnos: </h2>
			<p>
				Para ingresar un alumno, primero tienen que haber mutualistas creadas.
			</p>
			<p>
				Tiene que tener planes de entrenamiento.
			</p>

			<br />
			<h2>Pagos de mensualidades: </h2>
			<p>
				Para ingresar un pago de una mensualidad, primero tienen que haber metodos de pagos creados.
			</p>
			<p>
				Y crear alumnos, no se a quién le vas a cobras si no.
			</p>

			<br />
			<h2>Productos: </h2>
			<p>
				Para ingresar un producto, primero tienen que haber proveedores creados.
			</p>

			<br />
			<h2>Menú: </h2>
			<p>
				Para trabajar y realizar los ingresos, tenes el menú de hamburguesa en la esquina superior ¿derecha?
			</p>
		</div>
	);
};
