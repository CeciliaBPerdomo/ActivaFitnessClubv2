import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../../../img/Login.jpg"

export const InicioSesion = () => {
    const { store, actions } = useContext(Context)

    // Visibilidad de la password
    const [passwordShown, setPasswordShown] = useState(false)
    const [eye, setEye] = useState(false)

   const [password, setPassword] = useState("")
   const [email, setEmail] = useState("")

   let navegacion = useNavigate()

    // Visibilidad de la password
    const togglePassword = () => {
        setPasswordShown(!passwordShown)
        setEye(!eye)
    };

    const logueo = async () => {
        // e.preventDefault()
        await actions.loginAdministrador(email, password)       

        if (store.auth === true) {
            if (store.usuarioLogueado.rol == "Administrador"){
                navegacion("/homeAdministrador")
            } else {
                navegacion(`/homeAlumno/${store.usuarioLogueado.id}`)
            }
        } else {
            toast.error("Error al ingresar el usuario", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
        }
    }

    return (
        <>
            <div className="container">
               
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="card bg-black border border-danger text-white" 
                                style={{borderRadius: "100px", 
                                height: "560px"}}>
                                <div className="card-body p-5 text-center">
                                    
                                    <h2 className="fw-bold"
                                        style={{marginTop: "45px"}}
                                    >
                                        Iniciar sesión</h2>
                                    <p className="text-white-50 mb-5">Ingresa tu email y contraseña!</p>

                                    {/* Email */}
                                    <div className="form-outline form-white mb-4">
                                        <input type="email" 
                                        id="typeEmailX" 
                                        className="form-control form-control-lg"
                                       // value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label className="form-label" 
                                        htmlFor="typeEmailX">Email</label>
                                    </div>


                                    {/* Password */}
                                    <div className="input-group form-outline form-white mb-4">
                                        <input type={passwordShown ? "text" : "password"} 
                                        className="form-control form-control-lg"
                                        //value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button className="input-group-text" id="basic-addon1"
                                        onClick={togglePassword}>
                                            <i className={eye ? "fa fa-eye-slash": "fa fa-eye"}></i>
                                        </button>
                                    </div>

                                    <div style={{marginTop: "-25px"}}>
                                        <label className="form-label" htmlFor="typePasswordX">
                                            Contraseña
                                        </label> 
                                    </div>
                                    
                                    <br />

                                    {/* Boton de ingreso */}
                                    <div style={{marginTop: "20px"}}>
                                        <button className="btn btn-outline-danger w-50" 
                                        type="submit"
                                        onClick={logueo}>
                                            Ingresar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Imagen */}
                        <div className="col">
                            <img src={Login} 
                            style={{height: "560px",
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