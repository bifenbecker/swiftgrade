from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Run seeds'

    # def add_arguments(self, parser):
    #     parser.add_argument(
    #         '--url', dest='url', required=True,
    #         help='the url to process',
    #     )

    def handle(self, *args, **options):
        print("Haha")
