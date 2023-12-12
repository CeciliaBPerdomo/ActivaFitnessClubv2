import React from 'react'
import { Link } from "react-router-dom";


function Modalidades() {
    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour"
                        aria-expanded="false" aria-controls="flush-collapsefour">
                        Modalidades de entrenamiento
                    </button>
                </h2>
                <div id="flush-collapsefour"
                    className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/CrearCuota" style={{ textDecoration: "none", color: "white" }}>
                                Ingresar modalidades de entrenamiento
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/ListadoCuotas" style={{ textDecoration: "none", color: "white" }}>
                                Listado de modalidades de entrenamiento
                            </Link>
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modalidades