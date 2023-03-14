import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
		<div className="container" style={{background: "black"}}>
			<div className="principal" style={{marginBottom: "70px"}}>
				<nav className="navbar navbar-dark fixed-top">
					<div className="container-fluid" >
						<a className="navbar-brand" href="#" style={{decoraction: "none", color: "red"}}>Activa Fitness Club</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" 
						data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
						<span className="navbar-toggler-icon"></span>
						</button>
						<div className="offcanvas offcanvas-end" 
						tabIndex="-1" id="offcanvasDarkNavbar" 
						aria-labelledby="offcanvasDarkNavbarLabel" style={{background: "black"}}>
						<div className="offcanvas-header">
							<h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Activa Fitness Club</h5>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="offcanvas-body" >
							<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

								{/* Alumnos */}
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" 
									role="button" data-bs-toggle="dropdown" aria-expanded="false"
									style={{textDecoration: "none", color: "white"}}>
									Alumnos
									</a>
									<ul className="dropdown-menu dropdown-menu-dark">
									<li>
										<Link to="/ListadoAlumnos" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>Listado</Link>
									</li>
									<li>
									<Link to="/CrearAlumno" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>Nuevo Alumno</Link>
									</li>
									{/* <li>
										<hr className="dropdown-divider" />
									</li>
									<li><a className="dropdown-item" href="#">Something else here</a></li> */}
									</ul>
								</li>

								{/* Modalidades / Cuotas */}
								<li className="nav-item">
									<Link to="/CrearCuota" style={{textDecoration: "none", color: "white"}}>
										<p>Modalidades</p> 
									</Link>
								</li>

								{/* Mutualistas */}
								<li className="nav-item">
									<Link to="/Mutualista" style={{textDecoration: "none", color: "white"}}>
										<p>Mutualista</p> 
									</Link>
								</li>


								{/* Metodos de pago */}
								<li className="nav-item">
									<Link to="/MetodosPago" style={{textDecoration: "none", color: "white"}}>
										<p>Metodos de pago</p> 
									</Link>	
								</li>

								
								{/* Mensualidades */}
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" 
									role="button" data-bs-toggle="dropdown" aria-expanded="false"
									style={{textDecoration: "none", color: "white"}}>
									Mensualidades
									</a>
									<ul className="dropdown-menu dropdown-menu-dark">
									<li>
										<Link to="/ListadoMensualidades" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>
											Listado de mensualidades
										</Link>
									</li>
									<li>
									<Link to="/CrearMensualidad" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>
										Pago de mensualidad
									</Link>
									</li>
									{/* <li>
										<hr className="dropdown-divider" />
									</li>
									<li><a className="dropdown-item" href="#">Something else here</a></li> */}
									</ul>
								</li>

								{/* Productos */}
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" 
									role="button" data-bs-toggle="dropdown" aria-expanded="false"
									style={{textDecoration: "none", color: "white"}}>
									Productos
									</a>
									<ul className="dropdown-menu dropdown-menu-dark">
									<li>
										<Link to="/ListadoProductos" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>
											Listado de productos
										</Link>
									</li>
									<li>
									<Link to="/CrearProductos" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>
										Agregar productos
									</Link>
									</li>
			
									</ul>
								</li>
								
								{/* Proveedores */}
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" 
									role="button" data-bs-toggle="dropdown" aria-expanded="false"
									style={{textDecoration: "none", color: "white"}}>
									Proveedores
									</a>
									<ul className="dropdown-menu dropdown-menu-dark">
									<li>
										<Link to="/ListadoProveedores" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>
											Listado de proveedores
										</Link>
									</li>
									<li>
									<Link to="/CrearProveedor" style={{textDecoration: "none", color: "white", marginLeft: "15px"}}>
										Agregar proveedores
									</Link>
									</li>
			
									</ul>
								</li>

							</ul>
						</div>
						</div>
					</div>
					</nav>
</div>

</div>
		</>

);
};
		// <div className="principal" style={{marginBottom: "25px"}}>
		// <nav className="navbar navbar-light bg-light" >
		// 	<div className="container">
				
		// 			<span className="navbar-brand mb-0 h1" style={{color: "black"}}>
		// 				<b>
		// 				Activa Fitness Club
		// 				</b>
		// 			</span>
				
		// 		<div className="ml-auto">
		// 			<Link to="/Mutualista">
		// 				<button className="btn btn-light">Mutualista</button> 
		// 			</Link>

		// 						

		// 			<li className="nav-item dropdown">
        //   				<a className="nav-link dropdown-toggle" 
		// 				href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		//   				Alumno</a>
        //   				<ul className="dropdown-menu">
		// 					<li><a className="dropdown-item" href="#">
		// 						
		// 						</a></li>
		// 					<li><a className="dropdown-item" href="#">
		// 						
		// 					</a></li>
		// 				</ul>
    	// 			</li>
		// 		</div>
		// 	</div>
		// </nav>
		// </div>

