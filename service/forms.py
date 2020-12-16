from django import forms


class RequestUdisDollar(forms.Form):
    initial_date = forms.DateField(required=True)
    final_date = forms.DateField(required=True)
