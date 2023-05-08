import React from "react";
import { Link } from "react-router-dom";

export const HomeAdministrador = () => {
	return (
		<>
		<div className="container">
            
            {/* Alumnos */}
            <h4>Alumnos:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/CrearAlumno" style={{textDecoration: "none", color: "white"}}>Ingresar nuevo alumno  </Link>   
            ||
            <Link to="/ListadoAlumnos" style={{textDecoration: "none", color: "white"}}>   Listado de alumnos</Link>   
            </p>

            <br />
            {/*  Modalidades / Cuotas */}
            <h4> Modalidades / Cuotas:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/CrearCuota" style={{textDecoration: "none", color: "white"}}> Ingresar modalidades de entrenamiento </Link>
            </p>


            <br />
            {/* Mutualistas */}
            <h4>Mutualistas:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/Mutualista" style={{textDecoration: "none", color: "white"}}>
				Ingresar nueva mutualista
			</Link> ||
            <Link to="/ListadoMutualista"style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                Listado de mutualistas
            </Link>
            </p>
        
        
            <br/>
            {/*  Metodos de pago  */}
            <h4>Métodos de pago:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/MetodosPago" style={{textDecoration: "none", color: "white"}}>
			    Ingresar nuevo método de pago
			</Link>
            </p>


            <br />
            {/* Mensualidades */}
            <h4>Mensualidades:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/CrearMensualidad" style={{textDecoration: "none", color: "white"}}>
				Ingresar pago de mensualidad
			</Link> || 
            <Link to="/ListadoMensualidades" style={{textDecoration: "none", color: "white"}}>   Listado de mensualidades
			</Link>
            </p>


            <br />
            {/* Proveedores  */}
            <h4>Proveedores:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/CrearProveedor" style={{textDecoration: "none", color: "white"}}>
				Ingresar nuevo proveedor
			</Link>  || 
            <Link to="/ListadoProveedores" style={{textDecoration: "none", color: "white"}}>  Listado de proveedores
			</Link>
            </p>

            <br />
            {/* Productos */}
            <h4>Productos:</h4>
            <p style={{fontSize: "18px"}}>
            <Link to="/CrearProductos" style={{textDecoration: "none", color: "white"}}>
				Ingresar nuevos productos
			</Link> ||
            <Link to="/ListadoProductos" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}> Listado de productos
			</Link>

            </p>
        </div>
        </>
	);
};