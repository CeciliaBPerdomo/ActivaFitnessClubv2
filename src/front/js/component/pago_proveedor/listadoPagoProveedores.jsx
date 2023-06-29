import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ListadoPagoProveedores = () => {
    const { store, actions } = useContext(Context);
    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {
        actions.obtenerPagoAProveedores()
    }, []);

    // Buscador
    const buscar = async (valor) => {
        if (busqueda === "") {
            await actions.obtenerPagoAProveedores();
         } else {
          await actions.obtenerPagoAProveedores();
          await actions.buscadorFacturaProveedor(valor);
     }
    };
    
    // Eliminar  
    const borrar = async (e, id) => {
        e.preventDefault();
        let resultado = await actions.borrarPagoProveedores(id)

        if (resultado === true) {
            toast.success("🤚 Borrado con éxito", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
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
                <div className="input-group mb-3 w-25 float-end">
                    {/* <input
                        type="text"
                        className="form-control "
                        placeholder="🔎 Buscar factura..."
                        onChange={(e) => setBusqueda(e.target.value)}
                        value={busqueda}
                    />
                    <button
                        className="btn btn-outline-danger"
                        type="button"
                        id="button-addon2"
                        onClick={(e) => buscar(busqueda)}
                    >
                        Buscar
                    </button> */}
                </div>
                
                <h3 style={{ marginBottom: "25px" }}>Pago a proveedores</h3>
                <hr />
                <br />

                <div style={{ marginTop: "35px" }}>
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Fecha de pago</th>
                                <th scope="col" className="text-center">Número de factura</th>
                                <th scope="col" className="text-center">Monto</th>
                                <th scope="col" className="text-center">Proveedor</th>
                                <th scope="col"className="text-center">Método de pago</th>
                                <th scope="col">Observaciones</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.pagoProveedores.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.fechapago}</td>
                                    <td className="text-center">{item.numfactura}</td>
                                    <td className="text-center">$ {item.monto}</td>
                                    <td className="text-center">{item.idproveedor}</td>
                                    <td className="text-center">{item.idmetodo}</td>
                                    <td>{item.observaciones}</td>
                                    <td>
                                        <Link to={"/ModificarPagoProveedor/" + item.id} 
                                        style={{ color: "white" }}>
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