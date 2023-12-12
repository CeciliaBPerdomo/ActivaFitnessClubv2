import React from 'react'
import { Link } from "react-router-dom";


function TipoEjercicios() {
    let data = [
        {
            "name": "Ingresar nuevo tipo de ejercicio",
            "web": "/ingresarTipoEjercicio"
        },
        {
            "name": "Listado de tipos de ejercicios",
            "web": "/listadoTipoEjercicios"
        },
    ]

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTres"
                        aria-expanded="false" aria-controls="flush-collapseTres">
                        Tipo de ejercicios
                    </button>
                </h2>
                <div id="flush-collapseTres"
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

export default TipoEjercicios