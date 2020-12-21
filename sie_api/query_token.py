# Third party
import json
import requests

# Secrets
from udisdollar.settings import Q_BANXICO_TOKEN


class QueryToken:
    """Query Token from Banxico.

    :param host: A string, host url from API
    :param end_point: An string, end_point/resource API

    """

    def __init__(self, host, end_point):
        self.host = host
        self.end_point = end_point

    def headers(self):
        return {
            'Accept': 'application/json',
            'Bmx-Token': Q_BANXICO_TOKEN,
        }

    def query_to_banxico(self, start_date, end_date):
        """ Fetch dollar value and Udis value

        :param start_date: a date type 
        :param end_date: a date type
        """
        preffix = '/datos'
        id_series = '/SP68257,SF43718'
        try:
            response = requests.get(
                f'{self.host}{self.end_point}{id_series}{preffix}/{start_date}/{end_date}',
                headers=self.headers()
            )
        except requests.exceptions.RequestException as error:
            raise SystemExit(error.message)

        return response
