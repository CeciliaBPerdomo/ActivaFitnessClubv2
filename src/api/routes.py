"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app #importamos current_app

from api.models import db, Usuarios, Cuota, Mensualidades, Metodospago, Mutualista, Proveedores, Pagoproveedores
from api.models import Productos, Compras, Ventas, CajaDiaria, CajaMensual, CajaAnual, Tipoejercicio, Ejercicio
from api.models import Rutina, RutinasAux, Carrito, Ventasonline

from api.utils import generate_sitemap, APIException
import json

# Ordenar info
from sqlalchemy import desc, asc

# .env
import os

# Rutas privadas
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Encriptacion de contraseña
import bcrypt

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm Cecilia"
    }
    return jsonify(response_body), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                        CUOTAS                                                 ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todas las cuotas
@api.route('/cuota', methods=['GET'])
@jwt_required()
def getCuota():
    
    cuotas = Cuota.query.all()
    results = list(map(lambda x: x.serialize(), cuotas))
    return jsonify(results), 200

# Alta de un cuota
@api.route('/cuota', methods=['POST'])
@jwt_required()
def addCuota():
    body = json.loads(request.data)

    queryNewCuota = Cuota.query.filter_by(descripcion=body["descripcion"]).first()
    if queryNewCuota is None:
        new_cuota = Cuota(descripcion=body["descripcion"],
        precio=body["precio"])

        db.session.add(new_cuota)
        db.session.commit()

        return jsonify(new_cuota.serialize()), 200
    
    response_body = {"msg": "Usuario ya creado"}
    return jsonify(response_body), 400

# Eliminacion de una cuota
@api.route('/cuota/<int:cuota_id>', methods=['DELETE'])
@jwt_required()
def deleteCuota(cuota_id):
    cuotaId = Cuota.query.filter_by(id=cuota_id).first()
  
    if cuotaId is None: 
        response_body = {"msg": "Id de cuota no encontrada"}
        return jsonify(response_body), 400

    db.session.delete(cuotaId)
    db.session.commit()
    response_body = {"msg": "Cuota borrada"}
    return jsonify(response_body), 200 

# Modifica una cuota por id
@api.route('/cuota/<int:cuota_id>', methods=['PUT'])
@jwt_required()
def modificarCuota(cuota_id):
    cuota = Cuota.query.filter_by(id=cuota_id).first()
    body = json.loads(request.data)

    if cuota is None:
        response_body = {"msg": "No existe la cuota"}
        return jsonify(response_body), 400    

    if "descripcion" in body:
        cuota.descripcion =  body["descripcion"]

    if "precio" in body:
        cuota.precio = body["precio"]
    
    db.session.commit()
    response_body = {"msg": "Cuota modificada"}
    return jsonify(response_body), 200

# Muestra la cuota por id
@api.route('/cuota/<int:cuota_id>', methods=['GET'])
@jwt_required()
def get_cuota(cuota_id):
    id = Cuota.query.filter_by(id=cuota_id).first()

    if id is None: 
        response_body = {"msg": "Cuota no encontrado"}
        return jsonify(response_body), 400

    cuota = id.serialize()
    return jsonify(cuota), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                     METODOS DE PAGO                                           ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos los metodos de pagos
@api.route('/metodos', methods=['GET'])
@jwt_required()
def getMetodos():
    metodos = Metodospago.query.all()
    results = list(map(lambda x: x.serialize(), metodos))
    return jsonify(results), 200

# Alta de un metodos de pago
@api.route('/metodos', methods=['POST'])
@jwt_required()
def addMetodo():
    body = json.loads(request.data)

    queryNewMetodo = Metodospago.query.filter_by(tipo=body["tipo"]).first()
    if queryNewMetodo is None:
        new_metodo = Metodospago(tipo=body["tipo"],
        observaciones=body["observaciones"])

        db.session.add(new_metodo)
        db.session.commit()

        return jsonify(new_metodo.serialize()), 200
    
    response_body = {"msg": "Metodo de pago ya creado"}
    return jsonify(response_body), 400

# Eliminacion de un metodo de pago
@api.route('/metodos/<int:metodos_id>', methods=['DELETE'])
@jwt_required()
def deleteMetodos(metodos_id):
    MetodosId = Metodospago.query.filter_by(id=metodos_id).first()
  
    if MetodosId is None: 
        response_body = {"msg": "Id de metodo de pago no encontrada"}
        return jsonify(response_body), 400

    db.session.delete(MetodosId)
    db.session.commit()
    response_body = {"msg": "Metodo de pago borrado"}
    return jsonify(response_body), 200 

# Modifica un metodo de pago por id
@api.route('/metodos/<int:metodos_id>', methods=['PUT'])
@jwt_required()
def modificarMetodos(metodos_id):
    metodos = Metodospago.query.filter_by(id=metodos_id).first()
    body = json.loads(request.data)

    if metodos is None:
        response_body = {"msg": "No existe el metodo de pago"}
        return jsonify(response_body), 400    

    if "tipo" in body:
        metodos.tipo =  body["tipo"]

    if "observaciones" in body:
        metodos.observaciones = body["observaciones"]
    
    db.session.commit()
    response_body = {"msg": "Metodo de pago modificado"}
    return jsonify(response_body), 200

# Muestra el metodo de pago por id
@api.route('/metodos/<int:metodo_id>', methods=['GET'])
@jwt_required()
def get_metodo(metodo_id):
    id = Metodospago.query.filter_by(id=metodo_id).first()

    if id is None: 
        response_body = {"msg": "Metodo de pago no encontrado"}
        return jsonify(response_body), 400

    metodo = id.serialize()
    return jsonify(metodo), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                     MUTUALISTAS                                               ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos las mutualistas
@api.route('/mutualistas', methods=['GET'])
@jwt_required()
def getMutualistas():
    mutualista = Mutualista.query.all()
    results = list(map(lambda x: x.serialize(), mutualista))
    return jsonify(results), 200

# Alta de una mutualista
@api.route('/mutualistas', methods=['POST'])
@jwt_required()
def addMutualista():
    body = json.loads(request.data)

    queryNewMutualista = Mutualista.query.filter_by(nombre=body["nombre"]).first()
    
    if queryNewMutualista is None:
        new_mutualista = Mutualista(nombre=body["nombre"],
        direccion=body["direccion"],
        telefono=body["telefono"])

        db.session.add(new_mutualista)
        db.session.commit()

        return jsonify(new_mutualista.serialize()), 200
    
    response_body = {"msg": "Mutualista existente"}
    return jsonify(response_body), 400

# Eliminacion de una mutualista
@api.route('/mutualistas/<int:mutualista_id>', methods=['DELETE'])
@jwt_required()
def deleteMutualista(mutualista_id):
    id = Mutualista.query.filter_by(id=mutualista_id).first()
  
    if id is None: 
        response_body = {"msg": "Id de mutualista no encontrada"}
        return jsonify(response_body), 400

    db.session.delete(id)
    db.session.commit()
    response_body = {"msg": "Mutualista borrada"}
    return jsonify(response_body), 200 

# Modifica una mutualista
@api.route('/mutualistas/<int:mutualista_id>', methods=['PUT'])
@jwt_required()
def modificarMutualista(mutualista_id):
    mutualista = Mutualista.query.filter_by(id=mutualista_id).first()
    body = json.loads(request.data)

    if mutualista is None:
        response_body = {"msg": "No existe la mutualista"}
        return jsonify(response_body), 400    

    if "nombre" in body:
        mutualista.nombre =  body["nombre"]

    if "direccion" in body:
        mutualista.direccion = body["direccion"]

    if "telefono" in body:
        mutualista.telefono = body["telefono"]
    
    db.session.commit()
    response_body = {"msg": "Mutualista modificada"}
    return jsonify(response_body), 200

# Muestra la mutualista por id
@api.route('/mutualistas/<int:mutualista_id>', methods=['GET'])
@jwt_required()
def get_mutualista(mutualista_id):
    id = Mutualista.query.filter_by(id=mutualista_id).first()

    if id is None: 
        response_body = {"msg": "Mutualista no encontrada"}
        return jsonify(response_body), 400

    return jsonify(id.serialize()), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                     ALUMNOS                                                   ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos los alumnos
@api.route('/alumnos', methods=['GET'])
@jwt_required()
def getAlumos():
    alumnos = Usuarios.query.all()
    results = list(map(lambda x: {**x.serializeCuotas(), **x.serialize()}, alumnos))
    return jsonify(results), 200

# Alta de un alumno 
@api.route('/alumnos', methods=['POST'])
@jwt_required()
def addAlumnos():
    body = json.loads(request.data)
    queryNewAlumno = Usuarios.query.filter_by(cedula=body["cedula"]).first()

    if queryNewAlumno:
        return jsonify({"msg": "La cédula ya fue ingresada anteriormente"}), 404
    
    queryMail = Usuarios.query.filter_by(email=body["email"]).first()
    if queryMail:
        return jsonify({"msg": "El correo electrónico ya fue ingresado anteriormente"}), 404
    
    #Password
    pw_hash = current_app.bcrypt.generate_password_hash(body["cedula"]).decode("utf-8")
    
    if queryNewAlumno is None:
        new_alumno = Usuarios(
        cedula=body["cedula"],
        nombre=body["nombre"],
        apellido=body["apellido"],
        direccion=body["direccion"],
        celular=body["celular"],
        fechanacimiento=body["fechanacimiento"],
        peso=body["peso"],
        altura=body["altura"], 
        fechaingreso=body["fechaingreso"],
        password=pw_hash, 
        email=body["email"], 
        idmutualista=body["idmutualista"],
        condicionesmedicas=body["condicionesmedicas"], 
        medicacion=body["medicacion"],
        emergencias=body["emergencias"], 
        motivoentrenamiento=body["motivoentrenamiento"],
        idcuota=body["idcuota"],
        rol=body["rol"],
        genero=body["genero"],
        observaciones=body["observaciones"],
        foto=body["foto"]
        )

        db.session.add(new_alumno)
        db.session.commit()

        return jsonify(new_alumno.serialize()), 200
    return jsonify({"msg": "Este usuario ya existente"}), 400

