import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

function DetalleVenta() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        // Venta a visualizar
        actions.obtenerVentaId(params.theid)
    }, [])

    return (
        <div className="container">
            <h4 style={{ marginBottom: "25px" }}>Venta de: {store.venta[0]?.nombreProducto} a {store.venta[0]?.nombreUsuario}</h4>
            <hr />
            <br />

            <div className="row">
                <div className="col-2 text-end">Fecha de venta: </div>
                <div className="col-2 text-start">{store.venta[0]?.fechacompra.slice(5, 16)}</div>
            </div>
            <div className="row">
                <div className="col-2 text-end">Fecha de pago:</div>
                <div className="col-2 text-start">{store.venta[0]?.fechapago ? store.venta[0]?.fechapago.slice(5, 16) : "Pago pendiente"}</div>
            </div>
            <div className="row">
                <div className="col-2 text-end">Cantidad: </div>
                <div className="col-2 text-start">{store.venta[0]?.cantidad}</div>
            </div>
            <div className="row">
                <div className="col-2 text-end">Precio unitario: </div>
                <div className="col-2 text-start">$ {store.venta[0]?.preciounitario}</div>
            </div>
            <div className="row">
                <div className="col-2 text-end">Método de pago: </div>
                <div className="col-2 text-start">{store.venta[0]?.TipoMetodo}</div>
            </div>
            <div className="row">
                <div className="col-2 text-end">Observaciones: </div>
                <div className="col-2 text-start">{store.venta[0]?.observaciones ? store.venta[0]?.observaciones : "Sin observaciones"}</div>
            </div>

            <br />
            <div className="row">
                <div className="col-2 text-end">Total:</div>
                <div className="col-2 text-start"><b style={{ color: "red" }}>$ {store.venta[0]?.cantidad * store.venta[0]?.preciounitario} </b></div>
            </div>

        </div>
    )
}

export default DetalleVenta