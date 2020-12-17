import json
from datetime import datetime

# Django
from django.views import View
from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView

# Api url's
from udisdollar.settings import BASE_URL, END_POINT

# Token
from sie_api.query_token import QueryToken


class UdisDollarPageView(TemplateView):
    template_name = "service_app/home.html"


class UdisDollarView(View):
    """
    SP68257  Valor de UDIS.
    SF43718  Pesos por Dólar. FIX.

    Reference:
    https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CF102&sector=6&locale=es
    """

    def post(self, request):
        if self.request.method == "POST":
            start_date = self.request.POST['start_date']
            end_date = self.request.POST['end_date']

            start_date = datetime.strptime(
                start_date, "%d/%m/%Y").strftime("%Y-%m-%d")
            end_date = datetime.strptime(
                end_date, "%d/%m/%Y").strftime("%Y-%m-%d")

            q_instance = QueryToken(BASE_URL, END_POINT)
            response = q_instance.query_to_banxico(start_date, end_date)

            if response.status_code == 200:
                data = response.json()['bmx']['series']

                return JsonResponse({
                    "status_code": response.status_code,
                    "message": "Success request",
                    "data": data
                })
            elif response.status_code == 401:
                return JsonResponse({
                    "status_code": response.status_code,
                    "message": "Unauthorized"
                })
            elif response.status_code == 403:
                return JsonResponse({
                    "status_code": response.status_code,
                    "message": "Forbidden"
                })
            else:
                return JsonResponse({
                    "status_code": response.status_code,
                    "message": "Not Found"
                })

        else:
            return JsonResponse({
                "message": "Error"
            })
