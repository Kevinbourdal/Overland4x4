from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from marshmallow import fields
from flask_marshmallow import Marshmallow
from utils import response

db = SQLAlchemy()
ma = Marshmallow()

MAX_INTEGER_MYSQL = 2147483647


def parse_sql_errors(error):
    # decode mysql errors
    pass


class ModelBase:
    def commit(self):
        try:
            db.session.commit()
            return self
        except:
            return False

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except exc.IntegrityError as ex:
            return response(409, f'Confict in Database: {ex.args[0]}')
        except Exception as ex:
            return response(500, f'Data base error\n{ex}')

    def delete_(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except exc.IntegrityError as ex:
            return response(409, f'Confict in Database: {ex.args[0]}')
        except Exception as ex:
            return response(500, f'Data base error\n{ex}')


class Permission(ModelBase, db.Model):
    __tablename__ = 'permission'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)

    def __init__(self, **kwargs):
        for key in kwargs:
            if hasattr(self, key):
                setattr(self, key, kwargs[key])

    def __repr__(self):
        return f'permission {self.id}'


class RoleSchema(ma.Schema):
    id = fields.Integer()
    role_name = fields.Integer()


class RoleModel(ModelBase, db.Model):
    __tablename__ = 'role'

    PERMISSION = {'fullAdmin': 1,
                  'mediumAdmin': 2,
                  'beginerAdmin': 3,
                  'clients': 4,
                  }

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    role_name = db.Column('role_name', db.String(25), default='Unauthorized')

    def __init__(self, role_name):
        if role_name == 'fullAdmin':
            self.role_name = role_name
        elif role_name == 'mediumAdmin':
            self.role_name = role_name
        elif role_name == 'beginerAdmin':
            self.role_name = role_name
        elif role_name == 'clients':
            self.role_name = role_name

    def __repr__(self):
        return f'{self.role_name} role'


class UsuarioSchema(ma.Schema):
    id_usuario = fields.Integer()
    password = fields.String(required=True)
    email = fields.String(required=True)
    role_id = fields.Integer()


class UsuarioModel(ModelBase, db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column('id_usuario', db.Integer, autoincrement=True, primary_key=True)
    password = db.Column('password', db.String(30), unique=False, nullable=False)
    email = db.Column('email', db.String(40), unique=True, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='CASCADE'), nullable=False)
    role = db.relationship('RoleModel')

    def __init__(self, password, email, role_id):
        self.password = password
        self.email = email
        self.role_id = role_id

    def __repr__(self):
        return f'{self.email} email'


class DataSchema(ma.Schema):
    id_data = fields.Integer()
    client = fields.Integer()
    gender = fields.String()
    # pathologies = fields.Integer()
    # # palotogias no va porque cree una tabla intermedia para comunicarlos
    nationality = fields.String(required=True)
    phone = fields.Integer(required=True)
    born = fields.Date(required=True, format='%Y-%m-%d')
    observ_lunch = fields.String()
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)


class DataModel(ModelBase, db.Model):
    __tablename__ = 'data'

    id_data = db.Column('id_data', db.Integer, autoincrement=True, primary_key=True)
    phone = db.Column('phone', db.Integer, nullable=False)
    born = db.Column('born', db.Date, nullable=False)
    observ_lunch = db.Column('observ_lunch', db.String(255), nullable=False)
    first_name = db.Column('first_name', db.String(30), nullable=False)
    last_name = db.Column('last_name', db.String(30), nullable=False)
    gender = db.column('gender', db.String(30), nullable=False)
    nationality = db.Column('nationality', db.String(40), nullable=False)
    client = db.Column(db.Integer, db.ForeignKey('client.id_client', ondelete='CASCADE'), nullable=False)
    client_id = db.relationship('ClientModel')

    def __init__(self, client, gender, pathologies, nationality, phone, born,
                 observ_lunch, first_name, last_name):
        self.client = client
        self.gender = gender
        self.pathologies = pathologies
        self.nationality = nationality
        self.phone = phone
        self.born = born
        self.observ_lunch = observ_lunch
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f'Id : {self.id_data} Document : {self.card_id} Name : {self.first_name}'


class PathologiesDataSchema(ma.Schema):
    id = fields.Integer()
    data = fields.Integer()
    pathologies = fields.Integer()


class PathologiesDataModel(ModelBase, db.Model):
    __tablename__ = 'pathologiesData'
    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    data = db.Column(db.Integer, db.ForeignKey('data.id_data', ondelete='CASCADE'), nullable=False)
    data_id = db.relationship('DataModel')
    pathologies = db.Column(db.Integer, db.ForeignKey('pathologies.id_pathologies', ondelete='CASCADE'), nullable=False)
    pathologies_id = db.relationship('PathologiesModel')

    def __init__(self, data, pathologies):
        self.data = data
        self.pathologies = pathologies

    def __repr__(self):
        return f'{self.data} data , {self.pathologies} pathologies'


class PathologiesSchema(ma.Schema):
    id_pathologies = fields.Integer()
    name = fields.String()


class PathologiesModel(ModelBase, db.Model):
    __tablename__ = 'pathologies'

    id_pathologies = db.Column('id_pathologies', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String(60), default='Unauthorized')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'{self.name} pathologies'


class ClientSchema(ma.Schema):
    id_client = fields.Integer()
    usuario = fields.Integer()
    data = fields.Integer()
    accompanist = fields.Integer()
    vehicle = fields.Integer()
    hotel = fields.Integer()


