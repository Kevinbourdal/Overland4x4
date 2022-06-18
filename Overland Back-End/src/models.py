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


class RoleSchema(ma.Schema):
    id = fields.Integer()
    role_name = fields.Integer()


class RoleModel(ModelBase, db.Model):
    __tablename__ = 'role'

    PERMISION = {'fullAdmin': 1,
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


class DataSchema(ma.Schema):
    id_data = fields.Integer()
    id_client_rol = fields.Integer()
    id_gender = fields.Integer()
    id_pathologies = fields.Integer()
    id_nationality = fields.Integer()
    phone = fields.Integer(required=True)
    born = fields.Date(required=True, format='%Y-%m-%d')
    password = fields.String(required=True)
    email = fields.String(required=True)
    observ_lunch = fields.String()
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    card_id = fields.Integer(required=True)


class DataModel(ModelBase, db.Model):
    __tablename__ = 'data'

    id_data = db.Column('id_data', db.Integer, autoincrement=True, primary_key=True)
    card_id = db.Column('card_id', db.Integer, unique=False, nullable=False, primary_key=True)
    id_client_rol = db.Column('id_client_rol', db.ForeignKey('client.id_rol', ondelete='CASCADE'), nullable=False)
    id_gender = db.Column('id_gender', db.ForeignKey('client.id_rol', ondelete='CASCADE'), nullable=False)
    id_pathologies = db.Column('id_pathologies', db.ForeignKey('client.id_rol', ondelete='CASCADE'), nullable=False)
    id_nationality = db.Column('id_nationality', db.ForeignKey('client.id_rol', ondelete='CASCADE'), nullable=False)
    phone = db.Column('phone', db.Integer, unique=False, nullable=False)
    born = db.Column('born', db.Date, unique=False, nullable=False)
    password = db.Column('password', db.String(30), unique=False, nullable=False)
    email = db.Column('email', db.String(40), unique=False, nullable=False)
    observ_lunch = db.Column('observ_lunch', db.String(255), unique=False, nullable=False)
    first_name = db.Column('first_name', db.String(30), unique=False, nullable=False)
    last_name = db.Column('last_name', db.String(30), unique=False, nullable=False)

    def __init__(self, id_client_rol, id_gender, id_pathologies, id_nationality, phone, born, password, email,
                 observ_lunch, first_name, last_name, card_id):
        self.id_client_rol = id_client_rol
        self.id_gender = id_gender
        self.id_pathologies = id_pathologies
        self.id_nationality = id_nationality
        self.phone = phone
        self.born = born
        self.email = email
        self.password = password
        self.observ_lunch = observ_lunch
        self.first_name = first_name
        self.last_name = last_name
        self.card_id = card_id

    def __repr__(self):
        return f'Id : {self.id_data} Document : {self.card_id} Name : {self.first_name}'


class GenreSchema(ma.Schema):
    id_genre = fields.Integer()
    genre_name = fields.String()


class GenreModel(ModelBase, db.Model):
    __tablename__ = 'genre'

    id_genre = db.Column('id_genre', db.Integer, autoincrement=True, primary_key=True)
    genre_name = db.Column('genre_name', db.String(15), default='Unauthorized')

    def __init__(self, genre_name):
        self.genre_name = genre_name

    def __repr__(self):
        return f'{self.genre_name} name'


class NationalitySchema(ma.Schema):
    id_nationality = fields.Integer()
    nationality_name = fields.String()


class NationalityModel(ModelBase, db.Model):
    __tablename__ = 'nationality'

    id_nationality = db.Column('id_nationality ', db.Integer, autoincrement=True, primary_key=True)
    nationality_name = db.Column('nationality_name', db.String(40), default='Unauthorized')

    def __init__(self, nationality_name):
        self.nationality_name = nationality_name

    def __repr__(self):
        return f'{self.nationality_name} nationality'


class PathologiesSchema(ma.Schema):
    id_pathologies = fields.Integer()
    pathologies_name = fields.String()


class PathologiesModel(ModelBase, db.Model):
    __tablename__ = 'pathologies'

    id_pathologies = db.Column('id_pathologies ', db.Integer, autoincrement=True, primary_key=True)
    pathologies_name = db.Column('pathologies_name', db.String(40), default='Unauthorized')

    def __init__(self, pathologies_name):
        self.pathologies_name = pathologies_name

    def __repr__(self):
        return f'{self.pathologies_name} pathologies'


class ClientSchema(ma.Schema):
    id_rol = fields.Integer()
    client_name = fields.String()


class ClientModel(ModelBase, db.Model):
    __tablename__ = 'client'

    id_rol = db.Column('id_rol ', db.Integer, autoincrement=True, primary_key=True)
    client_name = db.Column('client_name', db.String(40), default='Unauthorized')

    def __init__(self, client_name):
        self.client_name = client_name

    def __repr__(self):
        return f'{self.client_name} client'


class VehicleSchema(ma.Schema):
    id_vehicle = fields.Integer()
    vehicle_name = fields.String()
    vehicle_mark = fields.String()
    vehicle_oil = fields.String()
    vehicle_model = fields.Integer()
    vehicle_patent = fields.Integer()
    vehicle_color = fields.String()
    vehicle_observation = fields.String()


class VehicleModel(ModelBase, db.Model):
    __tablename__ = 'vehicle'

    id_vehicle = db.Column('id_vehicle ', db.Integer, autoincrement=True, primary_key=True)
    vehicle_name = db.Column('vehicle_name', db.String(20), default='Unauthorized')
    vehicle_mark = db.Column('vehicle_mark', db.String(15), default='Unauthorized')
    vehicle_oil = db.Column('vehicle_oil', db.String(40), default='Unauthorized')
    vehicle_model = db.Column('vehicle_model', db.Integer, default='Unauthorized')
    vehicle_patent = db.Column('vehicle_patent', db.Integer, default='Unauthorized')
    vehicle_color = db.Column('vehicle_color', db.String(40), default='Unauthorized')
    vehicle_observation = db.Column('vehicle_observation ', db.String(200), default='Unauthorized')

    def __init__(self, vehicle_name, vehicle_mark, vehicle_oil, vehicle_model, vehicle_patent, vehicle_color,
                 vehicle_observation):
        self.vehicle_name = vehicle_name
        self.vehicle_mark = vehicle_mark
        self.vehicle_oil = vehicle_oil
        self.vehicle_model = vehicle_model
        self.vehicle_patent = vehicle_patent
        self.vehicle_color = vehicle_color
        self.vehicle_observation = vehicle_observation

    def __repr__(self):
        return f'{self.vehicle_name} vehicle'


class RoomsSchema(ma.Schema):
    id_rooms = fields.Integer()
    rooms_name = fields.String()
    rooms_beds = fields.Integer()
    rooms_price = fields.Integer()


class RoomsModel(ModelBase, db.Model):
    __tablename__ = 'rooms'

    id_rooms = db.Column('id_rooms ', db.Integer, autoincrement=True, primary_key=True)
    rooms_name = db.Column('client_name', db.String(40), default='Unauthorized')
    rooms_beds = db.Column('rooms_beds', db.Integer, default='Unauthorized')
    rooms_price = db.Column('rooms_price', db.Integer, default='Unauthorized')

    def __init__(self, rooms_name, rooms_beds, rooms_price):
        self.rooms_name = rooms_name
        self.rooms_beds = rooms_beds
        self.rooms_price = rooms_price

    def __repr__(self):
        return f'{self.rooms_name} rooms'


class LunchSchema(ma.Schema):
    id_lunch = fields.Integer()
    lunch_name = fields.String()
    lunch_price = fields.Integer()


class LunchtModel(ModelBase, db.Model):
    __tablename__ = 'lunch'

    id_rol = db.Column('id_rol ', db.Integer, autoincrement=True, primary_key=True)
    lunch_name = db.Column('lunch_name', db.String(40), default='Unauthorized')
    lunch_price = db.Column('lunch_price', db.Integer, default='Unauthorized')

    def __init__(self, lunch_name, lunch_price):
        self.lunch_name = lunch_name
        self.lunch_price = lunch_price

    def __repr__(self):
        return f'{self.lunch_name} lunch'
