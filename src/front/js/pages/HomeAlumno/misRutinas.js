import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

const RutinaAlumno = ({id}) => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.obtenerRutina_IdUsuario(id)
    }, [])

    return (
        <div 
        className={store.estadoRutinas}
        style={{ marginTop: "-300px", 
        marginBottom: "150px"
     }}
        >
            <h5>Mis rutinas</h5>
            <hr />

            <div style={{ marginTop: "35px" }}>
                <table className="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Fecha de finalización</th>
                            <th scope="col" className="text-center">Fecha de inicio </th>
                            <th scope="col" className="text-center">Ver ejercicios</th>
                            <th scope="col" className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.rutinas.map((item, id) => (
                            <tr key={id}>
                                <td className="text-center">{item.fechafinalizacion.slice(5, 16)}</td>
                                <td className="text-center">{item.fechacomienzo.slice(5, 16)}</td>
                                <td className="text-center"><i className="fa fa-eye"></i></td>
                                <td className="text-center"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default RutinaAlumno