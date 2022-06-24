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
    NationalitySchema,
    NationalityModel,
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
    AccompanistModel
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
        email = ClientModel.query.filter_by(email=email).first()
        return email is not None

    def is_valid_token_data(self, email):
        account = ClientModel.query.filter_by(email=email).first()
        return account is not None

    def account_has_userdata(self, email):
        account = ClientModel.query.filter_by(email=email).first()
        user = DataModel.query.filter_by(id_data=account.id_client).first()
        return user is not None


class UserSession(BaseView):

    def __init__(self):
        super(UserSession, self).__init__()
        UserSession.ClientSchema = ClientSchema()

    def get(self, **kwargs):
        """
        Method to validate email
        """
        token = request.args.get('token', '')
        if token:
            token_data = decode_token(token)
            user = ClientModel.query.filter_by(email=token_data['email']).first()
            if user:
                user.validated = True
                errors = user.save()
                if not errors:
                    return response(200, data={'Email ': token_data['email']})
        return response(400)

    def post(self):
        """
        Method to register a new user
        """
        json_data, error = get_data(request)
        if self.exists_account(email=json_data['email']):
            return response(409, 'Email ya registrado')
        if not error:
            try:
                account_data = self.ClientSchema.load({'email': json_data['email'],
                                                       'password': hashed_password(json_data['password']),
                                                       'role_id': 4,
                                                       })
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            new_account = ClientModel(**account_data)
            error = new_account.save()
            if not error:
                token = gen_token({'email': json_data['email'], 'username': json_data['username']})
                # msg = message_register.format(json_data['username'], token) send email, in case it is required
                # sent = send_email(json_data['email'], msg)
                return response(200, data={'id': new_account.id})

        print('error', error)
        return response(400, msg="Error en backend")

    def put(self):

        """
        Method to allow change password
        """

        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = ClientModel.query.filter_by(email=json_data['email']).first()
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            if account is not None:
                account.password = hashed_password(json_data['password'])
            error = account.save()
            if not error:
                return response(200, data={'id': account.id})

        return response(400, msg="Error en backend")

    def patch(self):
        json_data, error = get_data(request)
        if not error:
            try:
                account = ClientModel.query.filter_by(email=json_data['email']).first()
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
            account = ClientModel.query.filter_by(email=email).first()
            user = DataModel.query.filter_by(account_id=account.id).first()
            if user is not None:
                return response(200, data={'user': {'id_data': user.id_data,
                                                    'card_id': user.card_id,
                                                    'client_rol': user.client_rol,
                                                    'gender': user.gender,
                                                    'pathologies': user.pathologies,
                                                    'nationality': user.nationality,
                                                    'born': user.born,
                                                    'phone': str(user.phone),
                                                    'observ_lunch': user.observ_lunch,
                                                    'first_name': user.first_name.title(),
                                                    'lastname': user.lastname.title()}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = ClientModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    user_data = self.user_schema.load({'id_data': json_data['id_data'],
                                                       'card_id': json_data['idGenre'],
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
                new_user.account_id = account.id
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
                account = ClientModel.query.filter_by(email=json_data['email']).first()
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


class GenderView(BaseView):

    def __init__(self):
        super(GenderView, self).__init__()
        self.user_schema = GenderSchema()

    def get(self):
        email = request.args.get('email', None)
        if email is not None:
            account = ClientModel.query.filter_by(email=email).first()
            user = GenderModel.query.filter_by(account_id=account.id).first()
            if user is not None:
                return response(200, data={'user': {'id_gender': user.id_gender,
                                                    'name': user.name}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = ClientModel.query.filter_by(email=json_data['email']).first()
            if account is not None:
                try:
                    user_data = self.user_schema.load({'id_gender': json_data['id_gender'],
                                                       'name': json_data['name']})

                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_user = DataModel(**user_data)
                new_user.account_id = account.id
                error = new_user.save()
                if not error:
                    return response(200, data={'id': new_user.id})
                print(error)
                return error
            else:
                print('user don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

