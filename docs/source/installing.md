# Auto-DL (A-DL)

<img src="_static/logo.png" width=30%>

### How to run?


To setup Auto-DL right away in the required OS:

### Prerequisites

* Install [Python](https://www.python.org/downloads/)
* Install [Node](https://nodejs.org/en/download/)

### Which OS are you on?
* Windows
* Linux
* MacOS

### If you are on Windows OS

* Download [Git](https://git-scm.com/download/win) 

##### Method 1

* Clone the repository
```
git clone https://github.com/Auto-DL/Auto-DL.git
```

* Setup [Environment](https://docs.python.org/3/library/venv.html) (Not necessary but highly recomended)

```
cd Auto-DL/BackEndApp
```
* Install the requirements, this might take some time, be patient

```
pip install -r requirements.txt

```

```
cd Auto-DL/FrontEndApp
npm install
```
* Place data in the `./data` directory.

* Your data should be divided into classes for classification, for example, if you're classifying "Cats V/s Dogs", then your `./data` directory would look like:
    
        data
        └───dogs_and_cats
            ├───test
            │   ├───cats
            │   └───dogs
            └───train
                ├───cats
                └───dogs

* Clone the sample.env to create .env in both BackEndApp/ and FrontEndApp/v1-react/ and configure the necessary environment variables

__Getting the .env File__
* Auto-DL team has created an environment file for its contributers.
* Download [the file](https://drive.google.com/file/d/15zGH1D_Uy3ZBWy4s873L9We5arpI7ls6/view?usp=sharing) and paste it in `Auto-DL/BackEndApp` directory.
* **NOTE:** Make sure the name of the file is `.env` (that " . " is important)


* Only after all requriements from requirements.txt are installed

```
cd BackEndApp
mkdir logs
```
* Run the Backend
```
python manage.py runserver
# you can ignore any migration warnings
```

* Finally, run the react frontend

```
# on a new terminal tab
cd FrontEndApp/v1-react
npm start
```



### If you are on Linux

##### Method 1

**Note:** You can also use the same method used for windows above.

#### Method 2


```
git clone https://github.com/Auto-DL/Auto-DL.git
```
```
cd Auto-DL
```

Install the necessary libraries and binaries

```
sudo ./scripts/install.sh
```
```
sudo ./scripts/run.sh
```

### If you are on Mac

##### Method 1

**Note:** You can also use the same method used for windows above.

##### Method 2

```
git clone https://github.com/Auto-DL/Auto-DL.git
```
```
cd Auto-DL
```
Install the necessary libraries and binaries

```
brew ./scripts/install.sh
```
```
brew ./scripts/run.sh
```

---


