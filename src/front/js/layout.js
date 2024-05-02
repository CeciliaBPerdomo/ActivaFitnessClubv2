import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

// Home
import { Home } from "./pages/home";
import { HomeAdministrador } from "./pages/homeAdministrador.jsx"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

// Inicio de sesion
import { InicioSesion } from "./component/login/login.jsx"
// import { Registro } from "./component/login/registro.jsx";

// Cuotas - Modalidades de Entrenamiento
import { CrearCuota } from "./component/cuotas/crearCuota.jsx";
import { ModificarCuota } from "./component/cuotas/modificarCuota.jsx"
import { ListadoCuotas } from "./component/cuotas/ListadoCuotas.jsx"

//Metodos de pago
import { CrearMetodos } from "./component/metodospago/crearMetodos.jsx"
import { ModificarMetodos } from "./component/metodospago/modificarMetodos.jsx"
import { ListadoMetodos} from "./component/metodospago/ListadoMetodos.jsx"

// Mutualista
import { CrearMutualista } from "./component/mutualista/crearMutualista.jsx"
import { ModificarMutualistas } from "./component/mutualista/modificarMutualista.jsx"
import { ListadoMutualista } from "./component/mutualista/ListadoMutualista.jsx"

// Alumnos
import { CrearAlumno } from "./component/alumnos/crearAlumno.jsx"
import { ListaAlumnos } from "./component/alumnos/listaAlumnos.jsx"
import { AlumnoIndividual } from "./component/alumnos/alumnoIndividual.jsx"
import { ModificarAlumno } from "./component/alumnos/modificarAlumno.jsx"

// Mensualidades
import { ListadoMensualidades } from "./component/mensualidades/ListadoMensualidades.jsx"
import { CrearMensualidad } from "./component/mensualidades/crearMensualidades.jsx"
import { ModificarMensualidad } from "./component/mensualidades/modificarMensualidades.jsx"
import { MensualidadporAlumno } from "./component/mensualidades/mensualidadId.jsx"
import { CuotasPendientes } from "./component/mensualidades/cuotasPendientes.jsx"

// Productos
import { ListadoProductos } from "./component/productos/listaProductos.jsx"
import { ModificarProductos } from "./component/productos/modificarProductos.jsx"
import { CrearProductos } from "./component/productos/crearProductos.jsx"
import { ProductoDetalle } from "./component/productos/productoDetalle.jsx"

// Proveedores
import { ListadoProveedores } from "./component/proveedores/listadoProveedores.jsx"
import { CrearProveedor } from "./component/proveedores/crearProveedor.jsx"
import { ProveedorDetalle } from "./component/proveedores/ProveedorDetalle.jsx"
import { ModificarProveedor } from "./component/proveedores/modificarProveedor.jsx"

// Pago de proveedores
import { CrearPagoProveedor } from "./component/pago_proveedor/crearPagoProveedor.jsx"
import { ListadoPagoProveedores } from "./component/pago_proveedor/listadoPagoProveedores.jsx"
import { ModificarPagoProveedor } from "./component/pago_proveedor/modificarPagoProveedor.jsx"
import { ListadoPagoPorProveedor } from "./component/pago_proveedor/listadoPorProveedor.jsx"

// Caja Diaria  - Balance Mensual
import { CajaDiaria } from "./component/caja_diaria/cajaDiaria.jsx"   
import { ResumenCajaDiaria } from "./component/caja_diaria/resumen_caja.jsx"
import { BalanceMensual } from "./component/caja_diaria/resumen_mensual.jsx";
import { CierreMensual } from "./component/caja_diaria/cierreMensual.jsx";
import { Instructivo } from "./component/caja_diaria/instructivo.jsx";
import { ResumenCajaDiariaPorFecha } from "./component/caja_diaria/resumen_caja_PorFechas.jsx"

//Tipo de ejercicios
import ListadoTipoEjercicios from "./component/tipo_Ejercicios/listadoTipoEjercicios.jsx";
import IngresarTipoEjercicio from "./component/tipo_Ejercicios/IngresarTipoEjercicio.jsx";
import ModificarTipoEjercicio from "./component/tipo_Ejercicios/ModificarTipoEjercicio.jsx";

// Ejercicios 
import ListadoEjercicios from "./component/ejercicios/ListadoEjercicios.jsx";
import IngresarEjercicios from "./component/ejercicios/IngresarEjercicios.jsx";
import ModificarEjercicios from "./component/ejercicios/ModificarEjercicios.jsx";
import VerEjercicioIndividual from "./component/ejercicios/VerEjercicioIndividual.jsx";
import EjerciciosPorTipo from "./component/ejercicios/EjerciciosPorTipo.jsx";

// Compras
import ListadoCompras from "./component/compras/ListadoCompras.jsx";
import CrearCompras from "./component/compras/CrearCompras.jsx";
import DetalleCompras from "./component/compras/DetalleCompras.jsx";
import ModificarCompra from "./component/compras/modificarCompra.jsx";
import ListadoComprasPorProducto from "./component/compras/ListadoComprasPorProducto.jsx";
import ListadoComprasFechas from "./component/compras/ListadoComprasFechas.jsx";

// Ventas
import ListadodeVentas from "./component/ventas/ListadodeVentas.jsx";
import IngresarVenta from "./component/ventas/IngresarVenta.jsx";
import ModificarVenta from "./component/ventas/modificarVenta.jsx";
import DetalleVenta from "./component/ventas/DetalleVenta.jsx";
import VentasPendientes from "./component/ventas/ventasPendientes.jsx";
import PagosPendientes from "./component/ventas/pagosPendientes.jsx";
import VentasPorFecha from "./component/ventas/VentasPorFecha.jsx";
import VentasPorProducto from "./component/ventas/VentasPorProducto.jsx";
import VentasPorAlumno from "./component/ventas/VentasPorAlumno.jsx";
import IngresarVentaPorAlumno from "./component/ventas/IngresarVentaPorAlumno.jsx";
import CrearRutina from "./component/rutinas/crearRutina.jsx";
import FacturacionxMetodo from "./component/caja_diaria/FacturacionxMetodo.jsx";

