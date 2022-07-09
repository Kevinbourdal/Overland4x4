## Correr en la maquina donde se ejecutara el docker
# ========================================================================================

## MySQL
# ===============================================================
# download mysql:8
docker pull mysql:8

# Creamos un container que ejecutara mysql
docker run -d --name=mysql-overland -e MYSQL_ROOT_PASSWORD=pepeloquito! -v $PWD/db:/docker-entrypoint-initdb.d/:ro mysql:8

### Get mysql docker ip address
docker inspect mysql-overland | grep "IPAddress"
# Con esta IP, el puerto: 3306 y el nombre de la base de datos ("Overland4x4") te podes conectar
# seteando en src/config.py los campos


############
#insert into role (id, role_name) values (1, 'admin');
#insert into role (id, role_name) values (2, 'fullview');
#insert into role (id, role_name) values (3, 'commonuser');
#
#insert into account (id, role_id, username, email, password) values (1, 1, 'admin', 'admin@overland.com', 'overland1');
#insert into account (id, role_id, username, email, password) values (2, 3, 'usuario', 'usuario@overland.com', 'overland2');
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