# Elimina un alumno
@api.route('/alumnos/<int:alumno_id>', methods=['DELETE'])
@jwt_required()
def deleteAlumno(alumno_id):
    id = Usuarios.query.filter_by(id=alumno_id).first()
  
    if id is None: 
        response_body = {"msg": "Id de alumno no encontrado"}
        return jsonify(response_body), 400

    db.session.delete(id)
    db.session.commit()

    response_body = {"msg": "Alumno borrado"}
    return jsonify(response_body), 200 

# Muestra el alumno por id
@api.route('/alumnos/<int:alumno_id>', methods=['GET'])
@jwt_required()
def get_alumno_byId(alumno_id):
    alumno = Usuarios.query.filter_by(id=alumno_id).all()

    if alumno is None: 
        return jsonify({"msg": "Usuario no encontrado"}), 400
    
    if alumno == []: 
        return jsonify({"msg": "Usuario no encontrado"}), 400

    results = list(map(lambda x: {**x.serializeCuotas(), **x.serialize()}, alumno))
    return jsonify(results), 200

# Muestra el alumno por id
@api.route('/alumnos_mutual/<int:alumno_id>', methods=['GET'])
@jwt_required()
def get_alumno_mutual_byId(alumno_id):
    alumno = db.session.query(Usuarios, Mutualista, Cuota).filter_by(id=alumno_id).join(Mutualista).join(Cuota).all()

    if alumno is None: 
        return jsonify({"msg": "Usuario no encontrado"}), 400
    
    if alumno == []: 
        return jsonify({"msg": "Usuario no encontrado"}), 400
    
    results = list(map(lambda socio: {
        # Info alumno
        "idAlumno": socio[0].id,
        "nombre": socio[0].nombre,
        "apellido": socio[0].apellido,
        "cedula": socio[0].cedula,
        "direccion": socio[0].direccion,
        "email": socio[0].email,
        "fechanacimiento": socio[0].fechanacimiento, 
        "condicionesmedicas": socio[0].condicionesmedicas, 
        "medicacion": socio[0].medicacion,
        "emergencias": socio[0].emergencias,
        "rol": socio[0].rol, 
        "motivoentrenamiento": socio[0].motivoentrenamiento,
        "observaciones": socio[0].observaciones,
        "foto": socio[0].foto, 
        "celular": socio[0].celular,
        "peso": socio[0].peso,
        "altura": socio[0].altura, 
        "fechaingreso": socio[0].fechaingreso,
        "genero": socio[0].genero,
        "proximovencimiento": socio[0].proximovencimiento,

        # Info Mutualista
        "idMutualista": socio[1].id,
        "nombreMutualista": socio[1].nombre,

        #Info Cuotas
        "idCuota": socio[2].id, 
        "descripcionCuota": socio[2].descripcion, 
        "precioCuota": socio[2].precio
    }, alumno))

    return jsonify(results), 200

# Modifica un usuario por id
@api.route('/alumnos/<int:user_id>', methods=['PUT'])
@jwt_required()
def usersModif_porId(user_id):
    usuario = Usuarios.query.filter_by(id=user_id).first()
    body = json.loads(request.data)

    if usuario is None:
        response_body = {"msg": "No existe el usuario"}
        return jsonify(response_body), 400    

    if "cedula" in body:
        usuario.cedula =  body["cedula"]
        
        #Actualiza la contraseña para que sea la cedula
        pw_hash = current_app.bcrypt.generate_password_hash(body["password"]).decode("utf-8")
        usuario.password = pw_hash

    if "nombre" in body: 
        usuario.nombre = body["nombre"]

    if "apellido" in body:
        usuario.apellido = body["apellido"]

    if "direccion" in body: 
        usuario.direccion = body["direccion"]
    
    if "celular" in body:
        usuario.celular = body["celular"]

    if "fechanamiento" in body:
        usuario.fechanacimiento = body["fechanacimiento"]
    
    if "peso" in body: 
        usuario.peso = body["peso"]
    
    if "altura" in body:
        usuario.altura = body["altura"]

    if "fechaingreso" in body:
        usuario.fechaingreso = body["fechaingreso"]
    
    if "email" in body:
        usuario.email = body["email"]

    if "idmutualista" in body: 
        usuario.idmutualista = body["idmutualista"]
    
    if "condicionesmedicas" in body:
        usuario.condicionesmedicas=body["condicionesmedicas"]
    
    if "medicacion" in body:
        usuario.medicacion = body["medicacion"]
    
    if "emergencias" in body:
        usuario.emergencias = body["emergencias"]
    
    if "motivoentrenamiento" in body:
        usuario.motivoentrenamiento = body["motivoentrenamiento"]
    
    if "idcuota" in body:
        usuario.idcuota = body["idcuota"]
    
    if "rol"in body:
        usuario.rol = body["rol"]
    
    if "genero" in body:
        usuario.genero = body["genero"]
    
    if "observaciones" in body:
        usuario.observaciones = body["observaciones"]
    
    if "foto" in body:
        usuario.foto = body["foto"]

    db.session.commit()

    response_body = {"msg": "Usuario modificado"}
    return jsonify(response_body), 200

# Modifica un usuario por id
@api.route('/alumnos_datospersonales/<int:user_id>', methods=['PUT'])
#@jwt_required()
def usersModif_datospersonales_porId(user_id):
    usuario = Usuarios.query.filter_by(id=user_id).first()
    body = json.loads(request.data)

    if usuario is None:
        return jsonify({"msg": "No existe el usuario"}), 400    

    if "cedula" in body:
        usuario.cedula =  body["cedula"]
       # usuario.password = body["cedula"]

    if "nombre" in body: 
        usuario.nombre = body["nombre"]

    if "apellido" in body:
        usuario.apellido = body["apellido"]

    if "direccion" in body: 
        usuario.direccion = body["direccion"]
    
    if "celular" in body:
        usuario.celular = body["celular"]
    
    if "email" in body:
        usuario.email = body["email"]

    if "genero" in body:
        usuario.genero = body["genero"]

    if "fechanamiento" in body:
        usuario.fechanacimiento = body["fechanacimiento"]
    
    if "peso" in body: 
        usuario.peso = body["peso"]
    
    if "altura" in body:
        usuario.altura = body["altura"]

    db.session.commit()
    return jsonify({"msg": "Alumno: " + body["nombre"] + " " + body["apellido"] + " modificado"}), 200


# Modifica los datos medicos de un usuario por id
@api.route('/alumnos_datosmedicos/<int:user_id>', methods=['PUT'])
@jwt_required()
def usersModif_datos_medicos_porId(user_id):
    usuario = Usuarios.query.filter_by(id=user_id).first()
    body = json.loads(request.data)

    if usuario is None:
        return jsonify({"msg": "No existe el usuario"}), 400    

    if "idmutualista" in body: 
        usuario.idmutualista = body["idmutualista"]
    
    if "condicionesmedicas" in body:
        usuario.condicionesmedicas=body["condicionesmedicas"]
    
    if "medicacion" in body:
        usuario.medicacion = body["medicacion"]
    
    if "emergencias" in body:
        usuario.emergencias = body["emergencias"]
    
    if "motivoentrenamiento" in body:
        usuario.motivoentrenamiento = body["motivoentrenamiento"]
    
    if "observaciones" in body:
        usuario.observaciones = body["observaciones"]

    db.session.commit()
    return jsonify({"msg": "Usuario modificado"}), 200

# Muestra los alumnos ordenados en forma descendente (de mayor a menor)
@api.route('/alumnos/desc', methods=['GET'])
@jwt_required()
def getAlumnos_desc():
    alumnos = Usuarios.query.order_by(desc(Usuarios.nombre)).all()
    results = list(map(lambda x: {**x.serializeCuotas(), **x.serialize()}, alumnos))
    return jsonify(results), 200


# Muestra los alumnos ordenados en forma descendente (de mayor a menor)
@api.route('/alumnos/asc', methods=['GET'])
@jwt_required()
def getAlumnos_asc():
    alumnos = Usuarios.query.order_by(asc(Usuarios.nombre)).all()
    results = list(map(lambda x: {**x.serializeCuotas(), **x.serialize()}, alumnos))
    return jsonify(results), 200

# Modifica de un usuario la fecha de vencimiento del proximo pago
@api.route('/proximovencimiento/<int:user_id>', methods=['PUT'])
@jwt_required()
def usersModif_proximoVencimiento(user_id):

    usuario = Usuarios.query.filter_by(id=user_id).first()
    body = json.loads(request.data)

    if usuario is None:
        response_body = {"msg": "No existe el usuario"}
        return jsonify(response_body), 400    

    if "proximovencimiento" in body:
        usuario.proximovencimiento =  body["proximovencimiento"]

    db.session.commit()

    response_body = {"msg": "Usuario modificado"}
    return jsonify(response_body), 200

# Muestra las mensualidades pendientes
@api.route('/vencimientos/<string:fechaActual>', methods=['GET'])
@jwt_required()
def getVencimientos(fechaActual):

    vencimientos = Usuarios.query.filter(Usuarios.proximovencimiento<fechaActual).all()
    results = list(map(lambda x: {**x.serializeCuotas(), **x.serialize()}, vencimientos))

    return jsonify(results), 200


# Muestra el pago de las mensualidades por rango de fechas
@api.route('/mensualidades_rango/<string:fechaInicio>/<string:fechaFin>', methods=['GET'])
#@jwt_required()
def getRangodeMensualidades(fechaInicio, fechaFin):

    rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(desc(Mensualidades.fechapago)).all()

    if rango is None: 
        return jsonify({"msg": "No hay pago de mensualidades para las fechas solicitadas."}), 404
    
    results = list(map(lambda movimientos: {
        "id": movimientos[0].id,
        "fechapago": movimientos[0].fechapago,
        "monto": movimientos[0].monto,
        "factura": movimientos[0].factura,
        "observaciones": movimientos[0].observaciones,
         #Metodospago
         "metodo": movimientos[1].tipo, 
         # Alumno
         "alumnoNombre": movimientos[2].nombre,
         "alumnoApellido": movimientos[2].apellido
    }, rango))

    return jsonify(results), 200

