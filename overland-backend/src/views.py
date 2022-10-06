import random
from datetime import datetime as dt, date, timedelta
import marshmallow
from flask import request
from flask_restful import Resource
# from message import message_register, message_contact, message_recovery_password
from marshmallow.exceptions import ValidationError

from models import (
    RoleSchema,
    RoleModel,
    DataSchema,
    DataModel,
    GenderSchema,
    GenderModel,
    PathologiesSchema,
    PathologiesModel,
    ClientSchema,
    ClientModel,
    VehicleSchema,
    VehicleModel,
    RoomsSchema,
    RoomsModel,
    LunchSchema,
    LunchModel,
    HotelSchema,
    HotelModel,
    AccompanistSchema,
    AccompanistModel,
    UsuarioModel,
    UsuarioSchema
)

from utils import (
    response,
    get_data,
    gen_token,
    validate_dates,
    decode_token,
    validate_token,
    validate_json_payload,
    send_email,
    check_minuto_ley,
    hashed_password,
    comparate_hashed,
    log,
)


class BaseView(Resource):
    """
    Class base with methods common in other views
    """

    def __init__(self):
        super(BaseView, self).__init__()

    def get(self, **kwargs):
        return response(401)

    def post(self, **kwargs):
        return response(401)

    def put(self, **kwargs):
        return response(401)

    def delete(self, **kwargs):
        return response(401)

    def patch(self, **kwargs):
        return response(401)

    def exists_account(self, email=None):
        email = UsuarioModel.query.filter_by(email=email).first()
        return email is not None

    def is_valid_token_data(self, email):
        account = UsuarioModel.query.filter_by(email=email).first()
        return account is not None

    def account_has_userdata(self, email):
        account = UsuarioModel.query.filter_by(email=email).first()
        user = DataModel.query.filter_by(id_data=account.id_client).first()
        return user is not None


class UserSession(BaseView):

    def __init__(self):
        super(UserSession, self).__init__()
        UserSession.UsuarioSchema = UsuarioSchema()

    def get(self, **kwargs):
        """
        Method to validate email
        """
        token = request.args.get('token', '')
        if token:
            token_data = decode_token(token)
            user = UsuarioModel.query.filter_by(email=token_data['email']).first()
            if user:
                user.validated = True
                errors = user.save()
                if not errors:
                    return response(200, data={'Email ': token_data['email']})
        return response(400)

    def post(self):
        """
        Method to register a new user
        crear un hash id para id data random
        """
        json_data, error = get_data(request)
        if self.exists_account(email=json_data['email']):
            log('409: Email ya registrado', 'info')
            return response(409, 'Email ya registrado')
        if not error:
            try:
                account_data = self.UsuarioSchema.load({'email': json_data['email'],
                                                        'password': hashed_password(json_data['password'])})
            except marshmallow.exceptions.ValidationError as errors:
                log('400 : ' + errors, 'error')
                return response(400, str(errors))

            new_account = UsuarioModel(**account_data)
            error = new_account.save()
            if not error:
                token = gen_token({'email': json_data['email'], 'username': json_data['username']})
                # msg = message_register.format(json_data['username'], token) send email, in case it is required
                # sent = send_email(json_data['email'], msg)
                log(error + 'Creat account' + new_account.email, 'info')
                return response(200, data={'id': new_account.id, 'email': new_account.email})

        log(error, 'error')
        return response(400, msg="Error en backend")

    def put(self):

        """
        Method to allow change password
        """

        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            log('401 : Wrong token', 'error')
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            except marshmallow.exceptions.ValidationError as errors:
                log('400 : ' + errors, 'error')
                return response(400, str(errors))

            if account is not None:
                account.password = hashed_password(json_data['password'])
            error = account.save()
            if not error:
                log('changue pass succeful', 'info')
                return response(200, data={'id': account.id})
        log(error, 'error')
        return response(400, msg="Error en backend")

    def patch(self):
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            if account is not None:
                password = gen_token({'now': dt.now().second})[:16]
                account.password = hashed_password(password)

                # msg = message_recovery_password.format(password)
                # send_email(json_data['email'], msg)

                error = account.save()
                if not error:
                    return response(200, data={'id': account.id})

        return response(400, msg="Error en backend")


