import React from 'react'
import { Link } from "react-router-dom";

function Mensualidades() {
    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo"
                        style={{ color: "red", background: "black" }}>
                        Mensualidades
                    </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body"  style={{ color: "white", background: "black" }}>

                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/CrearMensualidad" style={{ textDecoration: "none", color: "white" }}>
                                Ingresar pago de mensualidad
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/ListadoMensualidades" style={{ textDecoration: "none", color: "white" }}>
                                Listado de mensualidades
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/CuotasPendientes" style={{ textDecoration: "none", color: "white" }}>
                                Listado de mensualidades pendientes
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mensualidades