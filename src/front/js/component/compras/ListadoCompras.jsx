import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListadoCompras() {

    const { store, actions } = useContext(Context);
    const [busqueda, setBusqueda] = useState("");

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

    useEffect(() => {
        actions.obtenerCompras();
    }, []);


    return (
        <div className="container">
            <div className="input-group mb-3 w-25 float-end">
                <input
                    type="text"
                    className="form-control "
                    placeholder="🔎 Buscar productos"
                // onChange={(e) => setBusqueda(e.target.value)}
                //             value={busqueda}
                />
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    id="button-addon2"
                // onClick={(e) => buscar(busqueda)}
                >
                    Buscar
                </button>
            </div>

            <h3 style={{ marginBottom: "25px" }}>Compras</h3>
            <hr />
            <br />

            <div style={{ marginTop: "35px" }}>
                <table className="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Fecha compra</th>
                            <th scope="col">Producto</th>
                            <th scope="col" className="text-center">Cantidad</th>
                            <th scope="col" className="text-center">Precio de compra</th>
                            <th scope="col" className="text-center">Proveedor</th>
                            <th scope="col">Pago</th>
                            <th scope="col">Observaciones</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.compras.map((item, id) => (
                            <tr key={id}>
                                <td>{item.fecha.slice(5, 16)}</td>
                                <td>{item.nombreProducto}</td>
                                <td className="text-center">{item.cantidad}</td>
                                <td className="text-center">$ {item.preciocompra}</td>
                                <td className="text-center">{item.nombreProveedor}</td>
                                <td>{item.TipoMetodo}</td>
                                <td>{item.observaciones}</td>
                                <td><i className="fa fa-eye"></i></td>
                                <td>
                                    <Link to={"//" + item.id} style={{ color: "white" }}>
                                        <i className="fa fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <i className="fa fa-trash"
                                    onClick={(e) => borrar(e, item.idCompra)}
                                    >
                                    </i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <ToastContainer />
        </div>
    )
}

export default ListadoCompras