import React from 'react'
import { Link } from "react-router-dom";

function BalanceDiario() {
    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" 
                    style={{background: "black", color: "red"}}
                    type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" 
                    aria-expanded="false" aria-controls="flush-collapseThree">
                        Balances
                    </button>
                </h2>
                <div id="flush-collapseThree" 
                className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{ color: "white", background: "black" }}>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/movimientosDiarios" style={{ textDecoration: "none", color: "white" }}>
                                Movimientos diarios
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/cajaDiariaporFecha" style={{ textDecoration: "none", color: "white" }}>
                                Facturación mensual
                            </Link>
                        </p>
                        
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/facturacion_metodo" style={{ textDecoration: "none", color: "white" }}>
                                Facturación por método de pago
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/resumenMovimientos" style={{ textDecoration: "none", color: "white" }}>
                                Resumen de movimientos diarios
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/cierreMensual" style={{ textDecoration: "none", color: "white" }}>
                                Cierre balance mensual
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/balanceMensual" style={{ textDecoration: "none", color: "white" }}>
                                Resumen de balance mensual
                            </Link>
                        </p>
                        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
                            <Link to="/instructivo" style={{ textDecoration: "none", color: "white" }}>
                                Instrucciones para realizar los cierres
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceDiario