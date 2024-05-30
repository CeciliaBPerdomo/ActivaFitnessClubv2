import React from 'react'

const ActualizarDatosMedicos = ({ id }) => {
    return (
        <div>
            {/* Boton de actualizar */}
            <button type="button" className="btn btn-outline-danger float-end"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa fa-pen"></i> Actualizar datos médicos
            </button>
        </div>
    )
}

export default ActualizarDatosMedicos