import React from 'react'
import { Link } from "react-router-dom";


function Proveedores() {
    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven"
                        aria-expanded="false" aria-controls="flush-collapseSeven">
                        Proveedores
                    </button>
                </h2>
                <div id="flush-collapseSeven"
                    className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/CrearProveedor" style={{ textDecoration: "none", color: "white" }}>
                                Ingresar nuevo proveedor
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/ListadoProveedores" style={{ textDecoration: "none", color: "white" }}>
                                Listado de proveedores
                            </Link>
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proveedores