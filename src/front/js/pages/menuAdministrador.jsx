import React from "react";

// Menu
import Alumnos from "./Menu/Alumnos.jsx";
import Mensualidades from "./Menu/Mensualidades.jsx";
import BalanceDiario from "./Menu/BalanceDiario.jsx";
import Modalidades from "./Menu/Modalidades.jsx";
import Mutualistas from "./Menu/Mutualistas.jsx";
import MetodosPago from "./Menu/MetodosPago.jsx";
import Proveedores from "./Menu/Proveedores.jsx";
import Productos from "./Menu/Productos.jsx";
import Compras from "./Menu/Compras.jsx";
import Ventas from "./Menu/Ventas.jsx";
import PagoProveedores from "./Menu/PagoProveedores.jsx";
import Ejercicios from "./Menu/Ejercicios.jsx";
import TipoEjercicios from "./Menu/TipoEjercicios.jsx";

export const MenuAdministrador = () => {
    return (
        <>
            <div>
                {/* Facturacion */}
                <div className="accordion accordion-flush border border-1 border-danger" id="accordionFlushExample">
                    {/* Alumnos */}
                    <Alumnos />

                    {/* Mensualidades */}
                    <Mensualidades />

                    {/* Balance diario */}
                    <BalanceDiario />

                    {/* Mensualidades / Cuotas */}
                    <Modalidades />

                    {/* Mutualistas */}
                    <Mutualistas />

                    {/* Metodos de pago */} 
                    <MetodosPago />

                    {/* Proovedores */}
                    <Proveedores />

                    {/* Pago a proovedores */}
                    <PagoProveedores />

                    {/* Productos */}
                    <Productos />

                    {/* Compras */}
                    <Compras />

                     {/* Ventas */}
                     <Ventas />

                </div>

                <br />

                {/* Rutinas */}
                <div className="accordion accordion-flush border border-1 border-danger" id="accordionFlushExample">
                     {/* Tipo de ejercicios */}
                     <TipoEjercicios />
                     
                    {/* Ejercicios */}
                    <Ejercicios />

                </div>
                <br />

            </div>
        </>
    )
}