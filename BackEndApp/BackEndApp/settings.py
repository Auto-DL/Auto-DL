import ast
import logging
import logging.config
import os
from pathlib import Path
from urllib.parse import urlparse

import dotenv
from corsheaders.defaults import default_headers

from .logging import LOGGING

HOST = os.getenv("HOST", "http://localhost:8000")
FRONTEND_HOST = os.getenv("FRONTEND_HOST", "http://localhost:3000")

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = Path(__file__).resolve().parent.parent

if not os.path.exists(BASE_DIR / 'logs'):
    os.makedirs(BASE_DIR / 'logs')

dotenv_file = BASE_DIR / ".env"
ENV_EXISTS = os.path.isfile(dotenv_file)
if ENV_EXISTS:
    import secrets
    import string
    dotenv.load_dotenv(dotenv_file)
    PRODUCTION_SERVER = ast.literal_eval(
        os.environ.get('PRODUCTION_SERVER').capitalize(), 'False')
    SECRET_KEY = ''.join(secrets.choice(string.ascii_letters +
                         string.digits + str(secrets.randbits(7))) for i in range(10))
    DEBUG = ast.literal_eval(os.environ.get('DEBUG').capitalize(), 'True')
else:
    PRODUCTION_SERVER = ast.literal_eval(
        os.environ.get('PRODUCTION_SERVER').capitalize(), 'True')
    DEBUG = ast.literal_eval(os.environ.get('DEBUG').capitalize(), 'False')
    SECRET_KEY = os.environ.get('SECRET_KEY', ''.join(secrets.choice(
        string.ascii_letters + string.digits + str(secrets.randbits(7))) for i in range(10)))

ALLOWED_HOSTS = ["localhost", "127.0.0.1", urlparse(HOST).hostname]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "authv1",
    "v1",
    "deployments",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "BackEndApp.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "BackEndApp.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {"default": {"ENGINE": "django.db.backends.dummy"}}

CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOWED_ORIGINS = [HOST, FRONTEND_HOST, "http://localhost:8000"]
CORS_ALLOW_HEADERS = list(default_headers) + [
    "token",
]
CORS_ORIGIN_WHITELIST = (
    HOST,
    FRONTEND_HOST,
    "http://localhost:8000",
)

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = "/static/"

# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")

if PRODUCTION_SERVER:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_REFERRER_POLICY = "same-origin"

# Logging
logging.config.dictConfig(LOGGING)
