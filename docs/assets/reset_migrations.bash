################################################################
################################################################
##                                                            ##
##                  MARIADB                                   ##
##                                                            ##
################################################################
################################################################

# --- Borrar manualmente la carpeta migrations
# pipenv run init
# mysql -u root -p (Abre MariaDB)
# Contraseña
# DROP DATABASE example;
# CREATE DATABASE example;
# ctrl + c
# pipenv run migrate
# pipenv run upgrade
# pipenv run start