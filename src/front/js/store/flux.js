import axios from "axios";
let direccion = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      cuotas: [],
      cuota: {},
      metodos: [],
      metodo: {},
      mutualistas: [],
      mutualista: {},
      alumnos: [],
      alumno: {},
      pago: {},
      pagos: [],
      producto: {},
      productos: [],
      proveedores: [],
      proveedor: {},
      pagoProveedores: [],
      pagoProveedor: {},
    },
    actions: {
      ////////////////////////////////////
      //          Cuotas              ///
      ////////////////////////////////////
      /* Listar las cuotas*/
      obtenerCuotas: async () => {
        try {
          const response = await axios.get(direccion + "/api/cuota", {});
          setStore({
            cuotas: response.data,
          });
        } catch (error) {
          console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Crea cuotas */
      crearCuota: async (descripcion, precio) => {
        try {
          await axios.post(direccion + "/api/cuota", {
            descripcion: descripcion,
            precio: precio,
          });
          getActions().obtenerCuotas();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar cuotas */
      borrarCuotas: async (id) => {
        try {
          await axios.delete(direccion + "/api/cuota/" + id, {});
          getActions().obtenerCuotas();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Buscador de cuotas
      buscadorCuota: (valor) => {
        let store = getStore();
        let resultados = store.cuotas.filter((item) => {
          if (
            item.descripcion.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          cuotas: resultados,
        });
      },

      // Obtener cuota por id
      obtenerCuotaId: async (id) => {
        try {
          const response = await axios.get(direccion + "/api/cuota/" + id, {});
          setStore({
            cuota: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Modificar cuota
      modificarCuota: async (id, descripcion, precio) => {
        try {
          const response = await axios.put(direccion + "/api/cuota/" + id, {
            id: id,
            descripcion: descripcion,
            precio: precio,
          });
          //console.log(response.data)
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      ////////////////////////////////////
      //     Metodos de pago           ///
      ////////////////////////////////////
      /* Listar las Metodos*/
      obtenerMetodos: async () => {
        try {
          const response = await axios.get(direccion + "/api/metodos", {});
          setStore({
            metodos: response.data,
          });
        } catch (error) {
          console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Crea Metodos */
      crearMetodos: async (tipo, observaciones) => {
        try {
          await axios.post(direccion + "/api/metodos", {
            tipo: tipo,
            observaciones: observaciones,
          });
          getActions().obtenerMetodos();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar metodos */
      borrarMetodos: async (id) => {
        try {
          await axios.delete(direccion + "/api/metodos/" + id, {});
          getActions().obtenerMetodos();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Obtener metodo por id
      obtenerMetodoId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/metodos/" + id,
            {},
          );
          setStore({
            metodo: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Modificar metodo
      modificarMetodo: async (id, tipo, observaciones) => {
        try {
          await axios.put(direccion + "/api/metodos/" + id, {
            id: id,
            tipo: tipo,
            observaciones: observaciones,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Buscador de metodos
      buscadorMetodos: (valor) => {
        let store = getStore();
        let resultados = store.metodos.filter((item) => {
          if (
            item.tipo.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          metodos: resultados,
        });
      },

      ////////////////////////////////////
      //       Mutualista              ///
      ////////////////////////////////////
      /* Listar las Mutualistas */
      obtenerMutualistas: async () => {
        try {
          const response = await axios.get(direccion + "/api/mutualistas", {});
          setStore({
            mutualistas: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Crea Mutualista */
      crearMutualista: async (nombre, direccionMutualista, telefono) => {
        try {
          await axios.post(direccion + "/api/mutualistas", {
            nombre: nombre,
            direccion: direccionMutualista,
            telefono: telefono,
          });
          getActions().obtenerMutualistas();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar mutualistas */
      borrarMutualista: async (id) => {
        try {
          await axios.delete(direccion + "/api/mutualistas/" + id, {});
          getActions().obtenerMutualistas();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Obtener mutualista por id
      obtenerMutualistaId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/mutualistas/" + id,
            {},
          );
          setStore({
            mutualista: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Modificar mutualista
      modificarMutualista: async (
        id,
        nombre,
        direccionMutualista,
        telefono,
      ) => {
        try {
          await axios.put(direccion + "/api/mutualistas/" + id, {
            id: id,
            nombre: nombre,
            direccion: direccionMutualista,
            telefono: telefono,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Buscador de mutualista
      buscadorMutualista: (valor) => {
        let store = getStore();
        let resultados = store.mutualistas.filter((item) => {
          if (
            item.nombre.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          mutualistas: resultados,
        });
      },

      ////////////////////////////////////
      //       Alumnos                 ///
      ////////////////////////////////////
      /* Listar los Alumnos */
      obtenerAlumnos: async () => {
        try {
          const response = await axios.get(direccion + "/api/alumnos", {});
          setStore({
            alumnos: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Crea Alumnos */
      crearAlumnos: async (
        cedula,
        nombre,
        apellido,
        direccionAlumno,
        celular,
        fechanacimiento,
        peso,
        altura,
        email,
        idmutualista,
        condicionesmedicas,
        medicacion,
        emergencias,
        motivoentrenamiento,
        idcuota,
        rol,
        activo,
        observaciones,
        fechaingreso,
        foto,
      ) => {
        try {
          await axios.post(direccion + "/api/alumnos", {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            direccion: direccionAlumno,
            email: email,
            fechanacimiento: fechanacimiento,
            condicionesmedicas: condicionesmedicas,
            medicacion: medicacion,
            emergencias: emergencias,
            password: cedula,
            rol: rol,
            motivoentrenamiento: motivoentrenamiento,
            observaciones: observaciones,
            foto: foto,
            celular: celular,
            peso: peso,
            altura: altura,
            fechaingreso: fechaingreso,
            activo: activo,
            idcuota: idcuota,
            idmutualista: idmutualista,
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar alumno */
      borrarAlumno: async (id) => {
        try {
          await axios.delete(direccion + "/api/alumnos/" + id, {});
          getActions().obtenerAlumnos();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Buscador de alumno
      buscadorAlumno: (valor) => {
        let store = getStore();
        let resultados = store.alumnos.filter((item) => {
          if (
            item.nombre.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          alumnos: resultados,
        });
      },

      // Obtener alumno por id
      obtenerAlumnoId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/alumnos/" + id,
            {},
          );
          setStore({
            alumno: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Modificar Alumno
      modificarAlumno: async (
        id,
        cedula,
        nombre,
        apellido,
        direccionAlumno,
        celular,
        fechanacimiento,
        peso,
        altura,
        email,
        idmutualista,
        condicionesmedicas,
        medicacion,
        emergencias,
        motivoentrenamiento,
        idcuota,
        rol,
        activo,
        observaciones,
        fechaingreso,
        foto,
      ) => {
        try {
          await axios.put(direccion + "/api/alumnos/" + id, {
            id: id,
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            direccion: direccionAlumno,
            email: email,
            fechanacimiento: fechanacimiento,
            condicionesmedicas: condicionesmedicas,
            medicacion: medicacion,
            emergencias: emergencias,
            //password: cedula,
            rol: rol,
            motivoentrenamiento: motivoentrenamiento,
            observaciones: observaciones,
            foto: foto,
            celular: celular,
            peso: peso,
            altura: altura,
            fechaingreso: fechaingreso,
            activo: activo,
            idcuota: idcuota,
            idmutualista: idmutualista,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      ////////////////////////////////////
      //       Mensualidades           ///
      ////////////////////////////////////
      /* Listar las mensualidades */
      obtenerMensualidades: async () => {
        try {
          const response = await axios.get(
            direccion + "/api/mensualidades",
            {},
          );
          setStore({
            pagos: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Crea Mensualidad */
      crearMensualidad: async (
        fechapago,
        monto,
        factura,
        observaciones,
        idusuario,
        idmetodo,
      ) => {
        try {
          await axios.post(direccion + "/api/mensualidades", {
            fechapago: fechapago,
            monto: monto,
            factura: factura,
            observaciones: observaciones,
            idusuario: idusuario,
            idmetodo: idmetodo,
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar Mensualidad */
      borrarMensualidad: async (id) => {
        try {
          await axios.delete(direccion + "/api/mensualidades/" + id, {});
          getActions().obtenerMensualidades();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Modificar mensualidad
      modificarMensualidad: async (
        id,
        fechapago,
        monto,
        factura,
        observaciones,
        idusuario,
        idmetodo,
      ) => {
        try {
          await axios.put(direccion + "/api/mensualidades/" + id, {
            id: id,
            fechapago: fechapago,
            monto: monto,
            factura: factura,
            observaciones: observaciones,
            idusuario: idusuario,
            idmetodo: idmetodo,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Buscador de Mensualidad
      buscadorMensualidad: (valor) => {
        let store = getStore();
        let resultados = store.pagos.filter((item) => {
          if (
            item.factura.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          pagos: resultados,
        });
      },

      // Obtener mensualidad por id
      obtenerMensualidadId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/mensualidades/" + id,
            {},
          );
          setStore({
            pago: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Obtener mensualidad por id
      obtenerMensualidadIdUsuario: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/mensualidadesAlumno/" + id,
            {},
          );
          setStore({
            pagos: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      ////////////////////////////////////
      //       Productos               ///
      ////////////////////////////////////
      /* Listar productos */
      obtenerProductos: async () => {
        try {
          const response = await axios.get(direccion + "/api/productos", {});
          setStore({
            productos: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Crea Productos */
      crearProductos: async (
        nombre,
        cantidad,
        precioventa,
        observaciones,
        foto,
        video,
        proveedorid,
      ) => {
        try {
          await axios.post(direccion + "/api/productos", {
            nombre: nombre,
            cantidad: cantidad,
            precioventa: precioventa,
            observaciones: observaciones,
            foto: foto,
            video: video,
            proveedorid: proveedorid,
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar Productos */
      borrarProductos: async (id) => {
        try {
          await axios.delete(direccion + "/api/productos/" + id, {});
          getActions().obtenerProductos();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Modificar productos
      modificarProductos: async (
        id,
        nombre,
        cantidad,
        precioventa,
        observaciones,
        foto,
        video,
        proveedorid,
      ) => {
        try {
          await axios.put(direccion + "/api/productos/" + id, {
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            precioventa: precioventa,
            observaciones: observaciones,
            foto: foto,
            video: video,
            proveedorid: proveedorid,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Obtener productos por id
      obtenerProductosId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/productos/" + id,
            {},
          );
          setStore({
            producto: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Buscador de Productos
      buscadorProductos: (valor) => {
        let store = getStore();
        let resultados = store.productos.filter((item) => {
          if (
            item.nombre.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          productos: resultados,
        });
      },

      ////////////////////////////////////
      //       Proveedores             ///
      ////////////////////////////////////
      /* Listar proveedores */
      obtenerProveedores: async () => {
        try {
          const response = await axios.get(direccion + "/api/proveedores", {});
          setStore({
            proveedores: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      /* Agregar Proveedores */
      crearProveedores: async (
        nombre,
        rut,
        direccionProveedor,
        telefono,
        mail,
        observaciones,
      ) => {
        try {
          await axios.post(direccion + "/api/proveedores", {
            nombre: nombre,
            rut: rut,
            direccion: direccionProveedor,
            telefono: telefono,
            mail: mail,
            observaciones: observaciones,
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar Proveedores */
      borrarProveedores: async (id) => {
        try {
          await axios.delete(direccion + "/api/proveedores/" + id, {});
          getActions().obtenerProveedores();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Modificar proveedores
      modificarProveedores: async (
        id,
        nombre,
        rut,
        direccionProveedor,
        telefono,
        mail,
        observaciones,
      ) => {
        try {
          await axios.put(direccion + "/api/proveedores/" + id, {
            id: id,
            nombre: nombre,
            rut: rut,
            direccion: direccionProveedor,
            telefono: telefono,
            mail: mail,
            observaciones: observaciones,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Obtener proveedor por id
      obtenerProveedorId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/proveedores/" + id,
            {},
          );
          setStore({
            proveedor: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Buscador de Proveedores
      buscadorProveedor: (valor) => {
        let store = getStore();
        let resultados = store.proveedor.filter((item) => {
          if (
            item.nombre.toString().toLowerCase().includes(
              valor.toLowerCase(),
            )
          ) {
            return valor;
          }
        });
        setStore({
          proveedores: resultados,
        });
      },

      ////////////////////////////////////
      //       Pago Proveedores        ///
      ////////////////////////////////////
      /* Agregar Pago Proveedores */
      crearPagoProveedores: async (
        fechapago,
        numfactura,
        monto,
        idproveedor,
        idmetodo,
        observaciones,
      ) => {
        try {
          await axios.post(direccion + "/api/pagoproveedores", {
            fechapago: fechapago,
            numfactura: numfactura,
            monto: monto,
            idproveedor: idproveedor,
            idmetodo: idmetodo,
            observaciones: observaciones,
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Listar todos los pagos a proveedores */
      obtenerPagoAProveedores: async () => {
        try {
          const response = await axios.get(direccion + "/api/pagoproveedores", {});
          setStore({
            pagoProveedores: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.error(error.response.data.msg);
          }
        }
      },
      
      /* Borrar Pago proveedores */
      borrarPagoProveedores: async (id) => {
        try {
          await axios.delete(direccion + "/api/pagoproveedores/" + id, {});
          getActions().obtenerPagoAProveedores();
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      // Modificar Pago a proveedores
      modificarPagoProveedores: async (
        id,
        fechapago,
        numfactura,
        monto,
        observaciones,
        idproveedor,
        idmetodo,
      ) => {
        try {
          await axios.put(direccion + "/api/pagoproveedores/" + id, {
            id: id,
            fechapago: fechapago,
            numfactura: numfactura,
            monto: monto,
            observaciones: observaciones,
            idproveedor: idproveedor,
            idmetodo: idmetodo,
          });
          return true;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Obtener proveedor por id
      obtenerPagoProveedorId: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/pagoproveedores/" + id,
            {},
          );
          setStore({
            pagoProveedor: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },
      ////////////////////////////////////
      //       Por defecto             ///
      ////////////////////////////////////
      // getMessage: async () => {
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
