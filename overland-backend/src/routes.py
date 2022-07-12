from views import (
    DataView,
    NationalityView,
    GenderView,
    PathologiesView,
    AccompanistView,
    RoleView,
    LunchView,
    RoomsView,
    HotelView,
    VehicleView,
)

# list with each access point in dict format
urls = [
    {
        'resource': DataView,
        'path': '/mi_perfil',
        'endpoint': 'mi_perfil',
    },
    {
        'resource': NationalityView,
        'path': '/naionalidad',
        'endpoint': 'naionalidad',
    },
    {
        'resource': GenderView,
        'path': '/generos',
        'endpoint': 'generos',
    },
    {
        'resource': PathologiesView,
        'path': '/patologias',
        'endpoint': 'patologias',
    },
    {
        'resource': AccompanistView,
        'path': '/acompaniantes',
        'endpoint': 'acompaniantes',
    },
    {
        'resource': RoleView,
        'path': '/roles',
        'endpoint': 'roles',
    },
    {
        'resource': LunchView,
        'path': '/comida',
        'endpoint': 'comida',
    },
    {
        'resource': RoomsView,
        'path': '/habitaciones',
        'endpoint': 'habitaciones',
    },
    {
        'resource': HotelView,
        'path': '/hospedajes',
        'endpoint': 'hospedajes',
    },
    {
        'resource': VehicleView,
        'path': '/mis_vehiculos',
        'endpoint': 'mis_vehiculos',
    },

]
