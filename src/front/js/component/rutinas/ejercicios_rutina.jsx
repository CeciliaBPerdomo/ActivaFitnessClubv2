import React from "react"

const Ejercicios_Rutina = ({ ejercicios }) => {
    return (
        <div>
            <table className="table" style={{ color: "white" }}>
                <thead>
                    <tr>
                        <th scope="col" className="text-center align-middle">Semana</th>
                        <th scope="col" className="text-center align-middle">Tipo Ejercicio</th>
                        <th scope="col" className="text-center align-middle">Ejercicio</th>
                        <th scope="col" className="text-center align-middle">Series</th>
                        <th scope="col" className="text-center align-middle">Repeticiones</th>
                        <th scope="col" className="text-center align-middle">Carga</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {ejercicios.map((item) => (
                        <tr key={item.id}>
                            <th className="text-center align-middle">{item.semana}</th>
                            <th className="text-center align-middle">{item.descripcionTipoEj}</th>
                            <th className="text-center align-middle">{item.nombreEjercicio}</th>
                            <th className="text-center align-middle">{item.serie}</th>
                            <th className="text-center align-middle">{item.repeticiones}</th>
                            <th className="text-center align-middle">{item.carga}</th>
                            <th className="text-center align-middle"><i className="fa fa-trash"></i></th>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Ejercicios_Rutina