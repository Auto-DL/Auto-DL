from django.http import JsonResponse

from .models import Session


def is_authenticated(function):
    def wrapper(request, *args, **kwargs):
        token = request.META.get("HTTP_TOKEN")
        session_obj = Session({})
        if session_obj.verify(token):
            return function(request)
        else:
            return JsonResponse(
                {"success": False, "message": "Not Authenticated"}, status=401
            )

    return wrapper
