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


def home(request):
    # example
    start_date = '/2020-11-10'
    end_date = '/2020-12-10'

    q_instance = QueryToken(BASE_URL, END_POINT)
    response = q_instance.query_to_banxico(start_date, end_date)

    data = response.json()['bmx']['series']

    return render(request, "service_app/home.html", {"data": data})


class UdisDollarView(View):

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

            data = response.json()['bmx']['series']

            return JsonResponse({"response": data})
