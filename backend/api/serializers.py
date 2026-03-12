from rest_framework import serializers
from .models import Course, Event, Registration


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class RegistrationSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Registration
        fields = "__all__"
        read_only_fields = ["status", "submitted_at", "updated_at"]
