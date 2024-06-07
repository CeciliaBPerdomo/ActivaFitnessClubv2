import React from "react";

const CrearAlumnosInfoOpcional = () => {

    return (
        <div className="container">
            <h3 style={{ marginBottom: "10px" }}>Ingresar alumnos
                <span style={{ fontSize: "16px" }}>  ➤ Información adicional</span>
            </h3>
            <hr />

            <form>
                <div className="row">

                    {/* Peso */}
                    <div className="col">
                        <label htmlFor="Peso" style={{ marginBottom: "10px" }}>
                            Peso:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Peso"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                        />
                    </div>

                    {/* Altura */}
                    <div className="col">
                        <label htmlFor="Altura" style={{ marginBottom: "10px" }}>
                            Altura:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Altura"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                        />
                    </div>

                    {/* Foto */}
                    <div className="col">
                        <label htmlFor="foto" style={{ marginBottom: "10px" }}>
                            Foto:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Foto (URL)"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                        />
                    </div>

                    {/* Medicaciones */}
                    <div className="col">
                        <label htmlFor="medicacion" style={{ marginBottom: "10px" }}>
                            Medicación:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Si toma algún médicamento"
                            value={medicacion}
                            onChange={(e) => setMedicacion(e.target.value)}
                        />
                    </div>

                    {/* Emergencias */}
                    <div className="col">
                        <label htmlFor="emergencias" style={{ marginBottom: "10px" }}>
                            Emergencias:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Telefono en caso de emergencia"
                            value={emergencias}
                            onChange={(e) => setEmergencias(e.target.value)}
                        />
                    </div>
                </div>

                <br />
                <div className="row">
                    {/* Motivo */}
                    <div className="col">
                        <label htmlFor="motivo" style={{ marginBottom: "10px" }}>
                            Motivo del entrenamiento:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Motivo del entrenamiento"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                    </div>
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
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                            />
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CrearAlumnosInfoOpcional