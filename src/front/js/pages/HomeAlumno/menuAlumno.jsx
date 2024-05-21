import React, { useContext } from "react";
import { Context } from "../../store/appContext";

// Mis datos, mis mensualidades, mis rutinas 
// Productos disponibles para comprar on-line

export const MenuAlumno = () => {
    const { actions, store } = useContext(Context)

    const estadoDatosPersonales = (estado) => {
        actions.visualizarComponentes(estado)
    }

    return (
        <div className="container">

            <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => estadoDatosPersonales("Personales")}
                        style={{ fontSize: "15px", marginLeft: "10px", color: "red", width: "180px" }}
                    >
                        Mis datos personales
                    </button>
                </div>
            </div>

            <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col">
                    <button
                        onClick={() => estadoDatosPersonales("Pagos")}
                        className="btn btn-outline-danger"
                        style={{ fontSize: "15px", marginLeft: "10px", color: "red", width: "180px" }}
                    >
                        Mis pagos mensuales
                    </button>
                </div>
            </div>

            <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col">
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: "15px", marginLeft: "10px", color: "red", width: "180px" }}
                    >
                        Mis rutinas
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: "15px", marginLeft: "10px", color: "red", width: "180px" }}
                    >
                        Tienda
                    </button>
                </div>

            </div>
        </div>
    )
}