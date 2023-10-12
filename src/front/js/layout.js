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

                        {/* InicionSesion */}
                        <Route element={<InicioSesion />} path="iniciosesion" />
                        {/* <Route element={<Registro />} path="registroExpress" /> */}

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
