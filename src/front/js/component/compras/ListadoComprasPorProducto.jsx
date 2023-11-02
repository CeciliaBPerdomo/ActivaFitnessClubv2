import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// PDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

// Logo
import activa from "../../../img/LogoSinFondo.png"

function ListadoComprasPorProducto() {
    const { store, actions } = useContext(Context)

    const [ idProducto, setIdProducto ] = useState("")
    const [ docImprimir, setDocImprimir ] = useState([])
    const [ nombreProducto, setNombreProducto ] = useState("")

    useEffect(() => {
        actions.obtenerProductos()
    }, []);

    // Buscador
    const buscar = async () => {
        await actions.obtenerCompras();
        await actions.buscadorCompras(idProducto);
        
        // Pdf info
        setDocImprimir(store.compras)
        setNombreProducto(store.compras[0].nombreProducto)
    };


    // Borrar compra
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

    // Imprimir 
    const imprimir = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();
        let montoTotal = 0

        let data = []           // Array de info
        let i = 35              // Renglones

        // Agregar la imagen al PDF (X, Y, Width, Height)
        doc.addImage(activa, 'PNG', 15, 10, 16, 15);

        // Titulo
        doc.text("Compras", 65, 20)

        doc.setFontSize(11)
        doc.text("Producto: " + nombreProducto, 65, 25)

        // Info tabla
        docImprimir.map((item, id) => {
            i = i + 10 // Contador para cantidad del renglon

            // Informacion para la tabla
            data = [...data,
            [
                item.fecha.slice(5, 16),
                item.cantidad,
                "$ " + item.preciocompra,
                item.nombreProveedor,
                item.TipoMetodo,
            ]
            ]
            // CantidadAlumnos++
            montoTotal = parseInt(item.preciocompra) + montoTotal
        })

        const columns = ["Fecha", "Cantidad", "Precio de compra", "Proveedor", "Forma de pago"]

        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: { halign: 'center' }, // Centra los titulos
            bodyStyles: { halign: "center" }, // Centra la info de la tabla

            head: [columns],
            body: data
        })


        doc.autoTable({
            startY: i,
            theme: 'plain',
            bodyStyles: { halign: "right" },

            body: [
                ["Total de compras: $"
                    + montoTotal
                ],
                // ["Total de facturación: $ "
                //     + montoTotal
                // ],
            ]
        })

       doc.save("Compras.pdf");
    }

    return (
        <div className="container">

            <h3 style={{ marginBottom: "25px" }}>
                Compras según producto
            </h3>
            <hr />

            {/* Seleccionar producto */}
            <div className="row">
                <div className="col-2 text-end align-middle">
                    Seleccione el producto:
                </div>
                <div className="col-4">
                    <select className="form-select"
                        value={idProducto}
                        onChange={(e) => setIdProducto(e.target.value)}
                    >
                        <option selected>Productos</option>
                        {store.productos.map((item, id) => (
                            <option key={id} value={item.id}>{item.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <button
                        type="submit"
                        className="btn btn-outline-danger"
                        onClick={(e) => buscar(e)}
                    >
                        Buscar compras
                    </button>
                </div>
            </div>

            <hr />

            {/* Tabla que muestra el resultado */}
            <div style={{ marginTop: "35px" }}>
                {store.compras ?
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">Fecha compra</th>
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
                                    <td className="align-middle">{item.fecha.slice(5, 16)}</td>
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
                    </table> :
                    <p>No hay compras realizadas aún.</p> 
                }
            </div>

            {/* PDFs */}
            <div> 
                <button
                    type="button"
                    className="btn btn-outline-danger float-end"
                    onClick={imprimir}
                    >
                    <i className="fa fa-print"></i>
                </button>
            </div>
            <br/>
        </div>
    )
}

export default ListadoComprasPorProducto