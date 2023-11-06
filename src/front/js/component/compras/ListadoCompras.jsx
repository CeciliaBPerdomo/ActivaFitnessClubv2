import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

// Alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


function ListadoCompras() {
    const { store, actions } = useContext(Context);

    // Borra la compra
    const borrar = async (e, id) => {
        e.preventDefault();
        Swal.fire({
            position: 'top-end',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            title: '¿Estás seguro?',
            text: "No podrás recuperar la info luego!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No!'
        }).then((result) => {
            if (result.isConfirmed) {
                actions.borrarCompra(id),
                    Swal.fire({
                        position: 'top-end',
                        title: 'Borrado!',
                        text: 'La compra ha sido eliminada',
                        icon: 'success'
                    }
                    )
            }
        })
    };

    useEffect(() => {
        actions.obtenerCompras();
    }, []);

    return (
        <div className="container">
            <h3 style={{ marginBottom: "25px" }}>Compras</h3>
            <hr />
            <br />

            <div>
                {store.compras.msg == "No hay compras realizadas" ?
                    <p>No hay compras realizadas aún.</p> :
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">
                                    Fecha compra
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarComprasFechaAsc()}
                                    >
                                        ↑
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarComprasFechaDesc()}
                                    >
                                        ↓
                                    </button>
                                </th>
                                <th scope="col">Producto
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarComprasProductoAsc()}
                                    >
                                        ↑
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarComprasProductoDesc()}
                                    >
                                        ↓
                                    </button>
                                </th>
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
                                    <td className="align-middle">
                                        <img src={item.fotoProducto} style={{ width: "40px" }} />
                                    </td>
                                    <td className="align-middle">{item.fecha.slice(5, 16)}</td>
                                    <td className="align-middle">{item.nombreProducto}</td>
                                    <td className="text-center align-middle">{item.cantidad}</td>
                                    <td className="text-center align-middle">$ {item.preciocompra}</td>
                                    <td className="text-center align-middle">{item.nombreProveedor}</td>
                                    <td className="align-middle">{item.TipoMetodo}</td>
                                    <td className="align-middle">{item.observaciones}</td>
                                    <td className="align-middle">
                                        <Link to={"/detalleCompra/" + item.idCompra} style={{ color: "white" }}>
                                            <i className="fa fa-eye"></i>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={"/modificarCompra/" + item.idCompra} style={{ color: "white" }}>
                                            <i className="fa fa-pen"></i>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <i className="fa fa-trash"
                                            onClick={(e) => borrar(e, item.idCompra)}
                                        >
                                        </i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>

            <ToastContainer />
        </div>
    )
}

export default ListadoCompras