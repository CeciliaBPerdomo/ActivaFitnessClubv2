import React, { useContext } from "react";
import { Context } from "../../store/appContext";

const TiendaProductos = () => {
    const { actions, store } = useContext(Context)

    return (
        <div 
        className={store.estadoTienda}
        style={{marginTop: "-220px"}}
        >
            <h5>Tienda</h5>
            <hr />
            <p>Estamos trabajando el ello</p>
        </div>
    )
}

export default TiendaProductos