@api.route('/mensualidadesRango/<string:fechaInicio>/<string:fechaFin>/<string:ordenar>/<string:tipo>', methods=['GET'])
#@jwt_required()
def mensualidades_rango_ord(fechaInicio, fechaFin, ordenar, tipo):
    try: 
        # ordenar   :   asc o Desc
        # tipo      :   factura, alumno, fecha de pago, metodo de pago

        # Ordena de forma ascendente
        if ordenar == "asc":
            # Por factura
            if tipo == "factura":
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(asc(Mensualidades.factura)).all()
            # Por alumnos
            elif tipo == "alumno": 
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(asc(Usuarios.nombre)).all()
            # Por fecha de pago
            elif tipo == "fecha": 
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(asc(Mensualidades.fechapago)).all()
            # Por metodo de pago
            elif tipo == "metodo": 
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(asc(Metodospago.tipo)).all()


        # Ordena de forma descendente
        elif ordenar == "desc": 
            if tipo == "factura":
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(desc(Mensualidades.factura)).all()
            # Por alumnos
            elif tipo == "alumno": 
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(desc(Usuarios.nombre)).all()
            # Por fecha de pago
            elif tipo == "fecha": 
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(desc(Mensualidades.fechapago)).all()
            # Por metodo de pago
            elif tipo == "metodo": 
                rango = db.session.query(Mensualidades, Metodospago, Usuarios).filter(Mensualidades.fechapago>=fechaInicio).filter(Mensualidades.fechapago<=fechaFin).join(Metodospago).join(Usuarios).order_by(desc(Metodospago.tipo)).all()

        if rango is None: 
            return jsonify({"msg": "No hay pago de mensualidades para las fechas solicitadas."}), 404
        
        if rango == []: 
            return jsonify({"msg": "No hay pago de mensualidades para las fechas solicitadas."}), 404
        
        results = list(map(lambda movimientos: {
            "id": movimientos[0].id,
            "fechapago": movimientos[0].fechapago,
            "monto": movimientos[0].monto,
            "factura": movimientos[0].factura,
            "observaciones": movimientos[0].observaciones,
            #Metodospago
            "metodo": movimientos[1].tipo, 
            # Alumno
            "alumnoNombre": movimientos[2].nombre,
            "alumnoApellido": movimientos[2].apellido
        }, rango))

        return jsonify(results), 200
    
    except json.decoder.JSONDecodeError as e:
        return jsonify({"error": "Invalid JSON data"}), 400

#####################################################################################
#####################################################################################
###                                                                               ###
###                   PAGO DE MENSUALIDADES                                       ###
###                                                                               ###
#####################################################################################
#####################################################################################
# Muestra todos los pagos
@api.route('/mensualidades', methods=['GET'])
@jwt_required()
def getMensualidades():
    mensualidades = Mensualidades.query.order_by(desc(Mensualidades.fechapago)).all()
    results = list(map(lambda x: {**x.serializeAlumnos(), **x.serialize()}, mensualidades))
    return jsonify(results), 200

# Muestra los pagos ordenados en forma descendente (de mayor a menor)
@api.route('/mensualidades/desc', methods=['GET'])
@jwt_required()
def getMensualidades_desc():
    mensualidades = Mensualidades.query.order_by(desc(Mensualidades.factura)).all()
    results = list(map(lambda x: {**x.serializeAlumnos(), **x.serialize()}, mensualidades))
    return jsonify(results), 200

# Muestra los pagos ordenados en forma ascendente (de menor a mayor)
@api.route('/mensualidades/asc', methods=['GET'])
@jwt_required()
def getMensualidades_asc():
    mensualidades = Mensualidades.query.order_by(asc(Mensualidades.factura)).all()
    results = list(map(lambda x: {**x.serializeAlumnos(), **x.serialize()}, mensualidades))
    return jsonify(results), 200

# Muestra la numeracion menor de las facturas
@api.route('/mensualidades/menor', methods=['GET'])
@jwt_required()
def getMensualidades_menor():
    factura = Mensualidades.query.order_by(asc(Mensualidades.factura)).first()
    return (factura.serialize()), 200

# Alta de un pago
@api.route('/mensualidades', methods=['POST'])
@jwt_required()
def addMensualidades():
    body = json.loads(request.data)

    queryNewMensulidades = Mensualidades.query.filter_by(factura=body["factura"]).first()
    if queryNewMensulidades is None:
        new_mensualidad = Mensualidades(fechapago=body["fechapago"],
        monto=body["monto"],
        factura=body["factura"],
        observaciones=body["observaciones"],
        idusuario=body["idusuario"],
        idmetodo=body["idmetodo"])

        db.session.add(new_mensualidad)
        db.session.commit()

        return jsonify(new_mensualidad.serialize()), 200
    
    response_body = {"msg": "factura ya ingresada cabezita!"}
    return jsonify(response_body), 400

# Elimina un pago
@api.route('/mensualidades/<int:mensualidad_id>', methods=['DELETE'])
@jwt_required()
def deleteMensualidad(mensualidad_id):
    pago = Mensualidades.query.filter_by(id=mensualidad_id).first()
  
    if pago is None: 
        response_body = {"msg": "Pago no encontrado"}
        return jsonify(response_body), 400

    db.session.delete(pago)
    db.session.commit()

    response_body = {"msg": "Pago borrado"}
    return jsonify(response_body), 200 

# Modifica un pago id
@api.route('/mensualidades/<int:mensualidad_id>', methods=['PUT'])
@jwt_required()
def mensualidadModif_porId(mensualidad_id):
    pago = Mensualidades.query.filter_by(id=mensualidad_id).first()
    body = json.loads(request.data)

    if pago is None:
        response_body = {"msg": "No existe el pago"}
        return jsonify(response_body), 400    

    if "fechapago" in body:
        pago.fechapago = body["fechapago"]
    
    if "monto" in body:
        pago.monto = body["monto"]
    
    if "factura" in body:
        pago.factura = body["factura"]
    
    if "observaciones" in body:
        pago.observaciones = body["observaciones"]
    
    if "idusuario" in body:
        pago.idusuario = body["idusuario"]
    
    if "idmetodo" in body: 
        pago.idmetodo=body["idmetodo"]
    
    db.session.commit()

    response_body = {"msg": "Pago de mensualidad modificado"}
    return jsonify(response_body), 200

# Muestra el pago de la mensualidad por id de pago
@api.route('/mensualidades/<int:mensualidad_id>', methods=['GET'])
@jwt_required()
def get_mensualidadid(mensualidad_id):
    pago = Mensualidades.query.filter_by(id=mensualidad_id).all()
    results = list(map(lambda x: {**x.serializeAlumnos(), **x.serialize()}, pago))

    if results is None: 
        response_body = {"msg": "Mensualidad no encontrada"}
        return jsonify(response_body), 400

    return jsonify(results), 200

# Muestra el pago de la mensualidad por id de usuario
@api.route('/mensualidadesAlumno/<int:idusuario>', methods=['GET'])
@jwt_required()
def pago_mensualidad_id(idusuario):
    pago = Mensualidades.query.order_by(desc(Mensualidades.factura)).filter_by(idusuario=idusuario).all()
    results = list(map(lambda x: {**x.serializeMetodo(), **x.serialize()}, pago))

    if results is None: 
        response_body = {"msg": "Mensualidad no encontrada"}
        return jsonify(response_body), 400

    return jsonify(results), 200


#####################################################################################
#####################################################################################
###                                                                               ###
###                   PRODUCTOS                                                   ###
###                                                                               ###
#####################################################################################
#####################################################################################
# Muestra todos los productos
@api.route('/productos', methods=['GET'])
@jwt_required()
def getProductos():
   
    producto = db.session.query(Productos, Proveedores).join(Proveedores, Productos.proveedorid == Proveedores.id).all()
    
    if producto == []: 
        return jsonify({"msg": "No hay productos encontrados."}), 404
    
    results = list(map(lambda products: {
        #Productos
        "id": products[0].id, 
        "nombre": products[0].nombre, 
        "cantidad": products[0].cantidad, 
        "precioventa": products[0].precioventa,
        "foto": products[0].foto, 
        "video": products[0].video, 
        "observaciones": products[0].observaciones, 
        #Proveedores 
        "idProveedor": products[1].id, 
        "nombreProveedor": products[1].nombre,
    }, producto))
   
    return jsonify(results), 200

# Alta de un producto
@api.route('/productos', methods=['POST'])
@jwt_required()
def addProductos():
    body = json.loads(request.data)

    new_producto = Productos(
    nombre = body ["nombre"], 
    cantidad = body["cantidad"],
    precioventa = body["precioventa"],
    observaciones = body["observaciones"], 
    foto = body["foto"],
    video  = body["video"],
    proveedorid =  body["proveedorid"])

    db.session.add(new_producto)
    db.session.commit()

    return jsonify(new_producto.serialize()), 200

# Elimina un producto
@api.route('/productos/<int:productos_id>', methods=['DELETE'])
@jwt_required()
def deleteProducto(productos_id):
    producto = Productos.query.filter_by(id=productos_id).first()
  
    if producto is None: 
        response_body = {"msg": "Producto no encontrado"}
        return jsonify(response_body), 400

    db.session.delete(producto)
    db.session.commit()

    response_body = {"msg": "Producto borrado"}
    return jsonify(response_body), 200 

# Modifica un producto por id
@api.route('/productos/<int:producto_id>', methods=['PUT'])
@jwt_required()
def productoModif_porId(producto_id):
    producto = Productos.query.filter_by(id=producto_id).first()
    body = json.loads(request.data)

    if producto is None:
        response_body = {"msg": "No existe el producto"}
        return jsonify(response_body), 400    

    if "nombre" in body: 
        producto.nombre = body["nombre"]

    if "cantidad" in body: 
        producto.cantidad = body["cantidad"]
    
    if "precioventa" in body: 
        producto.precioventa = body["precioventa"]
    
    if "observaciones" in body:
        producto.observaciones = body["observaciones"]
    
    if "foto" in body:
        producto.foto = body["foto"]
    
    if "video" in body:
        producto.video  = body["video"]
    
    if "proveedorid" in body:
        producto.proveedorid =  body["proveedorid"]

    db.session.commit()

    response_body = {"msg": "Producto modificado"}
    return jsonify(response_body), 200

