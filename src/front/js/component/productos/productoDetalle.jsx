import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductoDetalle = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);
  let navegacion = useNavigate();

  useEffect(() => {
    actions.obtenerProveedores();
    actions.obtenerProductosId(parseInt(params.theid));
  }, []);

  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: "15px" }}>
          Producto: {store.producto[0]?.nombre}
        </h3>
        <hr />
        <br />

        <div
          className="card mb-3"
          style={{
            width: "540px",
            backgroundColor: "black",
            color: "white",
            marginLeft: "30px",
          }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={store.producto[0]?.foto}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="container text-left">
                  <div className="row row-cols-2">
                    <div className="col">Cantidad:</div>
                    <div className="col">
                      <b>{store.producto[0]?.cantidad}</b>
                    </div>
                    <div className="col">Precio de venta:</div>
                    <div className="col">
                      <b>${store.producto[0]?.precioventa}</b>
                    </div>

                    <div className="col">Proveedor:</div>
                    <div className="col">
                      <b>{store.producto[0]?.proveedorInfo.nombre}</b>
                    </div>
                    <div className="col">Observaciones:</div>
                    <div className="col">
                      <b>{store.producto[0]?.observaciones}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <br />
    </>
  );
};
