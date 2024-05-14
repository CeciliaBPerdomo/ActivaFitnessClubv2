import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ejercicios_Rutina from "./ejercicios_rutina.jsx";


function AgregarEjerciciosRutina() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [idTipo, setIdTipo] = useState("")
    const [resp, setResp] = useState(false)

    const [idEjercicio, setIdEjercicio] = useState("")
    const [cantidadSeries, setCantidadSeries] = useState("")
    const [carga, setCarga] = useState("")
    const [repeticiones, setRepeticiones] = useState("")
    const [semana, setSemana] = useState("")

    useEffect(() => {
        actions.obtenerTipoDeEjercicios();
        actions.obtenerRutina_IdRutina(params.theid)
    }, [])

    // Buscar los ejercicios por tipo
    const buscar = async (valor) => {
        if (idTipo === "") {
            toast.error("Debe seleccionar un tipo de ejercicio, boboncho", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            await actions.obtenerEjercicios();
            let ejercicios = await actions.buscadorEjercicioPorTipo(valor); //store.ejercicios
            setResp(ejercicios)
        }
    };

    // Agregar el ejercicio a la rutina
    const agregar = async (e) => {
        e.preventDefault()
        let resp = chequeo()
        if (resp) {
            let result = await actions.agregarEjercicios(cantidadSeries, carga, repeticiones, semana, params.theid, idEjercicio)
            if (result) {
                actions.obtenerRutina_IdRutina(params.theid)
            }
        }
    }

    // Chequeo de ingreso de datos
    function chequeo() {
        function mensaje(texto) {
            toast.error(texto, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        if (idEjercicio == "") {
            mensaje("Debes seleccionar el ejercicio")
            return false
        }

        if (cantidadSeries == "") {
            mensaje("Debes ingresar la cantidad de series")
            return false
        }

        if (carga == "") {
            mensaje("Debes ingresar la cantidad de carga")
            return false
        }

        if (repeticiones == "") {
            mensaje("Debes ingresar la cantidad de repeticiones")
            return false
        }

        if (semana == "") {
            mensaje("Debes ingresar la semana")
            return false
        }

        if (semana != "" && repeticiones != "" && carga != "" && cantidadSeries != "" && idEjercicio != "") {
            return true
        }
    }

   
    return (
        <div className="container">
            <div>
                <h3 style={{ marginBottom: "25px" }}>
                    Rutina
                </h3>
                <hr />
                <br />
            </div>

            {/* Tipo de ejercicios */}
            <div className="row">
                <div className="col-3">
                    <p className="align-middle">
                        Seleccione el tipo de ejercicio:
                    </p>
                </div>
                <div className="col">
                    <select className="form-select"
                        value={idTipo}
                        onChange={(e) => setIdTipo(e.target.value)}
                    >
                        <option selected>Tipo de Ejercicio</option>
                        {store.tiposEjercicios.map((item, id) => (
                            <option key={id} value={item.id}>
                                {item.descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col" style={{ marginBottom: "10px" }}>
                    <button className="btn btn-outline-danger" onClick={() => buscar(idTipo)}>
                        Buscar ejercicios
                    </button>
                </div>
                <hr />

                {/* Ingresar informacion respecto a los ejercicios */}
                <div>
                    {!resp ?
                        <div>
                            <p>Debe selecionar el tipo de ejercicio</p>
                            <hr />
                        </div>
                        :
                        <div>
                            <div className="row">
                                <div className="col-1">
                                    <p className="align-middle">
                                        Ejercicio:
                                    </p>
                                </div>
                                <div className="col-3">
                                    <select className="form-select"
                                        value={idEjercicio}
                                        onChange={(e) => setIdEjercicio(e.target.value)}
                                    >
                                        <option selected>Ejercicio</option>
                                        {store.ejercicios.map((item, id) => (
                                            <option key={id} value={item.id}>
                                                {item.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-2">
                                    <p className="text-end align-middle">
                                        Cantidad de series:
                                    </p>
                                </div>
                                <div className="col-2">
                                    <input
                                        className="form-control"
                                        placeholder="Cantidad de series"
                                        value={cantidadSeries}
                                        onChange={(e) => setCantidadSeries(e.target.value)}
                                    />
                                </div>

                                <div className="col-1">
                                    <p className="text-end align-middle">
                                        Carga:
                                    </p>
                                </div>
                                <div className="col-2">
                                    <input
                                        className="form-control"
                                        placeholder="Carga"
                                        value={carga}
                                        onChange={(e) => setCarga(e.target.value)}
                                    />
                                </div>
                            </div>

                            <br />
                            <div className="row">
                                {/* Repeticiones */}
                                <div className="col-1">
                                    <p className="text-end align-middle">
                                        Repeticiones:
                                    </p>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Repeticiones"
                                        value={repeticiones}
                                        onChange={(e) => setRepeticiones(e.target.value)}
                                    />
                                </div>

                                {/* Semana */}
                                <div className="col-2">
                                    <p className="text-end align-middle">
                                        Semana:
                                    </p>
                                </div>
                                <div className="col-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Semana"
                                        value={semana}
                                        onChange={(e) => setSemana(e.target.value)}
                                    />
                                </div>

                                <div className="col-1"></div>

                                {/* Agregar ejercicio a rutina */}
                                <div className="col" style={{ marginBottom: "10px" }}>
                                    <button className="btn btn-outline-danger" onClick={(e) => agregar(e)}>
                                        Agregar ejercicio a rutina
                                    </button>
                                </div>
                                <hr />
                            </div>
                        </div>
                    }
                </div>

                {/* Rutina */}
                <div>
                    <h5 style={{ paddingTop: "25px", color: "red" }}>Rutina</h5>
                    <hr />
                    <Ejercicios_Rutina ejercicios={store.ejercicios_rutina} />
                </div>
            </div>
           
            <br />
            <ToastContainer />
        </div>
    )
}

export default AgregarEjerciciosRutina