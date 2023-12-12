import React from 'react'
import { Link } from "react-router-dom";

function Compras() {
    let data = [
        {
            "name": "Ingresar nueva compra",
            "web": "/nuevaCompra"
        },
        {
            "name": "Listado de compras",
            "web": "/listadoCompras"
        },
        {
            "name": "Compras por producto",
            "web": "/compras_por_producto"
        },
        {
            "name": "Compras por fechas",
            "web": "/compras_por_fechas"
        },
    ]

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine"
                        aria-expanded="false" aria-controls="flush-collapseNine">
                        Compras
                    </button>
                </h2>
                <div id="flush-collapseNine"
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

export default Compras