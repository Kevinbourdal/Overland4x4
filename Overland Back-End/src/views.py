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


class UserView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(UserView, self).__init__()
        self.user_schema = ClientSchema()

    def get(self):
        email = request.args.get('email', None)
        if email is not None:
            account = ClientModel.query.filter_by(email=email).first()
            user = DataModel.query.filter_by(account_id=account.id).first()
            if user is not None:
                return response(200, data={'user': {'idData': user.idData,
                                                    'idGenre': user.idGenre,
                                                    'idClientRol': user.idClientRol,
                                                    'idPathologies': user.idPathologies,
                                                    'idNationality': user.idNationality,
                                                    'firstname': user.firstname.title(),
                                                    'lastname': user.lastname.title(),
                                                    'password': user.password,
                                                    'dni_type': user.dni_type,
                                                    'dni': user.dni,
                                                    'born': user.born,
                                                    'city': user.city.title(),
                                                    'address': user.address.title(),
                                                    'phone': str(user.phone),
                                                    'obFood': user.obFood,
                                                    'email': account.email}})
        return response(400)