# Modifica un producto por id
@api.route('/productos/cantidad/<int:producto_id>', methods=['PUT'])
@jwt_required()
def productoModif_cantidad_porId(producto_id):
    producto = Productos.query.filter_by(id=producto_id).first()
    body = json.loads(request.data)

    if producto is None:
        return jsonify({"msg": "No existe el producto"}), 400    
    
    if (body["tipo"] == "Compra"):
        producto.cantidad = producto.cantidad + body["cantidad"]
    
    if (body["tipo"] == "Venta"):
        producto.cantidad = producto.cantidad - body["cantidad"]
    
    db.session.commit()
    return jsonify({"msg": "Producto modificado"}), 200

# Muestra el producto por id
@api.route('/productos/<int:producto_id>', methods=['GET'])
@jwt_required()
def get_productoid(producto_id):
    products = Productos.query.filter_by(id=producto_id).all()
    results = list(map(lambda x: {**x.serializeProveedor(), **x.serialize()}, products))

    if results is None: 
        response_body = {"msg": "Producto no encontrado"}
        return jsonify(response_body), 400

    return jsonify(results), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   PROVEEDORES                                                 ###
###                                                                               ###
#####################################################################################
#####################################################################################
# Muestra todos los proveedores
@api.route('/proveedores', methods=['GET'])
@jwt_required()
def getProveedores():
    proveedores = Proveedores.query.all()
    results = list(map(lambda x: x.serialize(), proveedores))
    return jsonify(results), 200

# Alta de un proveedor
@api.route('/proveedores', methods=['POST'])
@jwt_required()
def addProveedores():
    body = json.loads(request.data)

    new_proveedor = Proveedores(
    nombre = body ["nombre"], 
    rut = body["rut"],
    direccion = body["direccion"],
    telefono = body["telefono"],
    mail  = body["mail"],
    observaciones = body["observaciones"])

    db.session.add(new_proveedor)
    db.session.commit()

    return jsonify(new_proveedor.serialize()), 200

# Elimina un proveedor
@api.route('/proveedores/<int:proveedor_id>', methods=['DELETE'])
@jwt_required()
def deleteProveedor(proveedor_id):
    proveedor = Proveedores.query.filter_by(id=proveedor_id).first()
  
    if proveedor is None: 
        response_body = {"msg": "Proveedor no encontrado"}
        return jsonify(response_body), 400

    db.session.delete(proveedor)
    db.session.commit()

    response_body = {"msg": "Proveedor borrado"}
    return jsonify(response_body), 200 


# Modifica un proveedor por id
@api.route('/proveedores/<int:proveedores_id>', methods=['PUT'])
@jwt_required()
def proveedorModif_porId(proveedores_id):
    proveedor = Proveedores.query.filter_by(id=proveedores_id).first()
    body = json.loads(request.data)

    if proveedor is None:
        response_body = {"msg": "No existe el proveedor."}
        return jsonify(response_body), 400    

    if "nombre" in body: 
        proveedor.nombre = body["nombre"]

    if "rut" in body: 
        proveedor.rut = body["rut"]
    
    if "direccion" in body: 
        proveedor.direccion = body["direccion"]
    
    if "telefono" in body:
        proveedor.telefono = body["telefono"]
    
    if "mail" in body:
        proveedor.mail  = body["mail"]
    
    if "observaciones" in body:
        proveedor.observaciones = body["observaciones"]

    db.session.commit()

    response_body = {"msg": "Proveedor modificado"}
    return jsonify(response_body), 200

# Muestra el proveedor por id
@api.route('/proveedores/<int:proveedor_id>', methods=['GET'])
@jwt_required()
def get_proveedorid(proveedor_id):
    proveedor = Proveedores.query.filter_by(id=proveedor_id).all()
    results = list(map(lambda x: x.serialize(), proveedor))

    if results is None: 
        response_body = {"msg": "Proveedor no encontrado"}
        return jsonify(response_body), 400

    return jsonify(results), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   PAGO PROVEEDORES                                            ###
###                                                                               ###
#####################################################################################
#####################################################################################
# Alta de un pago de proveedor
@api.route('/pagoproveedores', methods=['POST'])
@jwt_required()
def addPagoProveedores():
    body = json.loads(request.data)

    new_pagoproveedor = Pagoproveedores(
    fechapago = body ["fechapago"], 
    numfactura = body["numfactura"],
    monto = body["monto"],
    observaciones = body["observaciones"],
    idproveedor = body["idproveedor"],
    idmetodo  = body["idmetodo"])

    db.session.add(new_pagoproveedor)
    db.session.commit()

    return jsonify(new_pagoproveedor.serialize()), 200

# Visualizar todos los pagos de proveedores
@api.route('/pagoproveedores', methods=['GET'])
@jwt_required()
def getPagoProveedores():
    prov = db.session.query(Pagoproveedores, Proveedores, Metodospago).join(Proveedores).join(Metodospago).all()

    if prov is None: 
        response_body = {"msg": "No hay pago a proveedores"}
        return jsonify(response_body), 400
    
    info_pagos = (list(map(lambda pagos: {
        # Pagoproveedores
        "id": pagos[0].id,
        "fechapago": pagos[0].fechapago,
        "numfactura": pagos[0].numfactura,
        "monto": pagos[0].monto,
        "observaciones": pagos[0].observaciones,
        # Proveedores
        "idproveedor": pagos[1].nombre,
        #Metodospago
        "idmetodo": pagos[2].tipo
    }, prov)))
    return jsonify(info_pagos), 200

# Muestra el pago al proveedor por id
@api.route('/pagoproveedores/<int:pago_id>', methods=['GET'])
@jwt_required()
def get_pagoproveedorid(pago_id):
    pago = db.session.query(Pagoproveedores, Proveedores, Metodospago).filter_by(id=pago_id).join(Proveedores).join(Metodospago).all()

    if pago is None: 
        response_body = {"msg": "No hay pago a este proveedor"}
        return jsonify(response_body), 400
    
    info_pago = (list(map(lambda pagos: {
        # Pagoproveedores
        "id": pagos[0].id,
        "fechapago": pagos[0].fechapago,
        "numfactura": pagos[0].numfactura,
        "monto": pagos[0].monto,
        "observaciones": pagos[0].observaciones,
        "idproveedor": pagos[0].idproveedor,
        "idmetodo": pagos[0].idmetodo,
        # Proveedores
        "proveedor": pagos[1].nombre,
        #Metodospago
        "metodo": pagos[2].tipo
    }, pago)))
    
    return jsonify(info_pago), 200

# Muestra el pago al proveedor por id
@api.route('/pagoproveedoresid/<int:proveedor_id>', methods=['GET'])
@jwt_required()
def get_pagosproveedores(proveedor_id):
    pago = db.session.query(Pagoproveedores, Proveedores, Metodospago).filter_by(idproveedor=proveedor_id).join(Proveedores).join(Metodospago).all()

    if pago is None: 
        response_body = {"msg": "No hay pago a este proveedor"}
        return jsonify(response_body), 400
    
    info_pago = (list(map(lambda pagos: {
        # Pagoproveedores
        "id": pagos[0].id,
        "fechapago": pagos[0].fechapago,
        "numfactura": pagos[0].numfactura,
        "monto": pagos[0].monto,
        "observaciones": pagos[0].observaciones,
        "idproveedor": pagos[0].idproveedor,
        "idmetodo": pagos[0].idmetodo,
        # Proveedores
        "proveedor": pagos[1].nombre,
        #Metodospago
        "metodo": pagos[2].tipo
    }, pago)))
    return jsonify(info_pago), 200

# Elimina el pago realizado a un proveedor
@api.route('/pagoproveedores/<int:pago_id>', methods=['DELETE'])
@jwt_required()
def deletePagoProveedores(pago_id):
    pago = Pagoproveedores.query.filter_by(id=pago_id).first()
  
    if pago is None: 
        response_body = {"msg": "No existe el pago seleccionado"}
        return jsonify(response_body), 400

    db.session.delete(pago)
    db.session.commit()

    response_body = {"msg": "Pago borrado"}
    return jsonify(response_body), 200 

# Modifica un proveedor por id
@api.route('/pagoproveedores/<int:pago_id>', methods=['PUT'])
@jwt_required()
def pagoProveedorModif_porId(pago_id):
    pago = Pagoproveedores.query.filter_by(id=pago_id).first()
    body = json.loads(request.data)

    if pago is None:
        response_body = {"msg": "No existe ese pago."}
        return jsonify(response_body), 400    

    if "fechapago" in body: 
        pago.fechapago = body["fechapago"]

    if "numfactura" in body:
        pago.numfactura = body["numfactura"]

    if "monto" in body:
        pago.monto = body["monto"]

    if "observaciones" in body:
        pago.observaciones = body["observaciones"]
    
    if "idproveedor" in body:
        pago.idproveedor = body["idproveedor"]
    
    if "idmetodo" in body:
        pago.idmetodo = body["idmetodo"]

    db.session.commit()

    response_body = {"msg": "Pago a proveedor modificado"}
    return jsonify(response_body), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   CAJA DIARIA                                                 ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos los movimientos de la caja Diaria
@api.route('/cajadiaria', methods=['GET'])
@jwt_required()
def get_CajaDiaria():
    cajaDiaria = CajaDiaria.query.order_by(desc(CajaDiaria.fecha)).all()
    results = list(map(lambda x: x.serialize(), cajaDiaria))
    return jsonify(results), 200


