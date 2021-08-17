# Auto-DL (A-DL)

<img src="static/logo.png" width=30%>

## About

----
[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![GitHub issues](https://img.shields.io/github/issues-raw/Auto-DL/Generator?color=red)](https://github.com/Auto-DL/Generator/issues?q=is%3Aopen+is%3Aissue)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/Auto-DL/Generator)](https://github.com/Auto-DL/Generator/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/Auto-DL/Generator?color=brightgreen)](https://github.com/Auto-DL/Generator/pulls?q=is%3Aopen+is%3Apr)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/Auto-DL/Generator?color=green)](https://github.com/Auto-DL/Generator/pulls?q=is%3Apr+is%3Aclosed)
[![Slack](https://img.shields.io/badge/Join%20Our%20Community-Slack-blue)](https://join.slack.com/t/autodl/shared_invite/zt-qagxiwub-ywRM_oBvvF~F7YNtlBqy_Q)
[![Documentation Status](https://readthedocs.org/projects/auto-dl/badge/?version=latest)](https://auto-dl.readthedocs.io/en/latest/?badge=latest)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)


In a nutshell, Auto-DL is a futuristic way of building deep learning models nearly 10X faster than the usual process.

## What to Use Auto-DL for and When to Use It


Building deep learning models takes a lot of time. 
Use automate your "meta-work" so that you can focus on building your models without worrying about writing code.

- Building models
- Model Validation
- Easy App Deployment

Execute repetitive tasks, save time, and optimize your development process with Auto-DL.

## User Guidelines

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
## Developer Guidelines

The [community repository](https://github.com/Auto-DL/Auto-DL/blob/v1-beta/CONTRIBUTING.md) hosts all information about
building Auto-DL from source, how to contribute code
and documentation, who to contact about what, etc.

### Features/Enhancements planned

* Improve the UI and UX.

* Show model training realted stats on the frontend.

* Visualization and data preprocessing steps.

* Model Explainability.

---
## Contact
<!-- Actual text -->

You can find us on [![Twitter][1.2]][1], or on [![LinkedIn][2.2]][2].

<!-- Icons -->

[1.2]: http://i.imgur.com/wWzX9uB.png (Twitter)
[2.2]: https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/linkedin-3-16.png (LinkedIn)

<!-- Links to our social media accounts -->

[1]: https://twitter.com/auto_dl
[2]: https://www.linkedin.com/company/autodl/

Email: info@auto-dl.tech

Join our community on [slack]()

Have doubts?

Read the [FAQ]()

For more details, visit our [website](https://auto-dl.tech/)

--- 

## Contributors

<a href="https://github.com/Auto-DL/Auto-DL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Auto-DL/Auto-DL" />
</a>

---

## Maintainers and Reviewers


---

## Copyright and Licensing

[GNU General Public License v3.0](https://github.com/Auto-DL/Auto-DL/blob/v1-beta/LICENSE)