import React from "react"
import writeXlsxFile from 'write-excel-file'

const Ejercicios_Rutina = ({ ejercicios }) => {
    // Excel 
    const crearExcel = async () => {
        // Encabezados
        const HEADER_ROW = [
            { value: 'Semana', fontWeight: 'bold', fontFamily: "Arial", fontSize: 14, borderStyle: 'thin', align: "center" },
            { value: 'Tipo de ejercicio', fontWeight: 'bold', fontFamily: "Arial", fontSize: 14, borderStyle: 'thin' },
            { value: 'Ejercicio', fontWeight: 'bold', fontFamily: "Arial", fontSize: 14, borderStyle: 'thin' },
            { value: 'Serie', fontWeight: 'bold', fontFamily: "Arial", fontSize: 14, borderStyle: 'thin', align: 'center' },
            { value: 'Repeticiones', fontWeight: 'bold', fontFamily: "Arial", fontSize: 14, borderStyle: 'thin', align: 'center' },
            { value: 'Carga', fontWeight: 'bold', fontFamily: "Arial", fontSize: 14, borderStyle: 'thin', align: 'center' }
        ]

        const columns = [
            { width: 15 }, // Semana
            { width: 25 }, // Tipo
            { width: 50 }, // Ejercicio
            { width: 10 }, // Serie
            { width: 20 }, // Repeticiones
            { width: 10 }, // Carga
        ]

        // ******************************************** /// 


        const dataInfo = ejercicios.map((item) => [
            { type: String, value: String(item.semana), fontFamily: "Arial", fontSize: 12, borderStyle: 'thin', align: 'center' },
            { type: String, value: item.descripcionTipoEj, fontFamily: "Arial", fontSize: 12, borderStyle: 'thin' },
            { type: String, value: item.nombreEjercicio, fontFamily: "Arial", fontSize: 12, borderStyle: 'thin' },
            { type: String, value: String(item.serie), fontFamily: "Arial", fontSize: 12, borderStyle: 'thin', align: 'center' },
            { type: String, value: String(item.repeticiones), fontFamily: "Arial", fontSize: 12, borderStyle: 'thin', align: 'center' },
            { type: String, value: String(item.carga), fontFamily: "Arial", fontSize: 12, borderStyle: 'thin', align: 'center' }
        ]);


        // Título de la hoja de cálculo
        const TITLE_ROW = [
            { value: '', colspan: 2 },
            { value: 'Rutina de Ejercicios', 
            fontWeight: 'bold', 
            fontFamily: "Arial", 
            fontSize: 20, 
            align: 'center', 
            colspan: 6 }
        ];

        const blankRow = [{ value: '', colspan: 6 }];

        // Datos completos incluyendo el título
        const data = [
            blankRow,
            TITLE_ROW,
            blankRow,
            HEADER_ROW,
            ...dataInfo
        ]

        await writeXlsxFile(data, {
            columns,
            fileName: 'Rutina.xlsx',
            sheet: 'Rutina'
        })
    }

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

            <div>
                <button className="btn btn-outline-danger float-end" onClick={crearExcel}>
                    <i className="fa fa-file-excel"></i>
                </button>
            </div>
        </div>
    )
}

export default Ejercicios_Rutina