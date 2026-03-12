from django.contrib import admin
from .models import Course, Event, Registration


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "level", "duration", "participants", "is_active"]
    list_filter = ["category", "level", "is_active"]
    search_fields = ["title", "description"]
    list_editable = ["is_active"]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "date", "time", "location", "is_featured"]
    list_filter = ["category", "is_featured"]
    search_fields = ["title", "location"]
    list_editable = ["is_featured"]
    date_hierarchy = "date"


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ["name", "rank", "unit", "course", "status", "submitted_at"]
    list_filter = ["status", "course"]
    search_fields = ["name", "unit", "email"]
    list_editable = ["status"]
    readonly_fields = ["submitted_at", "updated_at"]
    date_hierarchy = "submitted_at"
