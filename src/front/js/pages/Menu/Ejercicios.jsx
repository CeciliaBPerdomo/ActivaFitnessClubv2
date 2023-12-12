import React from 'react'
import { Link } from "react-router-dom";

function Ejercicios() {
    let data = [
        {
            "name": "Ingresar nuevo ejercicio",
            "web": "/ingresarEjercicio"
        },
        {
            "name": "Listado de ejercicios",
            "web": "/listadoEjercicios"
        },
        {
            "name": "Listado de ejercicios por tipo",
            "web": "/ejercicioPorTipo"
        },
    ]

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseDos"
                        aria-expanded="false" aria-controls="flush-collapseDos">
                        Ejercicios
                    </button>
                </h2>
                <div id="flush-collapseDos"
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

export default Ejercicios