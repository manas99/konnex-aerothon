import json
from django.core.cache import caches


def get_client_counts():
    data = {
        "total": caches['default'].get_or_set('count_clients_total', '0'),
        "mobile": caches['default'].get_or_set('count_clients_mobile', '0'),
        "desktop": caches['default'].get_or_set('count_clients_desktop', '0')
    }
    return json.dumps(data)


def send_msg(action, msg=""):
    data = {
        "action": action,
        "message": msg,
    }
    return json.dumps(data)


def get_announcement(x):
    str_ = "<strong>Announcement: " + x.title + "</strong><br>" + x.description
    return str_
