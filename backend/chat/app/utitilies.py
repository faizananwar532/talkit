import requests
from os import environ
import logging


def verification_details(token):
    url = "http://auth:{}/auth/verify/".format(environ.get("AUTH_PORT"))
    headers = {"Authorization": token}

    _r = requests.post(url, headers=headers)
    res_status = _r.status_code
    if res_status != 200:
        return res_status, None

    _data = _r.json()

    return res_status, _data
