import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

const PagosMensualesAlumnos = ({ id }) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.obtenerMensualidadIdUsuario(id)
    }, [])

    return (
        <div
            className={store.estadoPagosPersonales}
            style={{ marginTop: "-60px", marginBottom: "150px" }}
        >
            <h5>Mis pagos mensuales</h5>
            <hr />

            <div style={{ marginTop: "35px" }}>
                <table className="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Fecha de pago</th>
                            <th scope="col" className="text-center">Factura</th>
                            <th scope="col" className="text-center">Monto</th>
                            <th scope="col" className="text-center">Método de pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.pagos.map((item, id) => (
                            <tr key={id}>
                                <td className="text-center">{item.fechapago}</td>
                                <td className="text-center">{item.factura}</td>
                                <td className="text-center">$ {item.monto}</td>
                                <td className="text-center">{item.metodosInfo.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default PagosMensualesAlumnos