# Muestra todos los ingresos por pago de Mensualidades de la caja Diaria
@api.route('/cajadiariaingreso', methods=['POST'])
@jwt_required()
def CajaDiariaIngresos():
    body = json.loads(request.data)
    fecha = body ["fecha"]

    caja = db.session.query(Mensualidades, Metodospago, Usuarios).filter_by(fechapago=fecha).join(Metodospago).join(Usuarios).all()
   
    if caja is None: 
         response_body = {"msg": "No hay movimientos este dia"}
         return jsonify(response_body), 400
    
    results = list(map(lambda movimientos: {
        "id": movimientos[0].id,
        "fechapago": movimientos[0].fechapago,
        "monto": movimientos[0].monto,
        "factura": movimientos[0].factura,
        "observaciones": movimientos[0].observaciones,
         #Metodospago
         "metodo": movimientos[1].tipo, 
         # Alumno
         "alumnoNombre": movimientos[2].nombre,
         "alumnoApellido": movimientos[2].apellido
    }, caja))
    return jsonify(results), 200

# Muestra todos los egresos por pago a Proveedores de la caja Diaria
@api.route('/cajadiariaegreso', methods=['POST'])
@jwt_required()
def CajaDiariaEgresos():
    body = json.loads(request.data)
    fecha = body ["fecha"]
    
    caja = db.session.query(Pagoproveedores, Proveedores, Metodospago).filter_by(fechapago=fecha).join(Proveedores).join(Metodospago).all()
   
    if caja is None: 
         response_body = {"msg": "No hay movimientos este dia"}
         return jsonify(response_body), 400
    
    results = list(map(lambda movimientos: {
        "id": movimientos[0].id,
        "fechapago": movimientos[0].fechapago,
        "monto": movimientos[0].monto,
        "factura": movimientos[0].numfactura,
        "observaciones": movimientos[0].observaciones,
         # Proveedores
         "proveedor": movimientos[1].nombre,
    #     #Metodospago
         "metodo": movimientos[2].tipo
    }, caja))
    return jsonify(results), 200


# Alta de un dia de la caja diaria
@api.route('/cajadiaria', methods=['POST'])
@jwt_required()
def add_CajaDiaria():
    body = json.loads(request.data)

    new_caja = CajaDiaria(
    fecha = body["fecha"], 
    totalmensualidades = body["totalmensualidades"],
    cantidadalumnos = body["cantidadalumnos"],
    # P E N D I E N T E
    totalventas = body["totalventas"],
    totalpagoprov = body["totalpagoprov"],
    observaciones  = body["observaciones"])

    db.session.add(new_caja)
    db.session.commit()

    return jsonify(new_caja.serialize()), 200

# Modificar la informacion de caja diaria por fecha
api.route('/cajadiaria', methods=['PUT'])
@jwt_required()
def modificar_CajaDiaria():
    body = json.loads(request.data)
    
    fecha = body["fecha"]
    caja = CajaDiaria.query.filter_by(fecha=fecha).first()

    if caja is None:
         return jsonify({"msg": "No hay movimientos para esa fecha"}), 400

    if "totalmensualidades" in body:
        caja.totalmensualidades = body["totalmensualidades"]

    if "cantidadalumnos" in body:
        caja.cantidadalumnos = body["cantidadalumnos"]
    
    if "totalventas" in body:
        caja.totalventas = body["totalventas"]

    if "totalpagoprov" in body:
        caja.totalpagoprov = body["totalpagoprov"],
    
    if "observaciones" in body:
        caja.observaciones  = body["observaciones"]

    db.session.commit()
    return jsonify({"msg": "Modificación realizada con éxito total"}), 200

# Muestra un movimiento de la caja Diaria por id
@api.route('/cajadiaria/<int:cajadiaria_id>', methods=['GET'])
@jwt_required()
def get_Cajaid(cajadiaria_id):
    caja = CajaDiaria.query.filter_by(id=cajadiaria_id).all()
    results = list(map(lambda x: x.serialize(), caja))

    if results is None: 
        response_body = {"msg": "Caja no encontrada"}
        return jsonify(response_body), 400

    return jsonify(results), 200

# Chequeo de la caja Diaria por fecha
@api.route('/cajadiariaControlFecha/<string:fecha>', methods=['GET'])
@jwt_required()
def get_CajaFecha(fecha):

    caja = CajaDiaria.query.filter_by(fecha=fecha).first()

    if caja is None: 
        return jsonify({"msg": "Fecha no encontrada"}), 200

    return jsonify({"msg": "La fecha existe"}), 200

# Actualiza los movimientos de la caja Diaria segun la fecha
@api.route('/cajadiaria', methods=['PUT'])
@jwt_required()
def modificar_Caja():
    body = json.loads(request.data)
    fecha = body["fecha"]

    caja = CajaDiaria.query.filter_by(fecha=fecha).first()

    if caja is None: 
        response_body = {"msg": "Fecha no encontrada"}
        return jsonify(response_body), 400

    if "totalmensualidades" in body:
        caja.totalmensualidades = body["totalmensualidades"]

    if "cantidadalumnos" in body:
        caja.cantidadalumnos = body["cantidadalumnos"]
    
    # P E N D I E N T E
    if "totalventas" in body:
        caja.totalventas = body["totalventas"]
    
    if "totalpagoprov" in body:
        caja.totalpagoprov = body["totalpagoprov"]
    
    if "observaciones" in body:
        caja.observaciones  = body["observaciones"]
   
    db.session.commit()

    response_body = {"msg": "Caja diaria modificada"}
    return jsonify(response_body), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   BALANCE MENSUAL                                             ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos los movimientos de la caja Diaria
@api.route('/balanceMensual', methods=['GET'])
@jwt_required()
def get_balanceMensual():
    # order_by(desc(Mensualidades.fechapago))
    cajaMensual = CajaMensual.query.order_by(desc(CajaMensual.fecha)).all()
    results = list(map(lambda x: x.serialize(), cajaMensual))
    return jsonify(results), 200

# Busca los movimientos de la caja diaria por fecha
@api.route('/rangoFechas/<string:fechaInicio>/<string:fechaFin>', methods=['GET'])
#@jwt_required()
def get_rangoFechas(fechaInicio, fechaFin):
    caja = CajaDiaria.query.filter(CajaDiaria.fecha>=fechaInicio).filter(CajaDiaria.fecha<=fechaFin).order_by(desc(CajaDiaria.fecha)).all()
    results = list(map(lambda x: x.serialize(), caja))

    if results is None: 
        response_body = {"msg": "No hay movimientos para ese rango de fechas"}
        return jsonify(response_body), 200
    
    return jsonify(results), 200

# Alta de balance mensual
@api.route('/balanceMensual', methods=['POST'])
@jwt_required()
def add_balanceMensual():
    body = json.loads(request.data)

    new_caja = CajaMensual(
    fecha = body["fecha"], 
    totalmensualidades = body["totalmensualidades"],
    cantidadalumnos = body["cantidadalumnos"],
    # P E N D I E N T E
    totalventas = body["totalventas"],
    totalpagoprov = body["totalpagoprov"],
    observaciones  = body["observaciones"])

    db.session.add(new_caja)
    db.session.commit()

    return jsonify(new_caja.serialize()), 200

# Elimina el pago realizado a un proveedor
@api.route('/balanceMensual/<int:balance_id>', methods=['DELETE'])
@jwt_required()
def deleteBalanceMensual(balance_id):
    balance = CajaMensual.query.filter_by(id=balance_id).first()
  
    if balance is None: 
        response_body = {"msg": "No existe el balance seleccionado"}
        return jsonify(response_body), 400

    db.session.delete(balance)
    db.session.commit()

    response_body = {"msg": "Balance mensual eliminado con exito"}
    return jsonify(response_body), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   INICIO DE SESION                                            ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Inicio de sesión
@api.route("/login", methods=["POST"])
def login():
    body = json.loads(request.data)
    # Solicitud de los datos
    email = body["email"]
    password = body["password"]

    login_user = Usuarios.query.filter_by(email=email).first()

    # Si no existe el usuario
    if login_user is None:
        return jsonify({"msg": "Este email no existe"}), 404

    # Chequeo de la pass encriptada
    checkPass = current_app.bcrypt.check_password_hash(login_user.password, password)

    # Chequeo que el mail y el usuario esten ok
    if email != login_user.email or not checkPass:
        return jsonify({"msg":"Email o password incorrectos"}), 401

    #crea el acceso y devuelve un token a la persona al loguearse
    access_token = create_access_token(identity=email)
    response_body={
        "access_token": access_token,
        "user": login_user.serialize()  
    }

    return jsonify(response_body), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   TIPO DE EJERCICIOS                                          ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos los tipos de ejercicios
@api.route('/tipoEjercicios', methods=['GET'])
@jwt_required()
def get_tipoEjercicios():
    tipoEjercicios = Tipoejercicio.query.order_by(asc(Tipoejercicio.descripcion)).all()
    results = list(map(lambda x: x.serialize(), tipoEjercicios))
    return jsonify(results), 200

# Alta de un tipo de ejercicio
@api.route('/tipoEjercicios', methods=['POST'])
@jwt_required()
def add_tipoEjercicios():
    body = json.loads(request.data)

    tipo = Tipoejercicio.query.filter_by(descripcion=body["descripcion"]).first()
     
    if tipo is None:
        new_tipo = Tipoejercicio(
        descripcion = body["descripcion"])

        db.session.add(new_tipo)
        db.session.commit()

        return jsonify(new_tipo.serialize()), 200

    return jsonify({"msg": "Ya existe el tipo de ejercicio"}), 404

# Elimina el tipo de ejercicio
@api.route('/tipoEjercicios/<int:tipo_id>', methods=['DELETE'])
@jwt_required()
def deletetipoEjercicios(tipo_id):
    tipo = Tipoejercicio.query.filter_by(id=tipo_id).first()
  
    if tipo is None: 
        return jsonify({"msg": "No existe el tipo de ejercicio seleccionado"}), 404

    db.session.delete(tipo)
    db.session.commit()
    return jsonify( {"msg": "Tipo de ejercicio borrado"}), 200 

