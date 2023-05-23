import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export const ModificarPagoProveedor = () => {
    const params = useParams();
    const {store, actions} = useContext(Context);

    const [proveedor, setProveedor] = useState(store.pagoProveedor.idproveedor);
    const [fechaPago, setFechaPago] = useState(store.pagoProveedor.fechaPago);
    const [factura, setFactura] = useState(store.pagoProveedor.numfactura);
    const [monto, setMonto] = useState(store.pagoProveedor.monto);
    const [idmetodo, setIdMetodo] = useState(store.pagoProveedor.idmetodo);
    const [observaciones, setObservaciones] = useState(store.pagoProveedor.observaciones)

    useEffect(() => {
        actions.obtenerPagoProveedorId(parseInt(params.theid));
        actions.obtenerMetodos()
        actions.obtenerProveedores();
    }, []);

    const modificar = (e) => {
        e.preventDefault();
        let id = parseInt(params.theid)
    
        if (actions.modificarPagoProveedores(
            id,
            fechaPago,
            factura,
            monto,
            observaciones,
            proveedor,
            idmetodo)) {
          toast.success("💪 Modificado con éxito", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      };

    return(
        <>
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Modificar pago a proveedor</h3>
            <hr />
            <br />

            <form>
                <div className="row">
                    {/* Proveedor */}
                    <div className="col">
                    <label htmlFor="idProvedor" style={{ marginBottom: "10px" }}>
                        Id de Proveedor:
                    </label>
                    <select
                        className="form-select"
                        defaultValue={store.pagoProveedor[0]?.idproveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                    >
                        <option selected>{store.pagoProveedor[0]?.proveedor}</option>
                        {store.proveedores.map((item, id) => (
                        <option key={id} value={item.id}>{item.nombre}</option>
                        ))}
                    </select>
                    </div>

                    {/* Fecha de pago */}
                    <div className="col">
                    <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                        Fecha de pago:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={dateFormat(store.pagoProveedor[0]?.fechapago, "dd / mm / yy")}
                        onChange={(e) => setFechaPago(e.target.value)}
                    />
                    </div>

                    {/* Numero de factura */}
                    <div className="col">
                    <label htmlFor="factura" style={{ marginBottom: "10px" }}>
                        Factura:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Número de factura"
                        defaultValue={store.pagoProveedor[0]?.numfactura}
                        onChange={(e) => setFactura(e.target.value)}
                    />
                    </div>
                </div>

                <br />
                <div className="row">
                    {/* Monto */}
                    <div className="col">
                    <label htmlFor="monto" style={{ marginBottom: "10px" }}>
                        Monto:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Monto de la factura"
                        defaultValue={store.pagoProveedor[0]?.monto}
                        onChange={(e) => setMonto(e.target.value)}
                    />
                    </div>

                    {/* Metodo de pago */}
                    <div className="col">
                    <label htmlFor="metodo" style={{ marginBottom: "10px" }}>
                        Método de pago:
                    </label>
                    <select
                        className="form-select"
                        defaultValue={store.pagoProveedor[0]?.idmetodo}
                        onChange={(e) => setIdMetodo(e.target.value)}
                    >
                        <option selected>{store.pagoProveedor[0]?.metodo}</option>
                        {store.metodos.map((item, id) => (
                        <option key={id} value={item.id}>{item.tipo}</option>
                        ))}
                    </select>
                    </div>
                </div>

                <br />
                <div className="row">
                    {/* Observaciones */}
                    <div className="col">
                    <label htmlFor="observaciones" style={{ marginBottom: "10px" }}>
                        Observaciones:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Observaciones"
                        defaultValue={store.pagoProveedor[0]?.observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                    />
                </div>
                </div>

                <br />
                <div className="row">
                    <div style={{ marginTop: "15px" }}>
                    <button
                        type="submit"
                        className="btn btn-outline-danger float-end w-25"
                        onClick={(e) => modificar(e)}
                    >
                        Modificar info de pago
                    </button>
                    </div>
                </div>

            </form>
        </div>
        <ToastContainer />
        <br />
        </>
    )
}