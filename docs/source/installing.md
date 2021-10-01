<p align=center>
  <img src="_static/Logo.png" width=40% align=center>
</p>

# Get Started  

## Prerequisites

* Install [Python](https://www.python.org/downloads/)
* Install [Node](https://nodejs.org/en/download/)
* Download [Git](https://git-scm.com/download/) 

## Setup from Source Code
### Clone the Repository

```
git clone https://github.com/Auto-DL/Auto-DL.git
```

* Setup a [Python Environment](https://docs.python.org/3/library/venv.html) (Not necessary but highly recomended)


### Setup the .env file

Clone the sample.env to create .env in both BackEndApp/ and FrontEndApp/v1-react/ and configure the necessary environment variables

#### BackEnd Environment
* `cd BackEndApp`
* Rename `sample.env` to `.env`
* Fill in the correct values.

#### FrontEnd Environment
* `cd FrontEndApp/v1-react`
* Rename `sample.env` to `.env`
* Fill in the correct values.

* **NOTE:** Make sure the name of the file is `.env` (that " . " is important)


### Installing the Requirements and Running the App
<details>
    <summary><b>Windows</b></summary>  
    <br/>
For Backend

```
cd Auto-DL/BackEndApp
pip install -r requirements.txt
```
For Frontend
```
cd Auto-DL/FrontEndApp
npm install
```

Only after all requriements from requirements.txt are installed

```
cd BackEndApp
mkdir logs
```
Run the Backend
```
python manage.py runserver
# you can ignore any migration warnings
```

Finally, run the react frontend

```
# on a new terminal tab
cd FrontEndApp/v1-react
npm start
```
    
</details>

<details>
    <summary><b>Linux</b></summary>

```
cd Auto-DL
```
```
sudo ./scripts/install.sh
```
```
sudo ./scripts/run.sh
```
</details>

<details>
    <summary><b>MacOS</b></summary>

```
cd Auto-DL
```
```
brew ./scripts/install.sh
```
```
brew ./scripts/run.sh
```
</details>

---

## Setup using Docker
Configure the necessary environment variables in `docker-compose.yml` and run `docker-compose up`.   
This will setup a development server, so instead if you want to setup a production server you can replace the dockerfile context in `docker-compose.yml` for each container to include the production **Dockerfile** instead of **Dockerfile.dev**.

> Note: Before running the production docker containers modify the nginx configuration if needed in `nginx/nginx.conf` as the FrontEndApp docker container uses nginx in production

