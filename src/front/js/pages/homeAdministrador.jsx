import React from "react";
import { Link } from "react-router-dom";
import logoActiva from "../../img/LogoSinFondo.png"


export const HomeAdministrador = () => {
	return (
		<>
		<div className="container">
         
            <br />
            <div className="container text-center">
                <div className="row">
                    {/* Calendario */}
                    <div className="col border border-danger">
                        <img src={logoActiva} style={{width: "25%", 
                        marginTop: "10px", 
                        marginBottom: "10px"}}/>
                    </div>
                    <div className="col border border-danger">
                        {/* Alumnos */}
                        <h4 style={{padding: "5px"}}>Alumnos</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearAlumno" style={{textDecoration: "none", color: "white"}}>Ingresar nuevo alumno  </Link>   
                        </p> 
                        <p style={{fontSize: "18px", lineHeight: "0px" }}>
                            <Link to="/ListadoAlumnos" style={{textDecoration: "none", color: "white"}}>   Listado de alumnos</Link>   
                        </p>
                    </div>
                    <div className="col border border-danger">
                        {/*  Modalidades / Cuotas */}
                        <h4 style={{padding: "5px"}}> Modalidades / Cuotas</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearCuota" style={{textDecoration: "none", color: "white"}}> Ingresar modalidades de entrenamiento </Link> 
                        </p> 
                        <p style={{fontSize: "18px", lineHeight: "0px" }}>
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
                            </Link> 
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
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
                            </Link>
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
                            <Link to="/ListadoMetodos" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>Listado de métodos de pago</Link>
                        </p>
                    </div>
                    <div className="col border border-danger">
                        {/* Mensualidades */}
                        <h4 style={{padding: "5px"}}>Mensualidades</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearMensualidad" style={{textDecoration: "none", color: "white"}}>
                                Ingresar pago de mensualidad
                            </Link> 
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
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
                            </Link>
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
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
                            </Link> 
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
                            <Link to="/ListadoProductos" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}> Listado de productos
                            </Link>
                        </p>
                    </div>

                    <div className="col border border-danger">
                        {/* Pago Provedores */}
                        <h4 style={{padding: "5px"}}>Pago proveedores</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearPagoProveedor" style={{textDecoration: "none", color: "white"}}>
                                Ingresar pago a proveedores
                            </Link> 
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
                            <Link to="/ListadoPagoProveedores" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                                Listado de pago a proveedores
                            </Link>  
                        </p> 
                        <p style={{fontSize: "18px"}}>
                            <Link to="/ListadoPagoPorProveedor" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                                Listado de pago según proveedor
                            </Link>  
                        </p>
  
                    </div>

                </div>


                
                <div className="row">
                    <div className="col border border-danger">
                        <h4 style={{padding: "5px"}}>Caja Diaria</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/movimientosDiarios" style={{textDecoration: "none", color: "white"}}>
                                Movimientos diarios
                            </Link>
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
                                <Link to="/resumenMovimientos" style={{textDecoration: "none", color: "white"}}>  
                                    Resumen movimientos caja diaria
                                </Link>
                            </p>
                    </div>
                   
                    <div className="col border border-danger">
                        {/* <h4 style={{padding: "5px"}}>Productos</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearProductos" style={{textDecoration: "none", color: "white"}}>
                                Ingresar nuevos productos
                            </Link> 
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
                            <Link to="/ListadoProductos" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}> Listado de productos
                            </Link>
                        </p>
                    */}
                    </div>

                    <div className="col border border-danger">
                        {/* <h4 style={{padding: "5px"}}>Pago proveedores</h4>
                        <p style={{fontSize: "18px"}}>
                            <Link to="/CrearPagoProveedor" style={{textDecoration: "none", color: "white"}}>
                                Ingresar pago a proveedores
                            </Link> 
                            </p> 
                            <p style={{fontSize: "18px", lineHeight: "0px" }}>
                            <Link to="/ListadoPagoProveedores" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                                Listado de pago a proveedores
                            </Link>  
                        </p> 
                        <p style={{fontSize: "18px"}}>
                            <Link to="/ListadoPagoPorProveedor" style={{textDecoration: "none", color: "white", marginLeft: "5px"}}>
                                Listado de pago según proveedor
                            </Link>  
                        </p> */}
  
                    </div>
  
                </div> 
            </div>          
        </div>
        </>
	);
};