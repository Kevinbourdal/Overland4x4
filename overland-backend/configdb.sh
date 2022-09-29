## Correr en la maquina donde se ejecutara el docker
# ========================================================================================

## MySQL
# ===============================================================
# download mysql:8
docker pull mysql:8

# Creamos un container que ejecutara mysql
docker run -d -p 127.0.0.1:3306:3306 --name=mysql-overland -e MYSQL_ROOT_PASSWORD=pepeloquito! mysql:8


### Get mysql docker ip address
docker inspect mysql-overland | grep "IPAddress"
# Con esta IP, el puerto: 3306 y el nombre de la base de datos ("Overland4x4") te podes conectar
# seteando en src/config.py los campos


############
#insert into role (id, role_name) values (1, 'fullAdmin');
#insert into role (id, role_name) values (2, 'mediumAdmin');
#insert into role (id, role_name) values (3, 'beginerAdmin');
# #insert into role (id, role_name) values (4, 'clients');
#
#insert into usuario (id_usuario, email, password, role_id) values (0,'cortadoverde@siemrpe.com', 'cortadoVerde1',4);
#insert into client (id_client, usuario_id, data, accompanist, vehicle, hotel) values (0, 4, 0, 0, 0, 0, 0);
############


## start docker again (si apagaste la compu)
#docker container start mysql-overland
#docker exec -it mysql-overland bash (para entrar a la base de datos)
#mysql -u root -p (esto pide la contraseña)

## Instalar driver para conectarse a mysql desde python
# ===============================================================
sudo apt-get install default-libmysqlclient-dev python3-dev -y


## Sincronizar tablas desde python a mysql
# ===============================================================
# ejecutar desde la carpeta Overland4x4/overland-backend/
./migrate.sh



## Ejecutar la api
# ===============================================================
# Activamos el virtualenv
source venv/bin/activate

cd src/
python run.py