# Modifica el tipo de ejercicio por id
@api.route('/tipoEjercicios/<int:tipo_id>', methods=['PUT'])
@jwt_required()
def put_tipoEjercicios(tipo_id):
    tipo = Tipoejercicio.query.filter_by(id=tipo_id).first()
    body = json.loads(request.data)

    if tipo is None:
        return jsonify({"msg": "No existe el tipo de ejercicio"}), 400    

    if "descripcion" in body:
        tipo.descripcion =  body["descripcion"]
    
    db.session.commit()
    return jsonify({"msg": "Tipo de ejercicio modificado"}), 200

# Muestra el tipo de ejercicio por id
@api.route('/tipoEjercicios/<int:tipo_id>', methods=['GET'])
@jwt_required()
def get_tipoEjId(tipo_id):
    id = Tipoejercicio.query.filter_by(id=tipo_id).first()

    if id is None: 
        return jsonify({"msg": "Tipo de ejercicio no encontrado"}), 404

    return jsonify(id.serialize()), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   EJERCICIOS                                                  ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todos los ejercicios
@api.route('/ejercicios', methods=['GET'])
@jwt_required()
def get_Ejercicios():
    ejercicios = db.session.query(Ejercicio, Tipoejercicio).order_by(asc(Ejercicio.nombre)).join(Tipoejercicio).all()
    
    if ejercicios == []: 
        return jsonify({"msg": "No hay ejercicios cargados"})
    
    results = list(map(lambda ejercicio: {
        # Ejercicios
        "id" : ejercicio[0].id,
        "nombre": ejercicio[0].nombre,
        "descripcion": ejercicio[0].descripcion,
        "foto": ejercicio[0].foto,
        "video": ejercicio[0].video,
        #Tipo de ejercicios
        "idTipo": ejercicio[1].id, 
        "descripcionTipo": ejercicio[1].descripcion
    }, ejercicios))

    return jsonify(results), 200

# Agrega un nuevo ejercicio
@api.route('/ejercicios', methods=['POST'])
@jwt_required()
def add_tejercicios():
    body = json.loads(request.data)

    ejercicio = Ejercicio.query.filter_by(nombre=body["nombre"]).first()
     
    if ejercicio is None:
        new_ejercicio = Ejercicio(
            nombre = body["nombre"], 
            descripcion = body["descripcion"],
            foto = body["foto"],
            video = body["video"], 
            idtipo = body["idtipo"]
        )

        db.session.add(new_ejercicio)
        db.session.commit()

        return jsonify(new_ejercicio.serialize()), 200

    return jsonify({"msg": "Ya existe el ejercicio"}), 404

# Elimina un ejercicio por el id
@api.route('/ejercicios/<int:id>', methods=['DELETE'])
@jwt_required()
def deletejercicios(id):
    ejercicio = Ejercicio.query.filter_by(id=id).first()
  
    if ejercicio is None: 
        return jsonify({"msg": "No existe el ejercicio seleccionado"}), 404

    db.session.delete(ejercicio)
    db.session.commit()
    return jsonify( {"msg": "Ejercicio eliminado"}), 200 

# Modifica el ejercicio por id
@api.route('/ejercicios/<int:id>', methods=['PUT'])
@jwt_required()
def put_ejercicios(id):
    body = json.loads(request.data)
    ejercicio = Ejercicio.query.filter_by(id=id).first()

    if ejercicio is None:
        return jsonify({"msg": "No existe el ejercicio"}), 404    

    if "nombre" in body:
        ejercicio.nombre =  body["nombre"]
        
    if "descripcion" in body:
        ejercicio.descripcion =  body["descripcion"]

    if "foto" in body:
        ejercicio.foto =  body["foto"]
    
    if "video" in body:
        ejercicio.video =  body["video"]
    
    if "idtipo" in body:
        ejercicio.idtipo =  body["idtipo"]
    
    db.session.commit()
    return jsonify({"msg": "Ejercicio modificado"}), 200

# Muestra el ejercicio por id
@api.route('/ejercicios/<int:id>', methods=['GET'])
@jwt_required()
def get_EjId(id):
    id = db.session.query(Ejercicio, Tipoejercicio).filter_by(id=id).join(Tipoejercicio).all()
    if id is None: 
        return jsonify({"msg": "Ejercicio no encontrado."}), 404

    results = list(map(lambda ejercicio: {
        # Ejercicios
        "id" : ejercicio[0].id,
        "nombre": ejercicio[0].nombre,
        "descripcion": ejercicio[0].descripcion,
        "foto": ejercicio[0].foto,
        "video": ejercicio[0].video,
        #Tipo de ejercicios
        "idTipo": ejercicio[1].id, 
        "descripcionTipo": ejercicio[1].descripcion
    }, id))

    return jsonify(results), 200

# Muestra los ejercicios ordenados en forma descendente (de mayor a menor) por nombre
@api.route('/ejercicios/nombDesc', methods=['GET'])
@jwt_required()
def getnombDesc():
    ejercicios = db.session.query(Ejercicio, Tipoejercicio).order_by(desc(Ejercicio.nombre)).join(Tipoejercicio).all()
    
    if ejercicios == []: 
        return jsonify({"msg": "No hay ejercicios cargados"})
    
    results = list(map(lambda ejercicio: {
        # Ejercicios
        "id" : ejercicio[0].id,
        "nombre": ejercicio[0].nombre,
        "descripcion": ejercicio[0].descripcion,
        "foto": ejercicio[0].foto,
        "video": ejercicio[0].video,
        #Tipo de ejercicios
        "idTipo": ejercicio[1].id, 
        "descripcionTipo": ejercicio[1].descripcion
    }, ejercicios))

    return jsonify(results), 200


# Muestra los ejercicios ordenados en forma descendente (de mayor a menor) por nombre
@api.route('/ejercicios/nombAsc', methods=['GET'])
@jwt_required()
def getNombAsc():
    ejercicios = db.session.query(Ejercicio, Tipoejercicio).order_by(asc(Ejercicio.nombre)).join(Tipoejercicio).all()
    
    if ejercicios == []: 
        return jsonify({"msg": "No hay ejercicios cargados"})
    
    results = list(map(lambda ejercicio: {
        # Ejercicios
        "id" : ejercicio[0].id,
        "nombre": ejercicio[0].nombre,
        "descripcion": ejercicio[0].descripcion,
        "foto": ejercicio[0].foto,
        "video": ejercicio[0].video,
        #Tipo de ejercicios
        "idTipo": ejercicio[1].id, 
        "descripcionTipo": ejercicio[1].descripcion
    }, ejercicios))

    return jsonify(results), 200

# Muestra los ejercicios ordenados en forma descendente (de mayor a menor) por tipo
@api.route('/ejercicios/tipoDesc', methods=['GET'])
@jwt_required()
def get_TipoDesc():
    ejercicios = db.session.query(Ejercicio, Tipoejercicio).order_by(desc(Tipoejercicio.descripcion)).join(Tipoejercicio).all()
    
    if ejercicios == []: 
        return jsonify({"msg": "No hay ejercicios cargados"})
    
    results = list(map(lambda ejercicio: {
        # Ejercicios
        "id" : ejercicio[0].id,
        "nombre": ejercicio[0].nombre,
        "descripcion": ejercicio[0].descripcion,
        "foto": ejercicio[0].foto,
        "video": ejercicio[0].video,
        #Tipo de ejercicios
        "idTipo": ejercicio[1].id, 
        "descripcionTipo": ejercicio[1].descripcion
    }, ejercicios))

    return jsonify(results), 200


# Muestra los ejercicios ordenados en forma descendente (de mayor a menor) por nombre
@api.route('/ejercicios/TipoAsc', methods=['GET'])
@jwt_required()
def get_TipoAsc():
    ejercicios = db.session.query(Ejercicio, Tipoejercicio).order_by(asc(Tipoejercicio.descripcion)).join(Tipoejercicio).all()
    
    if ejercicios == []: 
        return jsonify({"msg": "No hay ejercicios cargados"})
    
    results = list(map(lambda ejercicio: {
        # Ejercicios
        "id" : ejercicio[0].id,
        "nombre": ejercicio[0].nombre,
        "descripcion": ejercicio[0].descripcion,
        "foto": ejercicio[0].foto,
        "video": ejercicio[0].video,
        #Tipo de ejercicios
        "idTipo": ejercicio[1].id, 
        "descripcionTipo": ejercicio[1].descripcion
    }, ejercicios))

    return jsonify(results), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                   COMPRAS                                                     ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todas las compras realizadas
@api.route('/compras', methods=['GET'])
@jwt_required()
def get_Compras():
    compras = db.session.query(Compras, Productos, Proveedores, Metodospago).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()
    
    if compras == []: 
        return jsonify({"msg": "No hay compras realizadas"})
    
    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, compras))

    return jsonify(results), 200

# Agrega una nueva compra
@api.route('/compras', methods=['POST'])
@jwt_required()
def add_compras():
    body = json.loads(request.data)
    
    new_compra = Compras(
        preciocompra = body["preciocompra"], 
        fecha = body["fecha"],
        cantidad = body["cantidad"],
        observaciones = body["observaciones"], 
        idproducto = body["idproducto"],
        idproveedor = body["idproveedor"],
        idmetodo = body["idmetodo"]
    )

    db.session.add(new_compra)
    db.session.commit()

    return jsonify(new_compra.serialize()), 200

# Elimina una compra por el id
@api.route('/compras/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_compra(id):
    compra = Compras.query.filter_by(id=id).first()
  
    if compra is None: 
        return jsonify({"msg": "No existe ninguna compra con ese id"}), 404

    db.session.delete(compra)
    db.session.commit()
    return jsonify( {"msg": "Compra eliminada"}), 200 

# Modifica la compra por el id
@api.route('/compras/<int:id>', methods=['PUT'])
@jwt_required()
def put_compras(id):
    body = json.loads(request.data)
    compras = Compras.query.filter_by(id=id).first()

    if compras is None:
        return jsonify({"msg": "No existe la compra seleccionada"}), 404    

    if "preciocompra" in body:
        compras.preciocompra = body["preciocompra"]
        
    if "fecha" in body:
        compras.fecha = body["fecha"]

    if "cantidad" in body:
        compras.cantidad = body["cantidad"]
    
    if "observaciones" in body:
        compras.observaciones = body["observaciones"]
    
    if "idproducto" in body:
        compras.idproducto = body["idproducto"]
    
    if "idproveedor" in body:
        compras.idproveedor = body["idproveedor"]

    if "idmetodo" in body:
        compras.idmetodo = body["idmetodo"]

    db.session.commit()
    return jsonify({"msg": "Compra modificada"}), 200

#Muestra la compra por id
@api.route('/compras/<int:id>', methods=['GET'])
@jwt_required()
def get_comprasId(id):
    
    id = db.session.query(Compras, Productos, Proveedores, Metodospago).filter_by(id=id).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()
    
    if id == []: 
        return jsonify({"msg": "Compra no encontrada."}), 404

    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, id))

    return jsonify(results), 200

