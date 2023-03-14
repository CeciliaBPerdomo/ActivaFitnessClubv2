  
import os
from flask_admin import Admin
from .models import db, Usuarios, Cuota, Mensualidades, Metodospago, Mutualista, Proveedores, Pagoproveedores
from .models import Productos, Compras, Ventas, CajaDiaria, CajaMensual, CajaAnual, Tipoejercicio, Ejercicio
from .models import Rutina, RutinasAux, Carrito, Ventasonline
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Activa Fitness Club', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Usuarios, db.session))
    admin.add_view(ModelView(Cuota, db.session))
    admin.add_view(ModelView(Mensualidades, db.session))
    admin.add_view(ModelView(Metodospago, db.session))
    admin.add_view(ModelView(Mutualista, db.session))
    admin.add_view(ModelView(Proveedores, db.session))
    admin.add_view(ModelView(Pagoproveedores, db.session))
    admin.add_view(ModelView(Productos, db.session))
    admin.add_view(ModelView(Compras, db.session))
    admin.add_view(ModelView(Ventas, db.session))
    admin.add_view(ModelView(CajaDiaria, db.session))
    admin.add_view(ModelView(CajaMensual, db.session))
    admin.add_view(ModelView(CajaAnual, db.session))
    admin.add_view(ModelView(Tipoejercicio, db.session))
    admin.add_view(ModelView(Ejercicio, db.session))
    admin.add_view(ModelView(Rutina, db.session))
    admin.add_view(ModelView(RutinasAux, db.session))
    admin.add_view(ModelView(Carrito, db.session))
    admin.add_view(ModelView(Ventasonline, db.session))
