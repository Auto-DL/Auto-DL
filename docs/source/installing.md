<p align=center>
  <img src="_static/Logo.png" width=40% align=center>
</p>

# Get Started  

## Prerequisites

* Install [Python](https://www.python.org/downloads/)
* Install [Node](https://nodejs.org/en/download/)
* Download [Git](https://git-scm.com/download/) 

## Setup using GitHub
### Clone the Repository

```
git clone https://github.com/Auto-DL/Auto-DL.git
```

* Setup a [Python Environment](https://docs.python.org/3/library/venv.html) (Not necessary but highly recomended)


### Setup the .env file
Clone the sample.env to create .env in both BackEndApp/ and FrontEndApp/v1-react/ and configure the necessary environment variables

**Getting the .env File**
* Auto-DL team has created an environment file for its contributers.
* Download [the file](https://drive.google.com/file/d/15zGH1D_Uy3ZBWy4s873L9We5arpI7ls6/view?usp=sharing) and paste it in `Auto-DL/BackEndApp` directory.
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
