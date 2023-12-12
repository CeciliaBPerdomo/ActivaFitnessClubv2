import React from 'react'
import { Link } from "react-router-dom";

function PagoProveedores() {
    let data = [
        {
            "name": "Ingresar nuevo pago a proveedor",
            "web": "/CrearPagoProveedor"
        },
        {
            "name": "Listado de pago a proveedores",
            "web": "/ListadoPagoProveedores"
        },
        {
            "name": "Listado de pago según proveedor",
            "web": "/ListadoPagoPorProveedor"
        },
    ]

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUno"
                        aria-expanded="false" aria-controls="flush-collapseUno">
                        Pago a proveedores
                    </button>
                </h2>
                <div id="flush-collapseUno"
                    className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        {data.map((item, id) => (
                            <p style={{ fontSize: "15px", marginLeft: "10px" }} key={id}>
                                <Link to={item.web} style={{ textDecoration: "none", color: "white" }}>
                                    {item.name}
                                </Link>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagoProveedores