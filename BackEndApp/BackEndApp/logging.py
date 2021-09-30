import logging


class AutoreloadLogFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        if record.name.find("django.utils.autoreload") != -1:
            return False
        return True


LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "console": {
            "()": "colorlog.ColoredFormatter",
            "format": "%(log_color)s %(asctime)s | %(name)s/%(funcName)s | "
            "%(levelname)s:%(reset)s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "file": {
            "format": "%(asctime)s | %(name)s/%(funcName)s | "
            "%(levelname)s: %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "filters": {"autoreloadFilter": {"()": AutoreloadLogFilter}},
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "console",
            "filters": ["autoreloadFilter"],
        },
        "file": {
            "class": "logging.handlers.TimedRotatingFileHandler",
            "backupCount": 7,
            "when": "D",
            "interval": 1,
            "formatter": "file",
            "filename": "./logs/app.log",
            "filters": ["autoreloadFilter"],
        },
        "mail_admins": {
            "class": "django.utils.log.AdminEmailHandler",
        },
    },
    "root": {"level": "DEBUG", "handlers": ["console", "file"]},
    "loggers": {
        "django": {"level": "DEBUG", "handlers": ["console", "file"]},
        "django.template": {"level": "ERROR", "handlers": ["console", "file"]},
    },
}
