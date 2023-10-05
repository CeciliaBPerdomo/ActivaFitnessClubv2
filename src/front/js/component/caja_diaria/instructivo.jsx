import React from "react";
import fecha from "../../../img/instructivo/fechas.png"
import cierre from "../../../img/instructivo/cierre.png"
import rango from "../../../img/instructivo/rango.png"
import balance from "../../../img/instructivo/balance.png"

export const Instructivo = () => {
    return (
        <>
            <div className="container">
                <p style={{ fontSize: "18px" }}>
                    <b>
                        Instrucciones para realizar el cierre de caja y balance mensual
                    </b>
                </p>
                <hr />

                <p style={{ fontSize: "16px" }}>
                    <b>
                        - Paso 1: Balance diario:
                    </b>
                </p>

                <div style={{ marginLeft: "25px" }}>
                    <p style={{ fontSize: "16px" }}>
                        Se deberá seleccionar la fecha que se desea cerrar la caja, por defecto muestra los movimientos del día.
                    </p>
                    <img src={fecha} alt="Buscar movimientos" />

                    <p style={{ fontSize: "16px" }}>
                        Si se quiere ver una fecha distinta, elegir la fecha y luego clickear en el botón de <b>Buscar movimientos</b>.
                    </p>

                    <p style={{ fontSize: "16px" }}>
                        Si la información esta correcta, se procede a realizar el cierre de caja diaria (o balance diario, <b>pesado</b>).
                        Se puede agregar alguna observación adicional (pero no es obligatorio), luego clickear en el botón de <b>Cerrar caja</b> y la información quedará guardada para el día seleccionado.
                    </p>
                    <img src={cierre} alt="Cierre de caja" />
                </div>
                <hr />

                <p style={{ fontSize: "16px" }}>
                    <b>
                        - Paso 2: Ver listado de balance diario:
                    </b>
                </p>
                <div style={{ marginLeft: "25px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "16px" }}>
                        Si se desea se puede ver un resumen de los movimientos diarios en: <b>Resumen de movimientos diarios</b>.
                    </p>
                </div>
                <hr />

                <p style={{ fontSize: "16px" }}>
                    <b>
                        - Paso 3: Cierre de balance mensual:
                    </b>
                </p>
                <div style={{ marginLeft: "25px" }}>
                    <p style={{ fontSize: "16px" }}>
                        Se deberá seleccionar el rango de fechas que se desea realizar el cierre mensual, esto es obligatorio y luego clickear en el botón de <b>Buscar movimientos</b>. Esto permite ver el resumen de todos los movimientos correspondientes al mes.
                    </p>
                    <img src={rango} alt="Buscar rango de fechas" />
                    <p style={{ fontSize: "16px" }}>
                        Si la información esta correcta, se procede a realizar el cierre del balance mensual.
                        Se puede agregar alguna observación adicional (pero no es obligatorio), luego clickear en el botón de <b>Cerrar balance mensual</b> y la información quedará guardada para el mes seleccionado.
                    </p>
                    <img src={balance} alt="Cierre de balance mensual" />

                </div>
                    <hr />

                <p style={{ fontSize: "16px" }}>
                    <b>
                        - Paso 4: Ver listado de balance mensual:
                    </b>
                </p>
                <div style={{ marginLeft: "25px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "16px" }}>
                        Si se desea se puede ver un resumen de los movimientos mensuales en: <b>Resumen de balance mensual</b>.
                    </p>
                </div>
                <hr />
            </div >
        </>
    );
};
