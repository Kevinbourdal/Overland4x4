#cd ../../
source venv/bin/activate
#cd Overland4x4/overland-backend
#activate
cd src/ || exit

# shellcheck disable=SC2126
migrations_exists=$(ls || grep -c "migrations" | wc -l)

if [ "$migrations_exists" == '1' ]; then
  if [ "$1" == "reset" ]; then
    echo "Delete migrations folder"
    yes | while IFS= read -r migrations; do rm -- "$migrations"; done
    python migrate.py db upgrade
  else
    echo "migrations folder already exist. Add reset argument to delete it and make a new."
  fi
else
  python migrate.py db init
fi

## En caso de error como: Can't locate revision identified by '5c8b3d598949'
## copiar el id que aparece, pegarlo en la siguiente linea, descomentarla y ejecutar de nuevo
#python migrate.py db revision --rev-id 5c8b3d598949
python migrate.py db migrate
python migrate.py db upgrade


cd ..
#deactivate
#cd ../..
source venv/bin/desactivate
echo "migration performed"
