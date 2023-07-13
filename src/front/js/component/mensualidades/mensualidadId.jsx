import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MensualidadporAlumno = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [fechapago, setFechaPago] = useState("")
    const [monto, setMonto] = useState("")
    const [factura, setFactura] = useState("")
    const [observaciones, setObservaciones] = useState("")
    const [idmetodo, setIdMetodo] = useState("")
    const [proximoVencimiento, setProximoVencimiento] = useState("")

    useEffect(() => {
        actions.obtenerAlumnos();
        actions.obtenerMetodos()
        actions.obtenerAlumnoId(parseInt(params.theid))
    }, []);


    const guardar = async (e) => {
        e.preventDefault();
        let idusuario = parseInt(params.theid)

        if (idusuario !== "" && fechapago !== "" && monto !== "" & factura !== "" && idmetodo !== "" && proximoVencimiento) {

            let valor = await actions.crearMensualidad(fechapago, monto, factura, observaciones, idusuario, idmetodo)
            let modific = await actions.proximoVencimiento(idusuario, proximoVencimiento)

            if (valor === true && modific === true) {
                toast.success("💪 Guardado con éxito", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                /* Limpiar el formulario */
                setFechaPago("");
                setMonto("");
                setFactura("")
                setObservaciones("")
                setIdMetodo("")
                setProximoVencimiento("")
            } else {
                toast.error("Error al guardar los datos", {
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
        } else {
            toast.error("Faltan ingresar datos", {
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
    };

    return (
        <>
            <div className="container">
                <h3 style={{ marginBottom: "25px" }}>Ingresar nuevo pago de mensualidad</h3>
                <hr />
                <br />

                <form>
                    <div className="row">
                        {/* Alumno */}
                        <div className="col">
                            <label htmlFor="alumno" style={{ marginBottom: "10px" }}>
                                Alumno <label style={{ color: "red" }}>(Obligatorio)</label>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={store.alumno[0]?.nombre + " " + store.alumno[0]?.apellido}
                            />
                        </div>

                        {/* Fecha de pago */}
                        <div className="col">
                            <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                                Fecha de pago <label style={{ color: "red" }}>(Obligatorio)</label>:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechapago}
                                onChange={(e) => setFechaPago(e.target.value)}
                            />
                        </div>
                    </div>

                    <br />
                    <div className="row">
                        {/* Monto */}
                        <div className="col">
                            <label htmlFor="Monto" style={{ marginBottom: "10px" }}>
                                Monto <label style={{ color: "red" }}>(Obligatorio)</label>:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                            />
                        </div>

                        {/* Factura */}
                        <div className="col">
                            <label htmlFor="Monto" style={{ marginBottom: "10px" }}>
                                Factura No.  <label style={{ color: "red" }}>(Obligatorio)</label>:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número de factura"
                                value={factura}
                                onChange={(e) => setFactura(e.target.value)}
                            />
                        </div>

                        {/* Metodo de pago */}
                        <div className="col">
                            <label htmlFor="metodo" style={{ marginBottom: "10px" }}>
                                Metodo de pago  <label style={{ color: "red" }}>(Obligatorio)</label>:
                            </label>
                            <select className="form-select"
                                value={idmetodo}
                                onChange={(e) => setIdMetodo(e.target.value)}
                            >
                                <option selected>Metodo</option>
                                {store.metodos.map((item, id) => (
                                    <option key={id} value={item.id}>{item.tipo}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <br />
                    <div className="row">
                        {/* Fecha de pago proximo vencimiento */}
                        <div className="col">
                            <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                                Próximo vencimiento <label style={{ color: "red" }}>(Obligatorio)</label>:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                value={proximoVencimiento}
                                onChange={(e) => setProximoVencimiento(e.target.value)}
                            />
                        </div>

                        {/* Observaciones */}
                        <div className="col">
                            <label htmlFor="observaciones" style={{ marginBottom: "10px" }}>
                                Observaciones:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Observaciones"
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                            />
                        </div>
                    </div>

                    <br />
                    <div style={{ marginTop: "15px", marginBottom: "85px" }}>
                        <button
                            type="submit"
                            className="btn btn-outline-danger float-end w-25"
                            onClick={(e) => guardar(e)}
                        >
                            Guardar
                        </button>
                    </div>
                </form>

                <ToastContainer />
            </div>
        </>
    );
};