# Busca los movimientos de las compras por fecha
@api.route('/comprasFechas/<string:fechaInicio>/<string:fechaFin>', methods=['GET'])
#@jwt_required()
def get_comprasFechas(fechaInicio, fechaFin):
    
    compras = db.session.query(Compras, Productos, Proveedores, Metodospago).filter(Compras.fecha>=fechaInicio).filter(Compras.fecha<=fechaFin).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()

    if compras is None: 
        response_body = {"msg": "No hay movimientos para ese rango de fechas"}
        return jsonify(response_body), 200
    
    if compras == []: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404

    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, compras))
    
    return jsonify(results), 200

# Muestra las compras ordenados en forma descendente (de mayor a menor) por fecha
@api.route('/compras/fechaDesc', methods=['GET'])
@jwt_required()
def get_fecha_Desc():
    compras = db.session.query(Compras, Productos, Proveedores, Metodospago).order_by(desc(Compras.fecha)).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()
    
    if compras is None: 
        response_body = {"msg": "No hay movimientos para ese rango de fechas"}
        return jsonify(response_body), 200
    
    if compras == []: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404

    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, compras))
    
    return jsonify(results), 200

# Muestra las compras ordenados en forma ascendente (de menor a mayor) por fecha
@api.route('/compras/fechaAsc', methods=['GET'])
@jwt_required()
def get_Compras_fecha_Asc():
    compras = db.session.query(Compras, Productos, Proveedores, Metodospago).order_by(asc(Compras.fecha)).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()
    
    if compras is None: 
        response_body = {"msg": "No hay movimientos para ese rango de fechas"}
        return jsonify(response_body), 200
    
    if compras == []: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404

    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, compras))
    
    return jsonify(results), 200


# Muestra las compras ordenados en forma ascendente (de menor a mayor) por producto
@api.route('/compras/productoAsc', methods=['GET'])
@jwt_required()
def get_Compras_producto_Asc():
    compras = db.session.query(Compras, Productos, Proveedores, Metodospago).order_by(asc(Productos.nombre)).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()
    
    if compras is None: 
        response_body = {"msg": "No hay movimientos para ese rango de fechas"}
        return jsonify(response_body), 200
    
    if compras == []: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404

    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, compras))
    
    return jsonify(results), 200


# Muestra las compras ordenados en forma ascendente (de menor a mayor) por producto
@api.route('/compras/productoDesc', methods=['GET'])
@jwt_required()
def get_Compras_producto_Desc():
    compras = db.session.query(Compras, Productos, Proveedores, Metodospago).order_by(desc(Productos.nombre)).join(Productos, Compras.idproducto == Productos.id).join(Proveedores, Compras.idproveedor == Proveedores.id).join(Metodospago, Compras.idmetodo == Metodospago.id).all()
    
    if compras is None: 
        response_body = {"msg": "No hay movimientos para ese rango de fechas"}
        return jsonify(response_body), 200
    
    if compras == []: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404

    results = list(map(lambda compra: {
        # Compras
        "idCompra" : compra[0].id,
        "preciocompra": compra[0].preciocompra,
        "fecha": compra[0].fecha,
        "cantidad": compra[0].cantidad,
        "observaciones": compra[0].observaciones,
        
        # Productos
        "idProducto": compra[1].id, 
        "nombreProducto": compra[1].nombre,
        "fotoProducto": compra[1].foto,

        # Proveedores
        "idProveedor": compra[2].id, 
        "nombreProveedor": compra[2].nombre,

        # Metodo de pago
        "idMetodo": compra[3].id, 
        "TipoMetodo": compra[3].tipo
    }, compras))
    
    return jsonify(results), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###                      VENTAS                                                   ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra todas las ventas
@api.route('/ventas', methods=['GET'])
@jwt_required()
def get_ventas():
    ventas = db.session.query(Ventas, Productos, Usuarios, Metodospago).join(Productos, Ventas.idproducto == Productos.id).join(Usuarios, Ventas.idusuario == Usuarios.id).join(Metodospago, Ventas.idmetodo == Metodospago.id).all()
    
    if ventas == []: 
        return jsonify({"msg": "No hay ventas realizadas"}), 404
    
    results = list(map(lambda venta: {
        # Ventas
        "idVenta" : venta[0].id,
        "fechacompra": venta[0].fechacompra,
        "fechapago": venta[0].fechapago,
        "cantidad": venta[0].cantidad,
        "observaciones": venta[0].observaciones,
        "preciounitario": venta[0].preciounitario,
        
        # Productos
        "idProducto": venta[1].id, 
        "nombreProducto": venta[1].nombre,
        "fotoProducto": venta[1].foto,

        # Usuarios
        "idUsuario": venta[2].id,
        "nombreUsuario": venta[2].nombre + " " + venta[2].apellido,

        # Metodo de pago
        "idMetodo": venta[3].id, 
        "TipoMetodo": venta[3].tipo
    }, ventas))

    return jsonify(results), 200

# Agrega una nueva venta
@api.route('/ventas', methods=['POST'])
@jwt_required()
def add_ventas():
    body = json.loads(request.data)
    
    new_venta = Ventas(
        fechacompra = body["fechacompra"], 
        cantidad = body["cantidad"],
        preciounitario = body["preciounitario"],
        observaciones = body["observaciones"], 
        fechapago = body["fechapago"],
        idproducto = body["idproducto"],
        idusuario = body["idusuario"],
        idmetodo = body["idmetodo"]
    )

    db.session.add(new_venta)
    db.session.commit()

    return jsonify(new_venta.serialize()), 200

