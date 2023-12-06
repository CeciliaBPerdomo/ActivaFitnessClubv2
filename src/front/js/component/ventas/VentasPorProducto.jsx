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

function VentasPorProducto() {
    const { store, actions } = useContext(Context)

    const [idProducto, setIdProducto] = useState("")
    const [docImprimir, setDocImprimir] = useState([])
    const [nombreProducto, setNombreProducto] = useState("")

    useEffect(() => {
        actions.obtenerProductos()
    }, []);

    // Buscador
    const buscar = async () => {
        await actions.obtenerVentas();
        await actions.buscadorVentas(idProducto);

        // Pdf info
        setDocImprimir(store.ventas)
        setNombreProducto(store.ventas[0].nombreProducto)
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
    doc.text("Ventas de: " + nombreProducto, 65, 20)

    // Info tabla
    docImprimir.map((item, id) => {
        i = i + 10 // Contador para cantidad del renglon

       // Informacion para la tabla
        data = [...data,
            [
                item.fechacompra.slice(5, 16),
                item.nombreUsuario,
                item.nombreProducto,
                item.cantidad,
                item.TipoMetodo,
                "$ " + (item.preciounitario * item.cantidad),
            ]
        ]
       
        montoTotal = parseInt(item.preciounitario * item.cantidad) + montoTotal
    })

    const columns = ["Fecha compra", "Alumno", "Producto", "Cantidad", "Forma de pago", "Total"]

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
            ["Total de ventas: $"
                + montoTotal
            ],
        ]
    })

    doc.save("Ventas_de_" + nombreProducto + ".pdf");
}

    return (
        <div className="container">
            <h4 style={{ marginBottom: "25px" }}>Ventas por producto</h4>
            <hr />
            <br />

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
                        Buscar ventas
                    </button>
                </div>
            </div>

            <hr />
            <br />

            {/* Tabla de ventas por producto */}
            <div>
                {store.ventas.length < 1 ?
                    <p>No hay ventas para el producto seleccionado.</p> :
                    <table className="table" style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th scope="col">
                                    Fecha de venta
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarVentasFechaAsc()}
                                    >
                                        ↑
                                    </button>
                                    <button type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ marginLeft: "3px", fontSize: "12px" }}
                                        onClick={() => actions.ordenarVentasFechaDesc()}
                                    >
                                        ↓
                                    </button>
                                </th>
                                <th scope="col" className="text-center">Alumno</th>
                                <th scope="col" className="text-center">Producto
                                </th>
                                <th scope="col" className="text-center">Cantidad</th>
                                <th scope="col" className="text-center">Precio unitario</th>
                                <th scope="col" className="text-center">Total</th>
                                <th scope="col">Pago</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.ventas.map((item, id) => (
                                <tr key={id}>
                                    <td className="align-middle">{item.fechacompra.slice(5, 16)}</td>
                                    <td className="align-middle text-center">{item.nombreUsuario}</td>
                                    <td className="align-middle text-center">{item.nombreProducto}</td>
                                    <td className="text-center align-middle">{item.cantidad}</td>
                                    <td className="text-center align-middle">$ {item.preciounitario}</td>
                                    <td className="text-center align-middle">$ {item.preciounitario * item.cantidad}</td>
                                    <td className="align-middle">{item.TipoMetodo}</td>
                                    <td className="align-middle">
                                        <Link to={"/detalleVenta/" + item.idVenta} style={{ color: "white" }}>
                                            <i className="fa fa-eye"></i>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={"/modificarVenta/" + item.idVenta} style={{ color: "white" }}>
                                            <i className="fa fa-pen"></i>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <i className="fa fa-trash"
                                            onClick={(e) => borrar(e, item.idVenta)}
                                        >
                                        </i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                <br />
            </div>

            <ToastContainer />
        </div>
    )
}

export default VentasPorProducto