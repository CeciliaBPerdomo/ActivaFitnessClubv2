import React from 'react'
import { Link } from "react-router-dom";

function Alumnos() {

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ color: "red", background: "black" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Alumnos
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" 
                data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/CrearAlumno" style={{ textDecoration: "none", color: "white" }}>
                                Ingresar nuevo alumno
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/ListadoAlumnos" style={{ textDecoration: "none", color: "white" }}>
                                Listado de alumnos
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alumnos