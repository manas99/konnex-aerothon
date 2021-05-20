from functools import wraps
from rest_framework.response import Response


def response_success(message="", result={}):
    """
    A function to generate a rest_framework.response.Response object for successful result.
    message: Message to be sent in the Response
    result: Serialized data to be sent in the Response
    """
    return Response({
        "success": True,
        "message": message,
        "result": result,
    })


def response_page(paginator, data, extra={}):
    """
    A function to generate a rest_framework.response.Response object for successful result for pagination.
    paginator: instance of rest_framework.pagination.PageNumberPagination
    data: Serialized data to be sent in response
    """
    resp = {}
    resp['success'] = True
    if paginator.page.has_previous():
        resp['previous'] = paginator.page.previous_page_number()
    if paginator.page.has_next():
        resp['next'] = paginator.page.next_page_number()
    resp['current'] = paginator.page.number
    resp['num_pages'] = paginator.page.paginator.num_pages
    resp['result'] = data
    resp['count'] = paginator.page.paginator.count
    resp['extra'] = extra
    return Response(resp)


def response_error(message="", code=400):
    """
    A function to generate a rest_framework.response.Response object for in case of error.
    message: Message to be sent in the Response
    code: HTTP status code
    """
    return Response({
        "success": False,
        "message": message,
    }, code)


def has_parameters(params):
    """
    Make sure to send the parameters in the request body for POST request,
    and in Query Params for GET request.
    params: list of all the parameters.
    """
    def request_decorator(dispatch):
        @wraps(dispatch)
        def wrapper(request, *args, **kwargs):
            if request.method == "GET":
                for x in params:
                    if x not in request.query_params:
                        print(x, ": not available")
                        return response_error("Invalid Request.", 400)
            if request.method == "POST":
                for x in params:
                    if x not in request.data:
                        print(x, ": not available")
                        return response_error("Invalid Request.", 400)

            return dispatch(request, *args, **kwargs)

        return wrapper
    return request_decorator
