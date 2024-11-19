import pandas as pd
from datetime import datetime

from django.conf import settings
from django.utils.translation import ugettext as _

from users.constants import CHART_COLOR, FUNNEL_SINCE_START


"""
Set the range of equally spaced time points:
- 'frequency': difference between periods, strings can have multiples, e.g. '5H', '1W', '3M'.
- 'periods': number of periods to generate.
""" 
CHART_LABELS = {
    '7': {'frequency': 'D', 'periods': 8},
    '14': {'frequency': 'D', 'periods': 15},
    '30': {'frequency': 'W-MON', 'periods': 5},
    '60': {'frequency': 'W-MON', 'periods': 9},
    '90': {'frequency': 'W-MON', 'periods': 14},
    '180': {'frequency': 'MS', 'periods': 7},
    '365': {'frequency': 'MS', 'periods': 13},
}

CHART_SETTINGS = {
    'total': {'color': CHART_COLOR},
    'funnel_created_class': {'color': '#00A2E8', 'label': _('Created class')},
    'funnel_created_key': {'color': '#FF7F27', 'label': _('Created key')},
    'funnel_got_result': {'color': '#22B14C', 'label': _('Got result')},
    'funnel_printed_as': {'color': '#6526E8', 'label': _('Printed AS')},
    'funnel_released_as': {'color': '#ED1C24', 'label': _('Released AS')},
    'funnel_returned': {'color': '#FFC90E', 'label': _('Returned')},
    'funnel_sign_ups': {'color': '#000000', 'label': _('Sign-ups')},
    'handwritten': {'color': '#BC805F', 'label': _('Handwritten')},
    'mc': {'color': '#77E385', 'label': _('MC')},
    'online': {'color': '#F15F66', 'label': _('Online')},
    'online_custom': {'color': '#573724', 'label': _('Regular Online')},
    'online_fib': {'color': '#0F6CAA', 'label': _('FIB Online')},
    'online_generic': {'color': '#264D1A', 'label': _('MC Online')},
    'online_mc': {'color': '#264D1A', 'label': _('MC Online')},
    'online_mf': {'color': '#6A1517', 'label': _('Math Online')},
    'online_numeric': {'color': '#B95411', 'label': _('Numeric Online')},
    'paper': {'color': '#559DD9', 'label': _('Paper')},
    'paper_custom': {'color': '#B97A57', 'label': _('Regular Paper')},
    'paper_fib': {'color': '#5AB3F0', 'label': _('FIB Paper')},
    'paper_generic': {'color': '#8FD378', 'label': _('MC Paper')},
    'paper_mc': {'color': '#8FD378', 'label': _('MC Paper')},
    'paper_mf': {'color': '#E06264', 'label': _('Math Paper')},
    'paper_numeric': {'color': '#F09759', 'label': _('Numeric Paper')},
}


class ChartHelper:
    @classmethod
    def get_chart_dates(cls, period):
        frequency, periods = CHART_LABELS.get(period, {'frequency': None, 'periods': 0}).values()
        datelist = cls._get_dates(frequency, periods)
        return datelist

    @classmethod
    def get_chart_structure(cls, data, labels, title):
        datasets = cls._get_chart_datasets(data, title)
        return {
            "title": title,
            "data": {
                "labels": labels,
                "datasets": datasets,
            },
        }

    @classmethod
    def _get_dates(cls, frequency, periods):
        """
        Returns a list of dates depends on chosen period in timestamp format.
        """
        today = datetime.today()
        datelist = pd.date_range(
            end=today,
            freq=frequency,
            periods=periods,
            normalize=True,
            tz=settings.ADMIN_VANCOUVER_TIMEZONE_NAME
        )
        return datelist

    @staticmethod
    def format_dates_to_labels(datelist, period, since_start=False):
        """
        Formats timestamp objects to the list of dates with needed format. 
        """
        if since_start:
            return [_(FUNNEL_SINCE_START)]
        datelist = datelist.tolist()
        datelist_size = len(datelist)
        if datelist_size > 0:
            if period in ('7', '14'):
                # remove last date in the list, because we show current day for days period
                datelist.pop(datelist_size - 1)
            else:
                # remove first date in the list, because we show end of period as a label
                datelist.pop(0)

        return [date.strftime('%d-%b') for date in datelist]
    
    @staticmethod
    def _get_chart_datasets(data, title):
        """
        Returns datasets with relevant colors and data labels depends on chosen data type.
        """
        datasets = []
        for key, value in data.items():
            dataset = {
                'label': CHART_SETTINGS[key].get('label', title),
                'backgroundColor': CHART_SETTINGS[key].get('color', CHART_COLOR),
                'borderColor': CHART_SETTINGS[key].get('color', CHART_COLOR),
                'data': value
            }
            datasets.append(dataset)

        return datasets
