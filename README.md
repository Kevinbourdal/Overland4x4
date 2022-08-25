# Overland4x4
- # BackEnd
Pag 4x4 Overland Travel

##### Descargar e Instalar docker desktop en windows [aca](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

```bash
"Docker Desktop Installer.exe" install
```
---
##### Para crear un entorno virtual:

- instalar:
```bash
python install virtualenv 
```
- crear el entorno con python 3
```bash
python -m virtualenv venv
```
- activar e instalar librerias en windows
```bash
activate
```
- instalar las librerias necesarias
```bash
pip install -r requirements.txt
```

- Correr la api
```bash
python app.py
```
- O crear una imagen de docker y crear un contenedor con la api dentro 
- creamos la imagen
```bash
docker build -t overland/webapp
```
- y la ejecutamos con este comando 
```bash
 docker run -i -d -p 5000:5000 overland/webapp
```

- en linux
En el archivo **configdb.sh** estan las instrucciones para ejecutar
 el backend con docker y con virtualenv  

--- 
##### Instalar docker
```bash
sudo apt install docker.io -y
```
-  Y luego seguir los 3 primeros pasos [aca](https://docs.docker.com/engine/install/linux-postinstall/)


---
##### Para crear un entorno virtual:

- instalar:
```bash
sudo apt install virtualenv -y
```
- crear el entorno con python 3
```bash
virtualenv -p python3 venv
```
- activar e instalar librerias
```bash
. venv/bin/activate
pip install -r requirements.txt
``` 