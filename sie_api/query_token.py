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
        preffix = '/datos'
        id_series = '/SF43718,SF60653,SP68257'
        print(
            f'✅ {self.host}{self.end_point}{id_series}{preffix}/{start_date}/{end_date}'
        )
        try:
            response = requests.get(
                f'{self.host}{self.end_point}{id_series}{preffix}/{start_date}/{end_date}',
                headers=self.headers()
            )

        except requests.exceptions.RequestException as error:
            # Remember response error with json()
            raise SystemExit(error.message)

        return response
