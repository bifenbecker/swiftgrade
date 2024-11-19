from django.db import models
from groups.models.group import Group

from api.core.models import NotDeletableModel


class Assessment(NotDeletableModel):
    CUSTOM = "custom"
    GENERIC = "generic"

    KIND_CHOICES = (
        (CUSTOM, 'Regular'),
        (GENERIC, 'Multiple choice'),
    )

    ASSIGNED = 'assigned'
    GENERATING = 'generating'
    READY_FOR_ASSIGNMENT = 'ready_for_assignment'
    READY_FOR_DOWNLOAD = 'ready_for_download'
    READY_FOR_GENERATION = 'ready_for_generation'
    READY_FOR_SCAN = 'ready_for_scan'
    SCANNED = 'scanned'
    SCANNING = 'scanning'
    CROPPING = 'cropping'

    STATUS_CHOICES = (
        (ASSIGNED, 'Assigned'),
        (GENERATING, 'Generating'),
        (READY_FOR_ASSIGNMENT, 'Ready for assignment'),
        (READY_FOR_DOWNLOAD, 'Ready for download'),
        (READY_FOR_GENERATION, 'Ready for generating'),
        (READY_FOR_SCAN, 'Ready for scan'),
        (SCANNED, 'Scanned'),
        (SCANNING, 'Scanning'),
        (CROPPING, 'Cropping')
    )

    ONLINE = 'online'
    PAPER = 'paper'

    TYPE_CHOICES = (
       (ONLINE, 'Online'),
       (PAPER, 'Paper'),
    )

    answers_updated_at = models.DateTimeField(blank=True, null=True)
    compare_by_characters = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='assessments')
    name = models.CharField(max_length=50)
    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=CUSTOM)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default=READY_FOR_GENERATION)
    type = models.CharField(max_length=255, choices=TYPE_CHOICES, default=PAPER)
    updated_at = models.DateTimeField(auto_now=True)
