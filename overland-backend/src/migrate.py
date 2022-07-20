from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app
from models import db, RoleSchema, RoleModel, DataSchema, DataModel, GenderSchema, GenderModel, PathologiesSchema, \
    PathologiesModel, ClientSchema, ClientModel, VehicleSchema, VehicleModel, \
    RoomsSchema, RoomsModel, LunchSchema, LunchModel, HotelSchema, HotelModel, AccompanistSchema, AccompanistModel

with app.app_context():
    db.create_all()
    # user = db.User(...)
    # db.session.add(user)
    # db.session.commit()
    migrate = Migrate(app, db)
    manager = Manager(app)
    manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
