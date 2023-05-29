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


################################################################
################################################################
##                                                            ##
##                  POSTGRES                                  ##
##                                                            ##
################################################################
################################################################

# --- Borrar manualmente la carpeta migrations
# pipenv run init 
# psql -U postgres -c 'DROP DATABASE example;' 
# psql -U postgres -c 'CREATE DATABASE example;' 
# psql -U postgres -c 'CREATE EXTENSION unaccent;' -d example
# pipenv run migrate
# pipenv run upgrade
# pipenv run start