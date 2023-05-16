import React from "react";
import { Link } from "react-router-dom";
import fondo from "../../img/fondo.jpg"


export const HomeAdministrador = () => {
	return (
		<>
		<div className="container">
            <br />
            <div className="container text-center">
                <div className="row">
                    {/* Calendario */}
                    <div className="col border border-danger">
                    </div>
                    <div className="col border border-danger">
                        {/* Alumnos */}
                        <h4 style={{padding: "5px"}}>Alumnos</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearAlumno" style={{textDecoration: "none", color: "white"}}>Ingresar nuevo alumno  </Link>   
                            ||
                            <Link to="/ListadoAlumnos" style={{textDecoration: "none", color: "white"}}>   Listado de alumnos</Link>   
                        </p>
                    </div>
                    <div className="col border border-danger">
                        {/*  Modalidades / Cuotas */}
                        <h4 style={{padding: "5px"}}> Modalidades / Cuotas</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearCuota" style={{textDecoration: "none", color: "white"}}> Ingresar modalidades de entrenamiento </Link> ||
                            <Link to="/ListadoCuotas" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                                Listado de modalidades de entrenamiento
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col border border-danger">
                        {/* Mutualistas */}
                        <h4 style={{padding: "5px"}}>Mutualistas</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/Mutualista" style={{textDecoration: "none", color: "white"}}>
                                Ingresar nueva mutualista
                            </Link> ||
                            <Link to="/ListadoMutualista" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                                Listado de mutualistas
                            </Link>
                        </p>
                    </div>
                    <div className="col border border-danger">
                        {/*  Metodos de pago  */}
                        <h4 style={{padding: "5px"}}>Métodos de pago</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/MetodosPago" style={{textDecoration: "none", color: "white"}}>
                                Ingresar nuevo método de pago
                            </Link> || 
                            <Link to="/ListadoMetodos" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>Listado de métodos de pago</Link>
                        </p>
                    </div>
                    <div className="col border border-danger">
                        {/* Mensualidades */}
                        <h4 style={{padding: "5px"}}>Mensualidades:</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearMensualidad" style={{textDecoration: "none", color: "white"}}>
                                Ingresar pago de mensualidad
                            </Link> || 
                            <Link to="/ListadoMensualidades" style={{textDecoration: "none", color: "white"}}>   Listado de mensualidades
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="row">
                <div className="col border border-danger">
                        {/* Proveedores  */}
                        <h4 style={{padding: "5px"}}>Proveedores</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearProveedor" style={{textDecoration: "none", color: "white"}}>
                                Ingresar nuevo proveedor
                            </Link>  || 
                            <Link to="/ListadoProveedores" style={{textDecoration: "none", color: "white"}}>  Listado de proveedores
                            </Link>
                        </p>
                    </div>
                    <div className="col border border-danger">
                        {/* Productos */}
                        <h4 style={{padding: "5px"}}>Productos</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearProductos" style={{textDecoration: "none", color: "white"}}>
                                Ingresar nuevos productos
                            </Link> ||
                            <Link to="/ListadoProductos" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}> Listado de productos
                            </Link>
                        </p>
                    </div>

                    <div className="col border border-danger">
                    </div>

                </div>
            </div>          
        </div>
        </>
	);
};