class DataView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(DataView, self).__init__()
        self.user_schema = DataSchema()

    def get(self):
        email = request.args.get('email', None)
        if email is not None:
            account = UsuarioModel.query.filter_by(email=email).first()
            user = DataModel.query.filter_by(id_data=account.data).first()
            if user is not None:
                return response(200, data={'user': {'id_data': user.id_data,
                                                    'card_id': str(user.card_id),
                                                    'client_rol': user.client_rol,
                                                    'gender': user.gender.name,
                                                    'pathologies': user.pathologies.name,
                                                    'nationality': user.nationality.name,
                                                    'born': user.born,
                                                    'phone': str(user.phone),
                                                    'observ_lunch': user.observ_lunch,
                                                    'first_name': user.first_name,
                                                    'lastname': user.lastname}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    user_data = self.user_schema.load({'id_data': json_data['id_data'],
                                                       'card_id': json_data['card_id'],
                                                       'client_rol': json_data['client_rol'],
                                                       'gender': json_data['gender'],
                                                       'pathologies': json_data['pathologies'],
                                                       'nationality': json_data['nationality'],
                                                       'phone': json_data['phone'],
                                                       'born': json_data['born'],
                                                       'observ_lunch': json_data['observ_lunch'],
                                                       'first_name': json_data['first_name'],
                                                       'last_name': json_data['last_name']})
                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_user = DataModel(**user_data)
                # new_user.id_ = account.id / hacer un hash apenas se registra para que sea id data
                error = new_user.save()
                if not error:
                    return response(200, data={'id': new_user.id})
                print(error)
                return error
            else:
                print('user don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                user = DataModel.query.filter_by(account_id=account.id).first()
                user_data = self.user_schema.load({'id_data': json_data['id_data'],
                                                   'card_id': json_data['card_id'],
                                                   'client_rol': json_data['client_rol'],
                                                   'gender': json_data['gender'],
                                                   'pathologies': json_data['pathologies'],
                                                   'nationality': json_data['nationality'],
                                                   'phone': json_data['phone'],
                                                   'born': json_data['born'],
                                                   'observ_lunch': json_data['observ_lunch'],
                                                   'first_name': json_data['first_name'],
                                                   'last_name': json_data['last_name']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            user.id_data = user_data['id_data']
            user.card_id = user_data['card_id']
            user.client_rol = user_data['client_rol']
            user.gender = user_data['gender']
            user.pathologies = user_data['pathologies']
            user.nationality = user_data['nationality']
            user.phone = user_data['phone']
            user.born = user_data['born']
            user.observ_lunch = user_data['observ_lunch']
            user.first_name = user_data['first_name']
            user.last_name = user_data['last_name']

            error = user.save()
            if not error:
                return response(200, data={'id': user.id})

        return response(400, msg="Error en backend")


class UsuarioView(BaseView):

    def __init__(self):
        super(UsuarioView, self).__init__()
        self.usuario_schema = UsuarioSchema()

    def get(self):
        usuario = UsuarioModel.query
        if usuario is not None:
            return response(200, data={'usuario': {'id_usuario': usuario.id_usuario,
                                                   'mail': usuario.mail,
                                                   'password': usuario.password}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    usuario_data = self.usuario_schema.load({'mail': json_data['mail'],
                                                             'password': json_data['password']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_usuario = UsuarioModel(**usuario_data)
                error = new_usuario.save()
                if not error:
                    return response(200, data={'id': new_usuario.id_usuario})
                print(error)
                return error
            else:
                print('usuario don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                usuario = UsuarioModel.query.filter_by(account_id=account.id).first()
                usuario_data = self.accompanist_schema.load({'id_usuario': json_data['id_usuario'],
                                                             'email': json_data['email'],
                                                             'password': json_data['password']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            usuario.id_usuario = usuario_data['id_usuario']
            usuario.client = usuario_data['mail']
            usuario.data = usuario_data['password']

            error = usuario.save()
            if not error:
                return response(200, data={'id': usuario.id})

        return response(400, msg="Error en backend")


class ClientView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(ClientView, self).__init__()
        self.user_schema = ClientSchema()

    def get(self):
        email = request.args.get('email', None)
        if email is not None:
            account = UsuarioModel.query.filter_by(email=email).first()
            client = DataModel.query.filter_by(id_data=account.data).first()
            if client is not None:
                return response(200, data={'client': {'id_client': client.id_client,
                                                      'data_id': client.data_id,
                                                      'usuario': client.usuario,
                                                      'accompanist': client.accompanist,
                                                      'vehicle': client.vehicle,
                                                      'role': client.role,
                                                      'hotel': client.hotel}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    client_data = self.client_schema.load({'id_client': json_data['id_client'],
                                                           'data_id': json_data['data_id'],
                                                           'accompanist': json_data['accompanist'],
                                                           'usuario': json_data['usuario'],
                                                           'vehicle': json_data['vehicle'],
                                                           'role': json_data['role'],
                                                           'hotel': json_data['hotel']})
                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_client = ClientModel(**client_data)
                # new_user.id_ = account.id / hacer un hash apenas se registra para que sea id data
                error = new_client.save()
                if not error:
                    return response(200, data={'id': new_client.id})
                print(error)
                return error
            else:
                print('client don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                client = DataModel.query.filter_by(account_id=account.id).first()
                client_data = self.user_schema.load({'id_client': json_data['id_client'],
                                                     'data_id': json_data['data_id'],
                                                     'accompanist': json_data['accompanist'],
                                                     'usuario': json_data['usuario'],
                                                     'vehicle': json_data['vehicle'],
                                                     'role': json_data['role'],
                                                     'hotel': json_data['hotel']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            client.id_client = client_data['id_client']
            client.data_id = client_data['data_id']
            client.accompanist = client_data['accompanist']
            client.usuario = client_data['usuario']
            client.vehicle = client_data['vehicle']
            client.role = client_data['role']
            client.hotel = client_data['hotel']

            error = client.save()
            if not error:
                return response(200, data={'id': client.id})

        return response(400, msg="Error en backend")


class GenderView(BaseView):

    def __init__(self):
        super(GenderView, self).__init__()
        self.gender_schema = GenderSchema()

    def get(self):
        gender = GenderModel.query
        if gender is not None:
            return response(200, data={'gender': {'id_gender': gender.id_gender,
                                                  'name': gender.name}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    gender_data = self.gender_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_gender = GenderModel(**gender_data)
                error = new_gender.save()
                if not error:
                    return response(200, data={'id': new_gender.id_gender})
                print(error)
                return error
            else:
                print('gender don\'t exists')
        print(error)
        return response(400, msg="Error en backend")


class PathologiesView(BaseView):

    def __init__(self):
        super(PathologiesView, self).__init__()
        self.pathologies_schema = PathologiesSchema()

    def get(self):
        pathologies = PathologiesModel.query
        if pathologies is not None:
            return response(200, data={'pathologies': {'id_pathologies': pathologies.id_pathologies,
                                                       'name': pathologies.name}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    pathologies_data = self.pathologies_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_pathologies = PathologiesModel(**pathologies_data)
                error = new_pathologies.save()
                if not error:
                    return response(200, data={'id': new_pathologies.id_pathologies})
                print(error)
                return error
            else:
                print('pathologies don\'t exists')
        print(error)
        return response(400, msg="Error en backend")


class AccompanistView(BaseView):

    def __init__(self):
        super(AccompanistView, self).__init__()
        self.accompanist_schema = AccompanistSchema()

    def get(self):
        accompanist = AccompanistModel.query
        if accompanist is not None:
            return response(200, data={'accompanist': {'id_accompanist': accompanist.id_accompanist,
                                                       'client': accompanist.id_client,
                                                       'data': accompanist.id_data}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    accompanist_data = self.accompanist_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_accompanist = AccompanistModel(**accompanist_data)
                error = new_accompanist.save()
                if not error:
                    return response(200, data={'id': new_accompanist.id_accompanist})
                print(error)
                return error
            else:
                print('accompanist don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                accompanist = AccompanistModel.query.filter_by(account_id=account.id).first()
                accompanist_data = self.accompanist_schema.load({'id_accompanist': json_data['id_accompanist'],
                                                                 'client': json_data['client'],
                                                                 'data': json_data['data']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            accompanist.id_accompanist = accompanist_data['id_accompanist']
            accompanist.client = accompanist_data['client']
            accompanist.data = accompanist_data['data']

            error = accompanist.save()
            if not error:
                return response(200, data={'id': accompanist.id})

        return response(400, msg="Error en backend")

    def delete(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            accompanist = AccompanistModel.query.filter_by(id=json_data['id_accompanist']).first()
            if accompanist is not None:
                result = accompanist.delete_()
                if result is None:
                    return response(200)
        return response(400)


class RoleView(BaseView):

    def __init__(self):
        super(RoleView, self).__init__()
        self.role_schema = RoleSchema()

    def get(self):
        role = RoleModel.query
        if role is not None:
            return response(200, data={'role': {'id': role.id,
                                                'role_name': role.role_name}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    role_data = self.role_schema.load({'role_name': json_data['role_name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_role = RoleModel(**role_data)
                error = new_role.save()
                if not error:
                    return response(200, data={'id': new_role.id})
                print(error)
                return error
            else:
                print('role don\'t exists')
        print(error)
        return response(400, msg="Error en backend")


class LunchView(BaseView):

    def __init__(self):
        super(LunchView, self).__init__()
        self.lunch_schema = LunchSchema()

    def get(self):
        lunch = LunchModel.query
        if lunch is not None:
            return response(200, data={'lunch': {'id_lunch': lunch.id_lunch,
                                                 'name': lunch.name,
                                                 'price': lunch.price}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    lunch_data = self.lunch_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_lunch = LunchModel(**lunch_data)
                error = new_lunch.save()
                if not error:
                    return response(200, data={'id': new_lunch.id})
                print(error)
                return error
            else:
                print('lunch don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                lunch = LunchModel.query.filter_by(account_id=account.id).first()
                lunch_data = self.lunch_schema.load({'id_lunch': json_data['id_lunch'],
                                                     'name': json_data['name'],
                                                     'price': json_data['price']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            lunch.id_lunch = lunch_data['id_lunch']
            lunch.name = lunch_data['name']
            lunch.price = lunch_data['price']

            error = lunch.save()
            if not error:
                return response(200, data={'id': lunch.id})

        return response(400, msg="Error en backend")

    def delete(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            lunch = LunchModel.query.filter_by(id=json_data['id_lunch']).first()
            if lunch is not None:
                result = lunch.delete_()
                if result is None:
                    return response(200)
        return response(400)


class RoomsView(BaseView):

    def __init__(self):
        super(RoomsView, self).__init__()
        self.rooms_schema = RoomsSchema()

    def get(self):
        rooms = RoomsModel.query
        if rooms is not None:
            return response(200, data={'rooms': {'id_rooms': rooms.id_rooms,
                                                 'name': rooms.name,
                                                 'beds': rooms.beds,
                                                 'price': rooms.price}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    rooms_data = self.rooms_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_rooms = RoomsModel(**rooms_data)
                error = new_rooms.save()
                if not error:
                    return response(200, data={'id': new_rooms.id})
                print(error)
                return error
            else:
                print('rooms don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                rooms = RoomsModel.query.filter_by(account_id=account.id).first()
                rooms_data = self.rooms_schema.load({'id_rooms': json_data['id_rooms'],
                                                     'name': json_data['name'],
                                                     'beds': json_data['beds'],
                                                     'price': json_data['price']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            rooms.id_rooms = rooms_data['id_rooms']
            rooms.name = rooms_data['name']
            rooms.beds = rooms_data['beds']
            rooms.price = rooms_data['price']

            error = rooms.save()
            if not error:
                return response(200, data={'id': rooms.id})

        return response(400, msg="Error en backend")

    def delete(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            rooms = RoomsModel.query.filter_by(id=json_data['id_rooms']).first()
            if rooms is not None:
                result = rooms.delete_()
                if result is None:
                    return response(200)
        return response(400)


class HotelView(BaseView):

    def __init__(self):
        super(HotelView, self).__init__()
        self.hotel_schema = HotelSchema()

    def get(self):
        hotel = HotelModel.query
        if hotel is not None:
            return response(200, data={'hotel': {'id_hotel': hotel.id_hotel,
                                                 'rooms': hotel.rooms,
                                                 'name': hotel.name,
                                                 'lunch': hotel.lunch,
                                                 'address': hotel.address,
                                                 'quantity_rooms': hotel.quantity_rooms}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    hotel_data = self.hotel_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_hotel = HotelModel(**hotel_data)
                error = new_hotel.save()
                if not error:
                    return response(200, data={'id': new_hotel.id})
                print(error)
                return error
            else:
                print('hotel don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                hotel = HotelModel.query.filter_by(account_id=account.id).first()
                hotel_data = self.hotel_schema.load({'id_hotel': json_data['id_hotel'],
                                                     'rooms': json_data['rooms'],
                                                     'lunch': json_data['lunch'],
                                                     'name': json_data['name'],
                                                     'address': json_data['address'],
                                                     'quantity_rooms': json_data['quantity_rooms']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            hotel.id_hotel = hotel_data['id_hotel']
            hotel.rooms = hotel_data['rooms']
            hotel.name = hotel_data['name']
            hotel.lunch = hotel_data['lunch']
            hotel.address = hotel_data['address']
            hotel.quantity_rooms = hotel_data['quantity_rooms ']

            error = hotel.save()
            if not error:
                return response(200, data={'id': hotel.id})

        return response(400, msg="Error en backend")

    def delete(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            hotel = HotelModel.query.filter_by(id=json_data['id_hotel']).first()
            if hotel is not None:
                result = hotel.delete_()
                if result is None:
                    return response(200)
        return response(400)


class VehicleView(BaseView):

    def __init__(self):
        super(VehicleView, self).__init__()
        self.vehicle_schema = VehicleSchema()

    def get(self):
        vehicle = VehicleModel.query
        if vehicle is not None:
            return response(200, data={'vehicle': {'id_vehicle': vehicle.id_vehicle,
                                                   'name': vehicle.name,
                                                   'mark': vehicle.mark,
                                                   'oil': vehicle.oil,
                                                   'model': vehicle.model,
                                                   'patent': vehicle.patent,
                                                   'color': vehicle.color,
                                                   'observation': vehicle.observation}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = UsuarioModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    vehicle_data = self.vehicle_schema.load({'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_vehicle = VehicleModel(**vehicle_data)
                error = new_vehicle.save()
                if not error:
                    return response(200, data={'id': new_vehicle.id})
                print(error)
                return error
            else:
                print('vehicle don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = UsuarioModel.query.filter_by(email=json_data['email']).first()
                vehicle = VehicleModel.query.filter_by(account_id=account.id).first()
                vehicle_data = self.vehicle_schema.load({'id_vehicle': json_data['id_vehicle'],
                                                         'name': json_data['name'],
                                                         'mark': json_data['mark'],
                                                         'oil': json_data['oil'],
                                                         'model': json_data['model'],
                                                         'patent': json_data['patent'],
                                                         'color': json_data['color'],
                                                         'observation': json_data['observation']})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            vehicle.id_vehicle = vehicle_data['id_vehicle']
            vehicle.name = vehicle_data['name']
            vehicle.mark = vehicle_data['mark']
            vehicle.oil = vehicle_data['oil']
            vehicle.model = vehicle_data['model']
            vehicle.patent = vehicle_data['patent']
            vehicle.color = vehicle_data['color']
            vehicle.observation = vehicle_data['observation']

            error = vehicle.save()
            if not error:
                return response(200, data={'id': vehicle.id})

        return response(400, msg="Error en backend")

    def delete(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            vehicle = VehicleModel.query.filter_by(id=json_data['id_vehicle']).first()
            if vehicle is not None:
                result = vehicle.delete_()
                if result is None:
                    return response(200)
        return response(400)
