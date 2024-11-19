from django.core.management.base import BaseCommand
from seeds.all import perform


class Command(BaseCommand):
    help = 'Run seeds'

    def add_arguments(self, parser):
        parser.add_argument(
            '--name', dest='name', required=True,
            help='seed for process',
        )

    def handle(self, *args, **options):
        print('started seeds')
        seed_name = options.get('name')
        perform(seed_name)
        print('end seeds')
