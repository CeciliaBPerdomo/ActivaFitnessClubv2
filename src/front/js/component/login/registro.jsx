import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Registro = () => {
    const { store, actions } = useContext(Context)

    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [genero, setGenero] = useState("")


    const guardar = (e) => {
        e.prenventDefault()
        
    }

    return (
        <>
            <div className="container">
                <h2 className="fw-bold" style={{ marginTop: "45px" }}>
                    Registrarse
                </h2>
                <hr /> <br />

                <div className="card bg-black border border-danger text-white"
                    style={{ padding: "15px" }}>

                    <form>
                        <div className="row">
                            {/* Cedula */}
                            <div className="col">
                                <label htmlFor="cedula" style={{ marginBottom: "10px" }}>
                                    Cédula <label style={{ color: "red" }}>(Obligatorio)</label>:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cédula (sin puntos ni guiones)"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                />
                            </div>

                            {/* Nombre */}
                            <div className="col">
                                <label htmlFor="nombre" style={{ marginBottom: "10px" }}>
                                    Nombre <label style={{ color: "red" }}>(Obligatorio)</label>:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            {/* Apellido */}
                            <div className="col">
                                <label htmlFor="apellido" style={{ marginBottom: "10px" }}>
                                    Apellido <label style={{ color: "red" }}>(Obligatorio)</label>:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                />
                            </div>
                        </div>

                        <br />
                        <div className="row">
                            {/* Direccion */}
                            <div className="col">
                                <label htmlFor="direccion" style={{ marginBottom: "10px" }}>
                                    Dirección <label style={{ color: "red" }}>(Obligatorio)</label>:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="mail" style={{ marginBottom: "10px" }}>
                                    Correo electrónico <label style={{ color: "red" }}>(Obligatorio)</label>:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            {/* Genero */}
                            <div className="col">
                                <label htmlFor="Estado" style={{ marginBottom: "10px" }}>
                                    Género <label style={{ color: "red" }}>(Obligatorio)</label>:
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                >
                                    <option>Género</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                </select>
                            </div>
                        </div>

                        <br />
                        <div style={{ marginTop: "15px", marginBottom: "75px" }}>
                            <button
                                type="submit"
                                className="btn btn-outline-danger float-end w-25"
                                onClick={(e) => guardar(e)}
                            >
                                Crear usuario
                            </button>
                        </div>

                    </form>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};