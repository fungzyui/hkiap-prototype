from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, Event, Registration
from .serializers import CourseSerializer, EventSerializer, RegistrationSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and retrieve courses.
    Supports ?category=<cat> and ?level=<lvl> query params.
    """

    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]

    def get_queryset(self):
        qs = Course.objects.filter(is_active=True)
        category = self.request.query_params.get("category")
        level = self.request.query_params.get("level")
        if category:
            qs = qs.filter(category=category)
        if level:
            qs = qs.filter(level=level)
        return qs


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and retrieve events.
    Supports ?featured=true query param.
    """

    serializer_class = EventSerializer

    def get_queryset(self):
        qs = Event.objects.all()
        featured = self.request.query_params.get("featured")
        if featured and featured.lower() == "true":
            qs = qs.filter(is_featured=True)
        return qs


class RegistrationViewSet(viewsets.ModelViewSet):
    """
    Create and list registrations.
    Admin can update status via PATCH /api/registrations/<id>/set_status/
    """

    serializer_class = RegistrationSerializer

    def get_queryset(self):
        qs = Registration.objects.select_related("course").all()
        status = self.request.query_params.get("status")
        if status:
            qs = qs.filter(status=status)
        return qs

    @action(detail=True, methods=["patch"], url_path="set_status")
    def set_status(self, request, pk=None):
        registration = self.get_object()
        new_status = request.data.get("status")
        if new_status not in dict(Registration.STATUS_CHOICES):
            return Response({"error": "Invalid status"}, status=400)
        registration.status = new_status
        registration.save()
        return Response(RegistrationSerializer(registration).data)
