import random
from datetime import datetime as dt, date, timedelta
import marshmallow
from flask import request
from flask_restful import Resource
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
