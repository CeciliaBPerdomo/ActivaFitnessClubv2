import React from 'react'
import { Link } from "react-router-dom";


function Ventas() {
    let data = [
        {
            "name": "Ingresar nueva venta",
            "web": "/ingresarVenta"
        },
        {
            "name": "Listado de ventas",
            "web": "/listadoVentas"
        },
        {
            "name": "Ventas por rango de fechas",
            "web": "/ventas_porfecha"
        },
        {
            "name": "Ventas por producto",
            "web": "/ventas_porproducto"
        },
        {
            "name": "Ventas por alumno",
            "web": "/ventas_por_alumno"
        },
        {
            "name": "Listado de ventas pendientes de pago",
            "web": "/ventas_pendientes"
        },
    ]

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen"
                        aria-expanded="false" aria-controls="flush-collapseTen">
                        Ventas
                    </button>
                </h2>
                <div id="flush-collapseTen"
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

export default Ventas