// Rutinas
import AgregarEjerciciosRutina from "../js/component/rutinas/agregarEjerciciosRutina.jsx"
import VerEjerciciosRutina from "./component/rutinas/VerRutinas.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* Homes */}
                        <Route element={<Home />} path="/" />
                        <Route element={<HomeAdministrador />} path="/homeAdministrador" />

                        {/* Cuotas */}
                        <Route element={<CrearCuota />} path="/CrearCuota" />
                        <Route element={<ModificarCuota />} path="/ModificarCuota/:theid" />
                        <Route element={<ListadoCuotas />} path="/ListadoCuotas" />
                        <Route element={<CuotasPendientes />} path="/CuotasPendientes" />

                        {/* Metodos de pagos */}
                        <Route element={<CrearMetodos />} path="/MetodosPago" />
                        <Route element={<ModificarMetodos />} path="/ModificarMetodos/:theid" />
                        <Route element={<ListadoMetodos />} path="/ListadoMetodos" />

                        {/* Mutualista */}
                        <Route element={<CrearMutualista />} path="/Mutualista" />
                        <Route element={<ModificarMutualistas />} path="/ModificarMutualista/:theid" />
                        <Route element={<ListadoMutualista />} path="/ListadoMutualista" />

                        {/* Alumnos */}
                        <Route element={<CrearAlumno />} path="/CrearAlumno" />
                        <Route element={<ListaAlumnos />} path="/ListadoAlumnos" />
                        <Route element={<AlumnoIndividual />} path="/AlumnoIndividual/:theid/:theidMutualista" />
                        <Route element={<ModificarAlumno />} path="/ModificarAlumno/:theid" />

                        {/* Mensualidades */}
                        <Route element={<CrearMensualidad />} path="/CrearMensualidad" />
                        <Route element={<ListadoMensualidades />} path="/ListadoMensualidades" />
                        <Route element={<ModificarMensualidad />} path="/ModificarMensualidad/:theid" />
                        <Route element={<MensualidadporAlumno />} path="/MensualidadporAlumno/:theid" />

                        {/* Productos */}
                        <Route element={<ListadoProductos />} path="/ListadoProductos" />
                        <Route element={<ModificarProductos />} path="/ModificarProductos/:theid" />
                        <Route element={<CrearProductos/>} path="/CrearProductos" />
                        <Route element={<ProductoDetalle />} path="/ProductoDetalle/:theid" />

                        {/* Proveedores */}
                        <Route element={< ListadoProveedores />} path ="/ListadoProveedores" />
                        <Route element={< CrearProveedor />} path="/CrearProveedor" />
                        <Route element={< ProveedorDetalle />} path="/ProveedorDetalle/:theid" />
                        <Route element={< ModificarProveedor />} path ="/ModificarProveedor/:theid" />

                        {/* Pago de proveedor */}
                        <Route element={<CrearPagoProveedor />} path="/CrearPagoProveedor" />
                        <Route element={<ListadoPagoProveedores />} path="/ListadoPagoProveedores" />
                        <Route element={<ModificarPagoProveedor />} path="/ModificarPagoProveedor/:theid" />
                        <Route element={<ListadoPagoPorProveedor />} path="/ListadoPagoPorProveedor" />

                        {/* Caja Diaria - Balance Mensual */}
                        <Route element={<CajaDiaria />} path="/movimientosDiarios" />
                        <Route element={<ResumenCajaDiaria />} path="/resumenMovimientos" />
                        <Route element={<BalanceMensual />} path="/balanceMensual" />
                        <Route element={<CierreMensual />} path="/cierreMensual" />
                        <Route element={<Instructivo />} path="/instructivo" />
                        <Route element={<ResumenCajaDiariaPorFecha />} path="/cajaDiariaporFecha" />
                        <Route element={<FacturacionxMetodo />} path="/facturacion_metodo" />


                        {/* InicionSesion */}
                        <Route element={<InicioSesion />} path="iniciosesion" />
                        {/* <Route element={<Registro />} path="registroExpress" /> */}

                        {/* Tipo de ejercicios */}
                        <Route element={<ListadoTipoEjercicios />} path="/listadoTipoEjercicios" />
                        <Route element={<ModificarTipoEjercicio />} path="/ModificarTipoEjercicios/:theid" />
                        <Route element={<IngresarTipoEjercicio />} path="/ingresarTipoEjercicio" />

                        {/* Ejercicios */}
                        <Route element={<ListadoEjercicios />} path="/listadoEjercicios" />
                        <Route element={<IngresarEjercicios />} path="/ingresarEjercicio" />
                        <Route element={<ModificarEjercicios />} path="/modificarEjercicio/:theid" />
                        <Route element={<VerEjercicioIndividual />} path="/individualEjercicio/:theid" />
                        <Route element={<EjerciciosPorTipo />} path="/ejercicioPorTipo" />

                        {/* Compras */}
                        <Route element={<ListadoCompras />} path="/listadoCompras" />
                        <Route element={<CrearCompras />} path="/nuevaCompra" />
                        <Route element={<DetalleCompras />} path="/detalleCompra/:theid" />
                        <Route element={<ModificarCompra />} path="/modificarCompra/:theid" />
                        <Route element={<ListadoComprasPorProducto />} path="/compras_por_producto" />
                        <Route element={<ListadoComprasFechas />} path="/compras_por_fechas" />
                        
                        {/* Ventas */}
                        <Route element={<ListadodeVentas />} path="/listadoVentas" />
                        <Route element={<IngresarVenta />} path="/ingresarVenta" />
                        <Route element={<ModificarVenta />} path="/modificarVenta/:theid" />
                        <Route element={<DetalleVenta />} path="/detalleVenta/:theid" />
                        <Route element={<VentasPendientes />} path="/ventas_pendientes" />
                        <Route element={<PagosPendientes />} path="/pagos_pendientes/:theid" />
                        <Route element={<VentasPorFecha />} path="/ventas_porfecha" />
                        <Route element={<VentasPorProducto />} path="/ventas_porproducto" />
                        <Route element={<VentasPorAlumno />} path="/ventas_por_alumno" />
                        <Route element={<IngresarVentaPorAlumno />} path="/ingresar_ventas_por_alumno/:theid" />

                        {/* Rutinas */}
                        <Route element={<CrearRutina />} path="/nueva_rutina/:theid" />
                        <Route element={<AgregarEjerciciosRutina />} path="AgregarEjerciciosRutina/:theid" />
                        <Route element={<VerEjerciciosRutina />} path="VerEjerciciosRutina/:theid" />
                        

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
