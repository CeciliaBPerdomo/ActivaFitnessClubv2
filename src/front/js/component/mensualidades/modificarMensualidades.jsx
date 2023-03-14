import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModificarMensualidad = () => {
    const { store, actions } = useContext(Context);
    let params = useParams()

    const [fechapago, setFechaPago] = useState(store.pago[0]?.fechapago)
    const [monto, setMonto] = useState(store.pago[0]?.monto)
    const [factura, setFactura] = useState(store.pago[0]?.factura)
    const [observaciones, setObservaciones] = useState(store.pago[0]?.observaciones)
    const [idusuario, setIdUsuario] = useState(store.pago[0]?.idusuario)
    const [idmetodo, setIdMetodo] = useState(store.pago[0]?.idmetodo)

    useEffect(() => {
       actions.obtenerMensualidadId(parseInt(params.theid))
       actions.obtenerMetodos()
      }, []);

      const modificar = (e) => {
        e.preventDefault()
        let id = parseInt(params.theid)
    
        if(actions.modificarMensualidad(id, 
            fechapago,
            monto,
            factura,
            observaciones,
            idusuario,
            idmetodo)){
                toast.success("💪 Modificación realizada con éxito", {
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
            <h3 style={{ marginBottom: "25px" }}>Modificar pago de la mensualidad</h3>
            <hr />
            <br />

            <form>
                <div className="row">
                    {/* Alumno */}
                    <div className="col">
                    <label htmlFor="alumno" style={{ marginBottom: "10px" }}>
                        Alumno:
                    </label>
                    <select className="form-select" aria-label="Default select example"
                        value={idusuario}
                        onChange={(e) => setIdUsuario(e.target.value)}>
                        <option selected>{store.pago[0]?.alumnoInfo.nombre} {store.pago[0]?.alumnoInfo.apellido}</option>
                        {store.alumnos.map((item,id) => (
                        <option key={id} value={item.id}>{item.nombre} {item.apellido}</option>
                        ))}
                    </select>
                    </div>

                    {/* Fecha de pago */}
                    <div className="col">
                    <label htmlFor="fecha" style={{ marginBottom: "10px" }}>
                        Fecha de pago:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        defaultValue={store.pago[0]?.fechapago}
                        onChange={(e) => setFechaPago(e.target.value)}
                    />
                    </div>
                </div>

                <br /> 
                <div className="row">
                    {/* Monto */}
                    <div className="col">
                        <label htmlFor="Monto" style={{ marginBottom: "10px" }}>
                            Monto:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Monto"
                            defaultValue={store.pago[0]?.monto}
                            onChange={(e) => setMonto(e.target.value)}
                        />
                    </div>

                    {/* Factura */}
                    <div className="col">
                        <label htmlFor="Monto" style={{ marginBottom: "10px" }}>
                            Factura No.:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número de factura"
                            defaultValue={store.pago[0]?.factura}
                            onChange={(e) => setFactura(e.target.value)}
                        />
                    </div>

                    {/* Metodo de pago */}
                    <div className="col">
                    <label htmlFor="metodo" style={{ marginBottom: "10px" }}>
                        Metodo de pago:
                    </label>
                    <select className="form-select" 
                    value={idmetodo}
                    onChange={(e) => setIdMetodo(e.target.value)}
                    >
                        <option selected>{store.pago[0]?.idmetodo}</option>
                        {store.metodos.map((item,id) => (
                        <option key={id} value={item.id}>{item.tipo}</option>
                        ))}
                    </select>
                    </div>
                </div>

                <br />
                <div className="row">
                     {/* Observaciones */}
                    <div className="col">
                        <label htmlFor="observaciones" style={{ marginBottom: "10px" }}>
                            Observaciones:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones"
                            defaultValue={store.pago[0]?.observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                        />
                    </div>
                </div>

                <br />
                <div style={{ marginTop: "15px"}}>
                    <button
                    type="submit"
                    className="btn btn-outline-danger float-end w-25"
                    onClick={(e) => modificar(e)}
                    >
                    Modificar
                    </button>
                </div>
            </form>

            <ToastContainer />
      </div>
    </>
  );
};