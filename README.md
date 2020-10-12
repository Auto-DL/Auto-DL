<p align="center"><img width=30% src="static/adl_generator.png"></p>

<center>

[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![GitHub issues](https://img.shields.io/github/issues-raw/Auto-DL/Generator?color=red)](https://github.com/Auto-DL/Generator/issues?q=is%3Aopen+is%3Aissue)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/Auto-DL/Generator)](https://github.com/Auto-DL/Generator/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/Auto-DL/Generator?color=brightgreen)](https://github.com/Auto-DL/Generator/pulls?q=is%3Aopen+is%3Apr)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/Auto-DL/Generator?color=green)](https://github.com/Auto-DL/Generator/pulls?q=is%3Apr+is%3Aclosed)

</center>

# Generator

Interface part of Auto-DL. Contains front-end (React) and backend (DJango Rest Framework) servers.
The backend calls the [DLMML API](https://www.github.com/Auto-DL/DLMML) according to the request it recieved.

Generator has DLMML as a submodule.

## How to run

1.  ```sh
    # clone the repo
    git clone https://github.com/Auto-DL/Generator.git
    git submodule init
    git submodule update
    ```
2. ***Activate your environment** (not compulsory but highly recommended)*

3.  ```sh
    # install the requirements, this might take some time, be patient
    pip install requirements.txt
    ```

4.  ```sh
    # If you think your machine can handle a simulatenous installation of node modules, open another terminal    
    
    cd FrontEndApp
    npm install

    # go grab a cup of coffee, it takes an eternity XD
    ```
5. Place data in the `./DLMML/data` directory

6.  ```sh
    # run the backend 
    # only after all requriements from requirements.txt are installed
    cd BackEndApp
    python manage.py runserver
    # you can ignore any migration warnings
    ```

7.  ```sh
    # finally, run the react frontend
    # on a new terminal tab
    cd FrontEndApp
    npm start
    ```

**Note:**  For detailed instruction on data directory (point 5) please read [DLMML's User Guide](https://github.com/Auto-DL/DLMML/blob/master/docs/userguide.md)

## Demo

<img src="static/demo.gif">

<br>
<br>

## Where to go next?

#### To know more about the project and initiative, please visit our [website](https://auto-dl.github.io/)

#### Curious to know about the DLMML API? [Here](https://github.com/Auto-DL/DLMML), Have a look :)

## Note
- To know more about the technicalities of the project, read the our [developer guidelines](https://github.com/Auto-DL/Generator/blob/master/docs/devguide.md).
- For more detailed instructions to run the Generator part. Read our [User guidelines](https://github.com/Auto-DL/Generator/blob/master/docs/userguide.md)

## Contributing
Please take a look at our [contributing](https://github.com/Auto-DL/Generator/blob/master/docs/contributing.md) guidelines if you're interested in helping!

#### Features/Enhancements Planned

- Improve the UI and UX

- Show model training realted stats on the front-end

- Input form to contain the dataset path and other essential parameters  

- Visualization and data preprocessing steps

- Model Explainability 
