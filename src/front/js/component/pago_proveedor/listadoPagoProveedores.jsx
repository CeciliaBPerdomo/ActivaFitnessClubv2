import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export const ListadoPagoProveedores = () => {
    const { store, actions } = useContext(Context);
  
    useEffect(() => {
        actions.obtenerPagoAProveedores()
    }, []);

    // Eliminar  
    const borrar = (e, id) => {
        e.preventDefault();
        if (actions.borrarPagoProveedores(id)) {
        toast.error("🤚 Borrado con éxito", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
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
        <>
            <div className="container">
                <div style={{ marginTop: "35px" }}> 
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Fecha de pago</th>
                                <th scope="col">Número de factura</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Proveedor</th>
                                <th scope="col">Método de pago</th>
                                <th scope="col">Observaciones</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {store.pagoProveedores.map((item, id) => ( 
                            <tr key={id}>
                                <td>
                                    {
                                    (new Date(item.fechapago).getDate() + 1)
                                    + "/" + 
                                    (new Date(item.fechapago).getMonth() + 1)
                                    + "/" + 
                                    (new Date(item.fechapago).getFullYear())
                                    }
                                </td>
                                <td>{item.numfactura}</td>
                                <td>${item.monto}</td>
                                <td>{item.idproveedor}</td>
                                <td>{item.idmetodo}</td>
                                <td>{item.observaciones}</td>
                                <td>
                                    <Link to={"/ModificarPagoProveedor/" + item.id} style={{color: "white"}}>
                                        <i className="fa fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <i className="fa fa-trash" onClick={(e) => borrar(e, item.id)}>
                                    </i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
                <br />
            </div>
        </>
    )
}