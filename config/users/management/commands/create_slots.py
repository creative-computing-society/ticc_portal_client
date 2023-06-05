from django.core.management.base import BaseCommand
from slots.models import AvailableSlot

class Command(BaseCommand):
    help = "Populate the database with slots"
      
