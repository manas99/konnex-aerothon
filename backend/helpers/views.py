from helpers import response_error


def not_found(request, exception):
    return response_error(message="Not found.", code=404)
