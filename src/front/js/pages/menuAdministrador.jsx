import React from "react";
import { Link } from "react-router-dom";

export const MenuAdministrador = () => {
    return (
        <>
            <div>
                {/* Alumnos */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Alumnos:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CrearAlumno" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo alumno
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoAlumnos" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de alumnos
                    </Link>
                </p>
                <br />

                {/* Mensualidades */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Mensualidades:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CrearMensualidad" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar pago de mensualidad
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoMensualidades" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de mensualidades
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CuotasPendientes" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de mensualidades pendientes
                    </Link>
                </p>
                <br />

                {/* Balance diario */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Balance diario:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/movimientosDiarios" style={{ textDecoration: "none", color: "white" }}>
                        - Movimientos diarios
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/cajaDiariaporFecha" style={{ textDecoration: "none", color: "white" }}>
                        - Facturación mensual
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/resumenMovimientos" style={{ textDecoration: "none", color: "white" }}>
                        - Resumen de movimientos diarios
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/cierreMensual" style={{ textDecoration: "none", color: "white" }}>
                        - Cierre balance mensual
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/balanceMensual" style={{ textDecoration: "none", color: "white" }}>
                        - Resumen de balance mensual
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/instructivo" style={{ textDecoration: "none", color: "white" }}>
                        - Instrucciones para realizar los cierres
                    </Link>
                </p>
                <br />

                {/* Mensualidades / Cuotas */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Modalidades de entrenamiento:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CrearCuota" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar modalidades de entrenamiento
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoCuotas" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de modalidades de entrenamiento
                    </Link>
                </p>
                <br />

                {/* Mutualistas */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Mutualistas:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/Mutualista" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nueva mutualista
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoMutualista" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de mutualistas
                    </Link>
                </p>
                <br />

                {/* Metodos de pago */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Métodos de pago:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/MetodosPago" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo método de pago
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoMetodos" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de métodos de pago
                    </Link>
                </p>
                <br />

                {/* Proovedores */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Proveedores:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CrearProveedor" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo proveedor
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoProveedores" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de proveedores
                    </Link>
                </p>
                <br />

                {/* Productos */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Productos:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CrearProductos" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo producto
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoProductos" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de productos
                    </Link>
                </p>
                <br />

                {/* Compras */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Compras:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/nuevaCompra" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nueva compra
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/listadoCompras" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de compras
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/compras_por_producto" style={{ textDecoration: "none", color: "white" }}>
                        - Compras por producto
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/compras_por_fechas" style={{ textDecoration: "none", color: "white" }}>
                        - Compras por fechas
                    </Link>
                </p>
                <br />

                {/* Ventas */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Ventas:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nueva venta
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/listadoVentas" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de ventas
                    </Link>
                </p>
                <br />

                {/* Pago a proovedores */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Pago a proveedores:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/CrearPagoProveedor" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo pago a proveedor
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoPagoProveedores" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de pago a proveedores
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ListadoPagoPorProveedor" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de pago según proveedor
                    </Link>
                </p>
                <br />

                {/* Tipo de ejercicios */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Tipos de ejercicios:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ingresarTipoEjercicio" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo tipo de ejercicio
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/listadoTipoEjercicios" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de tipos de ejercicios
                    </Link>
                </p>
                <br />

                {/* Ejercicios */}
                <p style={{ fontSize: "17px", lineHeight: "7px", color: "red" }}>
                    Ejercicios:
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ingresarEjercicio" style={{ textDecoration: "none", color: "white" }}>
                        - Ingresar nuevo ejercicio
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/listadoEjercicios" style={{ textDecoration: "none", color: "white" }}>
                        - Listado de ejercicios
                    </Link>
                </p>
                <p style={{ fontSize: "15px", lineHeight: "7px", marginLeft: "10px" }}>
                    <Link to="/ejercicioPorTipo" style={{ textDecoration: "none", color: "white" }}>
                        - Ejercicios por tipo de ejercicio
                    </Link>
                </p>
            </div>
        </>
    )
}