import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProveedorDetalle = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerProveedorId(parseInt(params.theid));
  }, []);


  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: "15px" }}>
          Proveedor: {store.proveedor[0]?.nombre}
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
            <div className="col-md-12">
              <div className="card-body">
                <div className="container text-left">
                  <div className="row row-cols-2">
                    <div className="col">RUT:</div>
                    <div className="col">
                      <b>{store.proveedor[0]?.rut}</b>
                    </div>

                    <div className="col">Dirección:</div>
                    <div className="col">
                      <b>{store.proveedor[0]?.direccion}</b>
                    </div>


                    <div className="col">Telefono:</div>
                    <div className="col">
                      <b>{store.proveedor[0]?.telefono}</b>
                    </div>


                    <div className="col">Email:</div>
                    <div className="col">
                      <b>{store.proveedor[0]?.mail}</b>
                    </div>
                    <div className="col">Observaciones:</div>
                    <div className="col">
                      <b>{store.proveedor[0]?.observaciones}</b>
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
