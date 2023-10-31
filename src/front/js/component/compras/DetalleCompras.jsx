import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetalleCompras() {
    const params = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.obtenerCompraId(parseInt(params.theid));
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();

        let resultado = await actions.borrarCompra(id)

        if (resultado === true) {
            toast.success("🤚 Borrado con éxito", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error("No se puede borrar", {
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

    return (
        <div className="container">
            <h3 style={{ marginBottom: "15px" }}>
                Compra de: {store.compra[0]?.nombreProducto}

                <div className="float-end">
                    <Link to={"/modificarCompra/" + store.compra[0]?.idCompra} style={{ color: "white" }}>
                        <i className="fa fa-pen" style={{ marginRight: "15px" }}></i>
                    </Link>

                    <i className="fa fa-trash"
                        style={{ marginRight: "15px" }}
                        onClick={(e) => borrar(e, store.compra[0]?.idCompra)}
                    >
                    </i>

                </div>
            </h3>

            <hr />
            <br />

            <div>
                <div className="row g-0 ">
                    <div className="col-md-4" style={{ marginLeft: "60px", padding: "10px" }}>
                        <img src={store.compra[0]?.fotoProducto}
                            className="img-fluid rounded"
                            alt={store.compra[0]?.nombreProducto} />
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-2 text-end fw-bold">
                        Fecha de compra:
                    </div>
                    <div className="col-2 text-start">
                        {store.compra[0]?.fecha.slice(5, 16)}
                    </div>
                    <div className="col-2 text-end fw-bold">
                        Cantidad:
                    </div>
                    <div className="col text-start">
                        {store.compra[0]?.cantidad}
                    </div>
                </div>

                <div className="row">
                    <div className="col-2 text-end fw-bold">
                        Precio de compra:
                    </div>
                    <div className="col-2 text-start">
                        $ {store.compra[0]?.preciocompra}
                    </div>
                    <div className="col-2 text-end fw-bold">
                        Proveedor:
                    </div>
                    <div className="col text-start">
                        {store.compra[0]?.nombreProveedor}
                    </div>
                </div>

                <div className="row">
                    <div className="col-2 text-end fw-bold">
                        Método de pago:
                    </div>
                    <div className="col-2 text-start">
                        {store.compra[0]?.TipoMetodo}
                    </div>
                    <div className="col-2 text-end fw-bold">
                        Observaciones:
                    </div>
                    <div className="col text-start">
                        {store.compra[0]?.observaciones}
                    </div>
                </div>
            </div>

            <ToastContainer />
            <br />
        </div>
    )
}

export default DetalleCompras