# Elimina una venta por el id
@api.route('/ventas/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_venta(id):
    venta = Ventas.query.filter_by(id=id).first()
  
    if venta is None: 
        return jsonify({"msg": "No existe ninguna venta con ese id"}), 404

    db.session.delete(venta)
    db.session.commit()
    return jsonify( {"msg": "Venta eliminada"}), 200 

# Modifica la compra por el id
@api.route('/ventas/<int:id>', methods=['PUT'])
@jwt_required()
def put_ventas(id):
    body = json.loads(request.data)
    venta = Ventas.query.filter_by(id=id).first()

    if venta is None:
        return jsonify({"msg": "No existe la venta seleccionada"}), 404    

    if "fechacompra" in body:
        venta.fechacompra = body["fechacompra"]
        
    if "cantidad" in body:
        venta.cantidad = body["cantidad"]

    if "preciounitario" in body:
        venta.preciounitario = body["preciounitario"]

    if "observaciones" in body:
        venta.observaciones = body["observaciones"]

    if "fechapago" in body:
        venta.fechapago = body["fechapago"]

    if "idproducto" in body:
        venta.idproducto = body["idproducto"]
    
    if "idusuario" in body:
        venta.idusuario = body["idusuario"]

    if "idmetodo" in body:
        venta.idmetodo = body["idmetodo"]

    db.session.commit()
    return jsonify({"msg": "Venta modificada"}), 200

#Muestra la ventas por id
@api.route('/ventas/<int:id>', methods=['GET'])
@jwt_required()
def get_ventas_id(id):

    id = db.session.query(Ventas, Productos, Usuarios, Metodospago).filter_by(id=id).join(Productos, Ventas.idproducto == Productos.id).join(Usuarios, Ventas.idusuario == Usuarios.id).join(Metodospago, Ventas.idmetodo == Metodospago.id).all()
    
    if id == []: 
        return jsonify({"msg": "Venta no encontrada."}), 404

    results = list(map(lambda venta: {
        # Ventas
        "idVenta" : venta[0].id,
        "fechacompra": venta[0].fechacompra,
        "fechapago": venta[0].fechapago,
        "cantidad": venta[0].cantidad,
        "observaciones": venta[0].observaciones,
        "preciounitario": venta[0].preciounitario,
        
        # Productos
        "idProducto": venta[1].id, 
        "nombreProducto": venta[1].nombre,
        "fotoProducto": venta[1].foto,

        # Usuarios
        "idUsuario": venta[2].id,
        "nombreUsuario": venta[2].nombre + " " + venta[2].apellido,

        # Metodo de pago
        "idMetodo": venta[3].id, 
        "TipoMetodo": venta[3].tipo
    }, id))
    
    return jsonify(results), 200

# Busca los movimientos de las ventas por un rango de fecha
@api.route('/ventas/<string:fechaInicio>/<string:fechaFin>', methods=['GET'])
#@jwt_required()
def get_ventas_fechas(fechaInicio, fechaFin):
    
    ventas = db.session.query(Ventas, Productos, Usuarios, Metodospago).filter(Ventas.fechacompra>=fechaInicio).filter(Ventas.fechacompra<=fechaFin).join(Productos, Ventas.idproducto == Productos.id).join(Usuarios, Ventas.idusuario == Usuarios.id).join(Metodospago, Ventas.idmetodo == Metodospago.id).all()

    if ventas is None: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404
    
    if ventas == []: 
        return jsonify({"msg": "No hay movimientos para ese rango de fechas"}), 404

    results = list(map(lambda venta: {
        # Ventas
        "idVenta" : venta[0].id,
        "fechacompra": venta[0].fechacompra,
        "fechapago": venta[0].fechapago,
        "cantidad": venta[0].cantidad,
        "observaciones": venta[0].observaciones,
        "preciounitario": venta[0].preciounitario,
        
        # Productos
        "idProducto": venta[1].id, 
        "nombreProducto": venta[1].nombre,
        "fotoProducto": venta[1].foto,

        # Usuarios
        "idUsuario": venta[2].id,
        "nombreUsuario": venta[2].nombre + " " + venta[2].apellido,

        # Metodo de pago
        "idMetodo": venta[3].id, 
        "TipoMetodo": venta[3].tipo
    }, ventas))
    
    return jsonify(results), 200

# Muestra todas las ventas ordenados ascendentemente
@api.route('/ventas/fechaAsc', methods=['GET'])
@jwt_required()
def get_ventas_fechaAsc():
    ventas = db.session.query(Ventas, Productos, Usuarios, Metodospago).order_by(asc(Ventas.fechacompra)).join(Productos, Ventas.idproducto == Productos.id).join(Usuarios, Ventas.idusuario == Usuarios.id).join(Metodospago, Ventas.idmetodo == Metodospago.id).all()
    
    if ventas == []: 
        return jsonify({"msg": "No hay ventas realizadas"}), 404
    
    results = list(map(lambda venta: {
        # Ventas
        "idVenta" : venta[0].id,
        "fechacompra": venta[0].fechacompra,
        "fechapago": venta[0].fechapago,
        "cantidad": venta[0].cantidad,
        "observaciones": venta[0].observaciones,
        "preciounitario": venta[0].preciounitario,
        
        # Productos
        "idProducto": venta[1].id, 
        "nombreProducto": venta[1].nombre,
        "fotoProducto": venta[1].foto,

        # Usuarios
        "idUsuario": venta[2].id,
        "nombreUsuario": venta[2].nombre + " " + venta[2].apellido,

        # Metodo de pago
        "idMetodo": venta[3].id, 
        "TipoMetodo": venta[3].tipo
    }, ventas))

    return jsonify(results), 200

# Muestra todas las ventas ordenados desc
@api.route('/ventas/fechaDesc', methods=['GET'])
@jwt_required()
def get_ventas_fechaDesc():
    ventas = db.session.query(Ventas, Productos, Usuarios, Metodospago).order_by(desc(Ventas.fechacompra)).join(Productos, Ventas.idproducto == Productos.id).join(Usuarios, Ventas.idusuario == Usuarios.id).join(Metodospago, Ventas.idmetodo == Metodospago.id).all()
    
    if ventas == []: 
        return jsonify({"msg": "No hay ventas realizadas"}), 404
    
    results = list(map(lambda venta: {
        # Ventas
        "idVenta" : venta[0].id,
        "fechacompra": venta[0].fechacompra,
        "fechapago": venta[0].fechapago,
        "cantidad": venta[0].cantidad,
        "observaciones": venta[0].observaciones,
        "preciounitario": venta[0].preciounitario,
        
        # Productos
        "idProducto": venta[1].id, 
        "nombreProducto": venta[1].nombre,
        "fotoProducto": venta[1].foto,

        # Usuarios
        "idUsuario": venta[2].id,
        "nombreUsuario": venta[2].nombre + " " + venta[2].apellido,

        # Metodo de pago
        "idMetodo": venta[3].id, 
        "TipoMetodo": venta[3].tipo
    }, ventas))

    return jsonify(results), 200


#####################################################################################
#####################################################################################
###                                                                               ###
###                      RUTINAS                                                  ###
###                                                                               ###
#####################################################################################
#####################################################################################

#Muestra todas las rutinas
@api.route('/rutina', methods=['GET'])
@jwt_required()
def get_rutinas():
    rutinas = db.session.query(Rutina, Usuarios).join(Usuarios).order_by(desc(Rutina.fechafinalizacion)).all()

    if rutinas is None:
        return jsonify({"msg": "No existen rutinas"}), 400
    
    if rutinas == []:
        return jsonify({"msg": "No existen rutinas"}), 400
    
    results = list(map(lambda rutina: {
        # Rutina
        "idRutina" : rutina[0].id,
        "fechacomienzo": rutina[0].fechacomienzo,
        "fechafinalizacion": rutina[0].fechafinalizacion,
        
        # Usuarios
        "idUsuario": rutina[1].id,
        "nombreUsuario": rutina[1].nombre + " " + rutina[1].apellido,
    }, rutinas))

    return jsonify(results), 200


# Alta de un rutina
@api.route('/rutina', methods=['POST'])
@jwt_required()
def add_rutina():
    body = json.loads(request.data)

    new_rutina = Rutina(
        fechacomienzo=body["fechacomienzo"],
        fechafinalizacion=body["fechafinalizacion"],
        idusuario=body["idusuario"]
    )

    db.session.add(new_rutina)
    db.session.commit()

    return jsonify(new_rutina.serialize()), 200

# Eliminacion de una rutina
@api.route('/rutina/<int:rutina_id>', methods=['DELETE'])
@jwt_required()
def delete_rutina(rutina_id):
    rutinaId = Rutina.query.filter_by(id=rutina_id).first()
  
    if rutinaId is None: 
        return jsonify({"msg": "Id de rutina no encontrada"}), 400

    db.session.delete(rutinaId)
    db.session.commit()

    return jsonify({"msg": "Rutina: " + str(rutina_id) + " borrada"}), 200 

# Modifica una rutina por id
@api.route('/rutina/<int:rutina_id>', methods=['PUT'])
@jwt_required()
def update_rutina(rutina_id):
    rutinaModif = Rutina.query.filter_by(id=rutina_id).first()
    body = json.loads(request.data)

    if rutinaModif is None:
        return jsonify({"msg": "No existe la rutina que quiere modificar"}), 400    

    if "fechacomienzo" in body:
        rutinaModif.fechacomienzo =  body["fechacomienzo"]

    if "fechafinalizacion" in body:
        rutinaModif.fechafinalizacion = body["fechafinalizacion"]

    if "idusuario" in body:
        rutinaModif.idusuario = body["idusuario"]
    
    db.session.commit()
    return jsonify({"msg": "Rutina: " + str(rutina_id) + " modificada"}), 200

# Muestra la rutina por id
@api.route('/rutina/<int:rutina_id>', methods=['GET'])
@jwt_required()
def get_rutina_id(rutina_id):
    id =db.session.query(Rutina, Usuarios).filter_by(id=rutina_id).join(Usuarios).all()

    if id is None: 
        return jsonify({"msg": "Rutina: " + str(rutina_id) + " no encontrada."}), 400
    
    if id == []: 
        return jsonify({"msg": "Rutina: " + str(rutina_id) + " no encontrada."}), 400

    results = list(map(lambda rutina: {
        # Rutina
        "idRutina" : rutina[0].id,
        "fechacomienzo": rutina[0].fechacomienzo,
        "fechafinalizacion": rutina[0].fechafinalizacion,

        # Usuarios
        "idUsuario": rutina[1].id,
        "nombreUsuario": rutina[1].nombre + " " + rutina[1].apellido,
    }, id))
    
    return jsonify(results), 200

# Muestra la rutina por id de usuario
@api.route('/rutina_usuario/<int:rutina_idUsuario>', methods=['GET'])
@jwt_required()
def get_rutina_usuario_id(rutina_idUsuario):
    id =db.session.query(Rutina, Usuarios).order_by(desc(Rutina.fechafinalizacion)).filter_by(idusuario=rutina_idUsuario).join(Usuarios).all()

    if id is None: 
        return jsonify({"msg": "Rutina: " + str(rutina_idUsuario) + " no encontrada."}), 400
    
    if id == []: 
        return jsonify({"msg": "Rutina: " + str(rutina_idUsuario) + " no encontrada."}), 400

    results = list(map(lambda rutina: {
        # Rutina
        "idRutina" : rutina[0].id,
        "fechacomienzo": rutina[0].fechacomienzo,
        "fechafinalizacion": rutina[0].fechafinalizacion,

        # Usuarios
        "idUsuario": rutina[1].id,
        "nombreUsuario": rutina[1].nombre + " " + rutina[1].apellido,
    }, id))
    
    return jsonify(results), 200

#####################################################################################
#####################################################################################
###                                                                               ###
###               Ejercicios de las RUTINAS                                       ###
###                                                                               ###
#####################################################################################
#####################################################################################

# Muestra los ejercicios de una rutina
@api.route('/rutina_aux/<int:idRutina>', methods=['GET'])
@jwt_required()
def get_rutina_aux_rutina_id(idRutina):
    ejercicios = db.session.query(RutinasAux, Rutina, Ejercicio, Tipoejercicio).filter_by(idrutina = idRutina).join(Rutina).join(Ejercicio).join(Tipoejercicio).all()

    if ejercicios is None: 
        return jsonify({"msg": "Rutina: " + str(idRutina) + " no encontrada."}), 400
    
    if ejercicios == []: 
        return jsonify({"msg": "Rutina: " + str(idRutina) + " no encontrada."}), 400

    results = list(map(lambda rutina: {
        # RutinaAux
        "id": rutina[0].id,
        "serie": rutina[0].serie,
        "carga": rutina[0].carga,
        "repeticiones": rutina[0].repeticiones,
        "semana": rutina[0].semana,

        # Rutina
        "idRutina" : rutina[1].id,
        "fechacomienzo": rutina[1].fechacomienzo,
        "fechafinalizacion": rutina[1].fechafinalizacion,

        # Ejercicios
        "idEjercicio": rutina[2].id,
        "nombreEjercicio": rutina[2].nombre,

        #Tipo de ejercicio
        "idTipoEj": rutina[3].id, 
        "descripcionTipoEj": rutina[3].descripcion
    }, ejercicios))
    
    return jsonify(results), 200

# Alta de los ejercicios de una rutina
@api.route('/rutina_aux', methods=['POST'])
@jwt_required()
def add_rutina_aux():
    body = json.loads(request.data)

    new = RutinasAux(
        serie = body["serie"],
        carga = body["carga"],
        repeticiones = body["repeticiones"],
        semana = body["semana"],
        idrutina = body["idrutina"],
        idejercicio = body["idejercicio"],
    )

    db.session.add(new)
    db.session.commit()

    return jsonify(new.serialize()), 200
