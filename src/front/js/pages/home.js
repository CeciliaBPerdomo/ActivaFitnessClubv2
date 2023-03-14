import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Activa Fitness Club</h1>
			<br />
			<p>
				<img src="https://scontent.fmvd1-1.fna.fbcdn.net/v/t1.6435-9/162033568_268299338077910_8571571259160410812_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a26aad&_nc_ohc=ZkO-OFzWo9sAX8dEWgJ&_nc_ht=scontent.fmvd1-1.fna&oh=00_AfBNSPdaXmHRYkG4VEt_EnLwIMZYosKls2vcPgpDPxDKXQ&oe=63F79CE1" style={{width: "10%"}}/>
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
