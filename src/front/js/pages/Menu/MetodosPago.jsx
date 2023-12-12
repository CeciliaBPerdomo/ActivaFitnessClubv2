import React from 'react'
import { Link } from "react-router-dom";


function MetodosPago() {
    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix"
                        aria-expanded="false" aria-controls="flush-collapseSix">
                        Métodos de pago
                    </button>
                </h2>
                <div id="flush-collapseSix"
                    className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/MetodosPago" style={{ textDecoration: "none", color: "white" }}>
                                Ingresar nuevo método de pago
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/ListadoMetodos" style={{ textDecoration: "none", color: "white" }}>
                                Listado de métodos de pago
                            </Link>
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default MetodosPago