from views import (
    DataView,
    GenderView,
    PathologiesView,
    AccompanistView,
    RoleView,
    LunchView,
    RoomsView,
    HotelView,
    VehicleView,
    ClientView,
)

# list with each access point in dict format
urls = [
    {
        'resource': ClientView,
        'path': '/client',
        'endpoint': 'client',
    },
    {
        'resource': DataView,
        'path': '/mi_perfil',
        'endpoint': 'mi_perfil',
    },
    {
        'resource': GenderView,
        'path': '/genders',
        'endpoint': 'genders',
    },
    {
        'resource': PathologiesView,
        'path': '/pathologies',
        'endpoint': ' pathologies',
    },
    {
        'resource': AccompanistView,
        'path': '/accompanist',
        'endpoint': 'accompanist',
    },
    {
        'resource': RoleView,
        'path': '/roles',
        'endpoint': 'roles',
    },
    {
        'resource': LunchView,
        'path': '/food',
        'endpoint': 'food',
    },
    {
        'resource': RoomsView,
        'path': '/rooms',
        'endpoint': 'rooms',
    },
    {
        'resource': HotelView,
        'path': '/hospedajes',
        'endpoint': 'hospedajes',
    },
    {
        'resource': VehicleView,
        'path': '/mis_vehicle',
        'endpoint': 'mis_vehicle',
    },
]
