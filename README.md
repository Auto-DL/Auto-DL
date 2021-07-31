<p align="center"><img width=30% src="static/adl_generator.png"></p>

<center>

[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![GitHub issues](https://img.shields.io/github/issues-raw/Auto-DL/Generator?color=red)](https://github.com/Auto-DL/Generator/issues?q=is%3Aopen+is%3Aissue)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/Auto-DL/Generator)](https://github.com/Auto-DL/Generator/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/Auto-DL/Generator?color=brightgreen)](https://github.com/Auto-DL/Generator/pulls?q=is%3Aopen+is%3Apr)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/Auto-DL/Generator?color=green)](https://github.com/Auto-DL/Generator/pulls?q=is%3Apr+is%3Aclosed)
[![Slack](https://img.shields.io/badge/Join%20Our%20Community-Slack-blue)](https://join.slack.com/t/autodl/shared_invite/zt-qagxiwub-ywRM_oBvvF~F7YNtlBqy_Q)
[![Documentation Status](https://readthedocs.org/projects/auto-dl/badge/?version=latest)](https://auto-dl.readthedocs.io/en/latest/?badge=latest)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)

</center>

# Generator

The interface section of Auto-DL contains front-end and back-end servers based on React and Django Rest Framework respectively.
The backend calls the [DLMML API](https://www.github.com/Auto-DL/DLMML) according to the requests it recieves.

Generator has DLMML as a submodule.

## Demo

<img src="static/v1-alpha.gif">

<br>
<br>

## Setup

1. Install all the necessary libraries and binaries
```sh
sudo ./scripts/install.sh
```

2. Follow the [instructions](#how-to-run) to run `BackEndApp` and `FrontEndApp` locally or Let it RIP!
```sh
./scripts/run.sh
# or you can pass --install to perform both step 1 and 2
./scripts/run.sh --install
```

## How to run

1.  ```sh
    # clone the repo
    git clone https://github.com/Auto-DL/Generator.git
    git submodule init
    git submodule update
    ```
2. ***Activate your environment** (not necessary but highly recommended).*

3.  ```sh
    # install the requirements, this might take some time, be patient
    pip install -r requirements.txt
    ```

4.  ```sh
    # If you think your machine can handle a simulatenous installation of node modules, open another terminal

    cd FrontEndApp
    npm install

    # go grab a cup of coffee, it takes an eternity XD
    ```
5. Place data in the `./data` directory.

    Your data should be divided into classes for classification, for example, if you're classifying "Cats V/s Dogs", then your `./data` directory would look like:
    ```sh
    data
    └───dogs_and_cats
        ├───test
        │   ├───cats
        │   └───dogs
        └───train
            ├───cats
            └───dogs
    ```

6. Clone the `sample.env` to create `.env` in both `BackEndApp/` and `FrontEndApp/v1-react/` and configure the necessary environment variables

7.  ```sh
    # run the backend
    # only after all requriements from requirements.txt are installed
    cd BackEndApp
    python manage.py runserver
    # you can ignore any migration warnings
    ```

8.  ```sh
    # finally, run the react frontend
    # on a new terminal tab
    cd FrontEndApp/v1-react
    npm start
    ```

**Note:**  For detailed instruction on data directory (point 5) please read [DLMML's User Guide](https://github.com/Auto-DL/DLMML/blob/master/docs/userguide.md).

### Using Docker

Configure the necessary environment variables in `docker-compose.yml` and run `docker-compose up`. This will setup a development server, so instead if you want to setup a production server you can replace the dockerfile context in `docker-compose.yml` for each container to include the production **Dockerfile** instead of **Dockerfile.dev**.

> Note: Before running the production docker containers modify the **nginx** configuration if needed in `nginx/nginx.conf` as the FrontEndApp docker container uses **nginx** in production

## Where to go next?

#### To know more about the project and initiative, please visit our [website](https://auto-dl.github.io/)

#### Curious to know about the DLMML API? [Here](https://github.com/Auto-DL/DLMML), Have a look :)

## Note
- To know more about the technicalities of the project, read our [developer guidelines](https://github.com/Auto-DL/Generator/blob/master/docs/devguide.md).
- For more detailed instructions to run the Generator module, Read our [User guidelines](https://github.com/Auto-DL/Generator/blob/master/docs/userguide.md)

## Contributing
Please take a look at our [contributing guidelines](CONTRIBUTING.md) if you're interested in helping!

#### Features/Enhancements Planned

- Improve the UI and UX.

- Show model training realted stats on the frontend.

- Visualization and data preprocessing steps.

- Model Explainability.
