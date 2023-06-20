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
      pagoPorProveedor: [],
      pagoProveedor: {},
      cajaDiaria: [], 
      movimiento: {},
      diarios: [], 
      egresosDiarios: [],
      auth: {}, 
      errorLogin: {},
    },

    actions: {
      ////////////////////////////////////
      //          Cuotas              ///
      ////////////////////////////////////
      /* Listar las cuotas*/
      obtenerCuotas: async () => {
        try {
          const response = await axios.get(direccion + "/api/cuota", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
        console.log(localStorage.getItem("Token"))
        try {
          await axios.post(direccion + "/api/cuota", {
            descripcion: descripcion,
            precio: precio 
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
          await axios.delete(direccion + "/api/cuota/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
          const response = await axios.get(direccion + "/api/cuota/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            precio: precio
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
          const response = await axios.get(direccion + "/api/metodos", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            observaciones: observaciones
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
          await axios.delete(direccion + "/api/metodos/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            direccion + "/api/metodos/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
            observaciones: observaciones
          }, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
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
          const response = await axios.get(direccion + "/api/mutualistas", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            }
          });
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
            telefono: telefono
          }, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
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
          await axios.delete(direccion + "/api/mutualistas/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
          const response = await axios.get(direccion + "/api/alumnos", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
        genero,
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
            genero: genero,
            idcuota: idcuota,
            idmutualista: idmutualista
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar alumno */
      borrarAlumno: async (id) => {
        try {
          await axios.delete(direccion + "/api/alumnos/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            direccion + "/api/alumnos/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
              },
            },
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
        genero,
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
            rol: rol,
            motivoentrenamiento: motivoentrenamiento,
            observaciones: observaciones,
            foto: foto,
            celular: celular,
            peso: peso,
            altura: altura,
            fechaingreso: fechaingreso,
            genero: genero,
            idcuota: idcuota,
            idmutualista: idmutualista
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
            direccion + "/api/mensualidades", { 
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
   //     console.log(idmetodo)
   //     console.log(localStorage.getItem("Token"))
        try {
          const response = await axios.post(direccion + "/api/mensualidades", {
            fechapago: fechapago,
            monto: monto,
            factura: factura,
            observaciones: observaciones,
            idusuario: idusuario,
            idmetodo: idmetodo
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          if (response.status === 200) {
            return true 
          } else {
            return false
          }
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar Mensualidad */
      borrarMensualidad: async (id) => {
        try {
          await axios.delete(direccion + "/api/mensualidades/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            idmetodo: idmetodo
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
            direccion + "/api/mensualidades/" + id, { 
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
            direccion + "/api/mensualidadesAlumno/" + id, { 
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
          const response = await axios.get(direccion + "/api/productos", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            proveedorid: proveedorid
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar Productos */
      borrarProductos: async (id) => {
        try {
          await axios.delete(direccion + "/api/productos/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            proveedorid: proveedorid
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
            direccion + "/api/productos/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
          const response = await axios.get(direccion + "/api/proveedores", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            observaciones: observaciones
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Borrar Proveedores */
      borrarProveedores: async (id) => {
        try {
          await axios.delete(direccion + "/api/proveedores/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            observaciones: observaciones
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
            direccion + "/api/proveedores/" + id, { 
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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
            observaciones: observaciones
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Listar todos los pagos a proveedores */
      obtenerPagoAProveedores: async () => {
        try {
          const response = await axios.get(direccion + "/api/pagoproveedores", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
          await axios.delete(direccion + "/api/pagoproveedores/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
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
            idmetodo: idmetodo
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
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
            direccion + "/api/pagoproveedores/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
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

      // Obtener pagos segun proveedor 
      obtenerPagoPorProveedor: async (idProveedor) => {
        try {
          const response = await axios.get(
            direccion + "/api/pagoproveedoresid/" + idProveedor, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
          );
          setStore({
            pagoPorProveedor: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      ////////////////////////////////////
      //          Caja diaria         ///
      ////////////////////////////////////
      /* Agregar caja diaria */
      cerrarCajaDiaria: async (
        fecha,
        totalmensualidades,
        cantidadalumnos,
        totalventas,
        totalpagoprov,
        observaciones,
      ) => {
        try {
          await axios.post(direccion + "/api/cajadiaria", {
            fecha: fecha,
            totalmensualidades: totalmensualidades,
            cantidadalumnos: cantidadalumnos,
            totalventas: totalventas,
            totalpagoprov: totalpagoprov,
            observaciones: observaciones
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      /* Listar todos los movimientos de la caja */
      obtenerMovimientosCajaDiaria: async () => {
        try {
          const response = await axios.get(direccion + "/api/cajadiaria", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          setStore({
            cajaDiaria: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.error(error.response.data.msg);
          }
        }
      },

      obtenerMovimientoCaja: async (id) => {
        try {
          const response = await axios.get(
            direccion + "/api/cajadiaria/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            },
          );
          setStore({
            movimiento: response.data,
          });
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      // Movimientos diarios
      obtenerMovimientosDiarios: async (fecha) => {
        try {
          const response = await axios.post(direccion + "/api/cajadiariaingreso", {
            fecha: fecha
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          setStore({
            diarios: response.data
          });
        } catch (error) {
          console.log(error);
        }        
      }, 

      // Egresos diarios
      obtenerEgresosDiarios: async (fecha) => {
        try {
          const response = await axios.post(direccion + "/api/cajadiariaegreso", {
            fecha: fecha
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          });
          setStore({
            egresosDiarios: response.data
          });
        } catch (error) {
          console.log(error);
        }        
      }, 

      ////////////////////////////////////
      ///       Newsletter             ///
      ////////////////////////////////////

      suscripcion: (email) => {
        try{
          fetch("https://connect.mailerlite.com/api/subscribers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + process.env.MAILERLITE
            }, 
            body: JSON.stringify({
              email: email,
              groups: [process.env.MAILGROUP],
            }),
          })
          .then((response) => {
            if (response.status === 201) {
              console.log(response.status)
            }
          })
        } catch(error){
          console.log(error)
        }
      },

      ////////////////////////////////////
      ///         Login                ///
      ////////////////////////////////////
      //Logueo
      loginAdministrador : async (email, password) => {
        try {
          const resp = await axios.post(direccion + "/api/login", {
            email: email, 
            password: password
          })
          // Si todo sale color de rosas
          if (resp.status === 200){
            const data = resp.data
            if (data.user.rol === "Administrador") {
              localStorage.setItem("Token", data.access_token)
              setStore({
                  auth: true,
              });
            } else {
              setStore({
                auth: false,
            });
            }
          } else if (resp.status === 404) {
            // Usuario no existe
            setStore({
              auth: false,
          });
          }
        } catch(error){
          console.log(error)
        }
      },

      // Inicio de se sesion      
      logOut: () => {
          localStorage.removeItem("Token");
          setStore({
              auth: false,
          });
    },
    },
  };
};

export default getState;