class ClientModel(ModelBase, db.Model):
    __tablename__ = 'client'

    id_client = db.Column('id_client', db.Integer, autoincrement=True, primary_key=True)
    usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario', ondelete='CASCADE'), nullable=False)
    usuario_id = db.relationship('UsuarioModel')
    data = db.Column(db.Integer, db.ForeignKey('data.id_data', ondelete='CASCADE'), nullable=False)
    data_id = db.relationship('DataModel')
    accompanist = db.Column(db.Integer, db.ForeignKey('accompanist.id_accompanist', ondelete='CASCADE'), nullable=False)
    accompanist_id = db.relationship('AccompanistModel')
    vehicle = db.Column(db.Integer, db.ForeignKey('vehicle.id_vehicle', ondelete='CASCADE'), nullable=False)
    vehicle_id = db.relationship('VehicleModel')
    hotel = db.Column(db.Integer, db.ForeignKey('hotel.id_hotel', ondelete='CASCADE'), nullable=False)
    hotel_id = db.relationship('HotelModel')

    def __init__(self, usuario, data, accompanist, vehicle, hotel):
        self.usuario = usuario
        self.data = data
        self.accompanist = accompanist
        self.vehicle = vehicle
        self.hotel = hotel

    def __repr__(self):
        return f'{self.client_name} client'


class VehicleSchema(ma.Schema):
    id_vehicle = fields.Integer()
    name = fields.String()
    mark = fields.String()
    oil = fields.String()
    model = fields.String()
    patent = fields.Integer()
    color = fields.String()
    observation = fields.String()


class VehicleModel(ModelBase, db.Model):
    __tablename__ = 'vehicle'

    id_vehicle = db.Column('id_vehicle', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String(20), default='Unauthorized')
    mark = db.Column('mark', db.String(15), default='Unauthorized')
    oil = db.Column('oil', db.String(40), default='Unauthorized')
    model = db.Column('model', db.String(40), default='Unauthorized')
    patent = db.Column('patent', db.Integer, default='Unauthorized')
    color = db.Column('color', db.String(40), default='Unauthorized')
    observation = db.Column('observation', db.String(200), default='Unauthorized')

    def __init__(self, name, mark, oil, model, patent, color,
                 observation):
        self.name = name
        self.mark = mark
        self.oil = oil
        self.model = model
        self.patent = patent
        self.color = color
        self.observation = observation

    def __repr__(self):
        return f'{self.name} vehicle'


class RoomsSchema(ma.Schema):
    id_rooms = fields.Integer()
    name = fields.String()
    beds = fields.Integer()
    price = fields.Integer()


class RoomsModel(ModelBase, db.Model):
    __tablename__ = 'rooms'

    id_rooms = db.Column('id_rooms', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String(40), default='Unauthorized')
    beds = db.Column('beds', db.Integer, default='Unauthorized')
    price = db.Column('price', db.Integer, default='Unauthorized')

    def __init__(self, name, beds, price):
        self.name = name
        self.beds = beds
        self.price = price

    def __repr__(self):
        return f'{self.rooms_name} rooms'


class LunchSchema(ma.Schema):
    id_lunch = fields.Integer()
    name = fields.String()
    price = fields.Integer()


class LunchModel(ModelBase, db.Model):
    __tablename__ = 'lunch'

    id_lunch = db.Column('id_lunch', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String(40), default='Unauthorized')
    price = db.Column('price', db.Integer, default='Unauthorized')

    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        return f'{self.name} lunch'


class HotelSchema(ma.Schema):
    id_hotel = fields.Integer()
    name = fields.String()
    address = fields.String()
    quantity_rooms = fields.Integer()
    rooms = fields.Integer()
    lunch = fields.Integer()


class HotelModel(ModelBase, db.Model):
    __tablename__ = 'hotel'

    id_hotel = db.Column('id_hotel', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String(60), default='Unauthorized')
    address = db.Column('address', db.String(60), default='Unauthorized')
    quantity_rooms = db.Column('quantity_rooms', db.Integer, default='Unauthorized')
    rooms = db.Column(db.Integer, db.ForeignKey('rooms.id_rooms', ondelete='CASCADE'), nullable=False)
    rooms_id = db.relationship('RoomsModel')
    lunch = db.Column(db.Integer, db.ForeignKey('lunch.id_lunch', ondelete='CASCADE'), nullable=False)
    lunch_id = db.relationship('LunchModel')

    def __init__(self, rooms, lunch, address, quantity_rooms, name):
        self.rooms = rooms
        self.name = name
        self.lunch = lunch
        self.address = address
        self.quantity_rooms = quantity_rooms

    def __repr__(self):
        return f'{self.name} name'


class AccompanistSchema(ma.Schema):
    id_accompanist = fields.Integer()
    data = fields.Integer()


class AccompanistModel(ModelBase, db.Model):
    __tablename__ = 'accompanist'

    id_accompanist = db.Column('id_accompanist', db.Integer, autoincrement=True, primary_key=True)
    data = db.Column(db.Integer, db.ForeignKey('data.id_data', ondelete='CASCADE'), nullable=False)
    data_id = db.relationship('DataModel')

    def __init__(self, data):
        self.data = data

    def __repr__(self):
        return f'{self.id_accompanist} accompanist'

# puta la wea
