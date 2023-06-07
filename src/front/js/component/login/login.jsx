import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../../../img/Login.jpg"

export const InicioSesion = () => {
    const { store, actions } = useContext(Context);
  
    useEffect(() => {
    }, []);

    return (
        <>
            <div className="container">
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="card bg-dark text-white" style={{borderRadius: "100px"}}>
                                <div className="card-body p-5 text-center">
                                    <h2 className="fw-bold">Iniciar sesión</h2>
                                    <p className="text-white-50 mb-5">Ingresa tu email y contraseña!</p>

                                    <div className="form-outline form-white mb-4">
                                        <input type="email" id="typeEmailX" 
                                        className="form-control form-control-lg" />
                                        <label className="form-label" 
                                        htmlFor="typeEmailX">Email</label>
                                    </div>


                                    <div className="input-group form-outline form-white mb-4">
                                        <input type="password" 
                                        className="form-control form-control-lg" />
                                        <button className="input-group-text" id="basic-addon1">
                                            <i className="fa fa-eye"></i>
                                        </button>
                                    </div>

                                    <div style={{marginTop: "-25px"}}>
                                        <label className="form-label" htmlFor="typePasswordX">
                                            Contraseña
                                        </label> 
                                    </div>
                                    
                                    <br />
                                    <div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                            Ingresar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <img src={Login} 
                            style={{width: "65%",
                            borderRadius: "100px"
                            }} />
                        </div>
                    </div>
                </div>
                
                <ToastContainer />
            </div>
        </>
    );
};