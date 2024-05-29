import React, { useContext } from "react";
import { Context } from "../../store/appContext";

const TiendaProductos = () => {
    const { actions, store } = useContext(Context)

    return (
        <div className={store.estadoTienda} >
            <h5>Tienda</h5>
            <hr />
            <p>Estamos trabajando en ello 👷 a la brevedad toda la info.</p>
        </div>
    )
}

export default TiendaProductos