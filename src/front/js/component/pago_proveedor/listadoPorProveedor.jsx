import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

export const ListadoPagoPorProveedor = () => {
    const { store, actions } = useContext(Context)
    const [proveedor, setProveedor] = useState("")

    const buscarPagos = (e) => {
        e.preventDefault()
       actions.obtenerPagoPorProveedor(proveedor)
    }

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
  
    useEffect(() => {
        actions.obtenerProveedores();
    }, []);

    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Pago según proveedor</h3>
                <hr />
                <br />

                <div className="container text-start">
                    <div className="row">
                        <div className="col-2">Seleccione el proveedor:</div>
                        <div className="col-4 d-flex justify-content-start">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={proveedor}
                                onChange={(e) => setProveedor(e.target.value)}
                            >
                                {store.proveedores.map((item, id) => (
                                <option key={id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <button
                                type="submit"
                                className="btn btn-outline-danger w-50"
                                onClick={(e) => buscarPagos(e)}
                            > Buscar pagos
                            </button>
                        </div>
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <table className="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Fecha de pago</th>
                            <th scope="col">Número de factura</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Método de pago</th>
                            <th scope="col">Observaciones</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {store.pagoPorProveedor.map((item, id) => ( 
                            <tr key={id}>
                                <td>{dateFormat(item.fechapago, "dd / mm / yy")}</td>
                                <td>{item.numfactura}</td>
                                <td>${item.monto}</td>
                                <td>{item.metodo}</td>
                                <td>{item.observaciones}</td>
                                <td>
                                    <Link to={"/ModificarPagoProveedor/" + item.id} style={{color: "white"}}>
                                        <i className="fa fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <i className="fa fa-trash" 
                                    onClick={(e) => borrar(e, item.id)}
                                    >
                                    </i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <ToastContainer />
            </div>
        </>
    )
}