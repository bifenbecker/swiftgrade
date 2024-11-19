# Swiftgrade (Django REST)

## Local application setup:

1. install miniconda for virtualenv (!important) (https://conda.io/miniconda.html)
2. create env `conda create -n swiftgrade python=3.7`
3. activate env (every time) `conda activate swiftgrade`
4. install requirements via `pip install -r requirements.txt`
5. create postgresql database with name 'swiftgrade'
6. fill `.env` file from `.env.example`
7. run migrations `python manage.py migrate`
8. run application `python manage.py runserver`
9. run seeds `python manage.py run_seeds --name all`
10. run initialize db script if needed, start django shell: `./manage.py shell_plus` and run in the shell:

    `from scripts.initialize_db import main`

    `main()`

    To reinitialize initial data run script with `reinit=True` parameter:

    `main(reinit=True)`


### To activate conda env automatically in application folder
1. Go to https://github.com/chdoig/conda-auto-env
2. Follow instructions

### To setup pre-commit hooks

1. `pip install -r dev_requirements.txt`
2. `pre-commit install`


### Seeds

#### Introduction

Seeds it is initial data of models such as `User` and etc.

1. create new file inside `seeds`
2. write a script and add `perform` method as entrypoint into your script
3. add filename into `seed_names` in `seeds/all.py` file

#### Usage

1. run seed via `python manage.py run_seeds --name seed_name`
2. to run all seeds `python manage.py run_seeds --name all`
