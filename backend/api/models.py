from django.db import models


class Course(models.Model):
    CATEGORY_CHOICES = [
        ("leadership", "Leadership"),
        ("investigation", "Investigation"),
        ("technology", "Technology"),
        ("community", "Community Relations"),
        ("physical", "Physical Training"),
        ("legal", "Legal Studies"),
    ]
    LEVEL_CHOICES = [
        ("foundation", "Foundation"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
        ("executive", "Executive"),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    duration = models.CharField(max_length=50)  # e.g. "3 Days"
    participants = models.PositiveIntegerField(default=0)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class Event(models.Model):
    CATEGORY_CHOICES = [
        ("seminar", "Seminar"),
        ("workshop", "Workshop"),
        ("ceremony", "Ceremony"),
        ("competition", "Competition"),
        ("conference", "Conference"),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)
    description = models.TextField()
    capacity = models.PositiveIntegerField(default=50)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date", "time"]

    def __str__(self):
        return f"{self.title} ({self.date})"


class Registration(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    # Personal info
    name = models.CharField(max_length=200)
    rank = models.CharField(max_length=100)
    unit = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)

    # Application details
    course = models.ForeignKey(
        Course, on_delete=models.SET_NULL, null=True, related_name="registrations"
    )
    preferred_date = models.DateField(null=True, blank=True)
    remarks = models.TextField(blank=True)

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.name} → {self.course} ({self.status})"
