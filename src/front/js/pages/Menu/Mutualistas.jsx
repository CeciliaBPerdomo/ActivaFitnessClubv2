import React from 'react'
import { Link } from "react-router-dom";


function Mutualistas() {
    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed"
                        style={{ background: "black", color: "red" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive"
                        aria-expanded="false" aria-controls="flush-collapseFive">
                        Mutualistas
                    </button>
                </h2>
                <div id="flush-collapseFive"
                    className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/Mutualista" style={{ textDecoration: "none", color: "white" }}>
                                Ingresar nueva mutualista
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/ListadoMutualista" style={{ textDecoration: "none", color: "white" }}>
                                Listado de mutualistas
                            </Link>
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mutualistas