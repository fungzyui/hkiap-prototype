"""
Seed the database with sample courses and events from the HKIAP frontend prototype.
Usage: python manage.py seed
"""

from django.core.management.base import BaseCommand
from api.models import Course, Event
import datetime


class Command(BaseCommand):
    help = "Seed database with sample HKIAP data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding courses...")
        courses = [
            dict(
                title="Leadership Development Programme",
                category="leadership",
                level="advanced",
                duration="5 Days",
                participants=1240,
                description="Develop essential leadership skills for senior police officers, covering strategic thinking, decision-making under pressure, and team management.",
                image_url="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
            ),
            dict(
                title="Criminal Investigation Techniques",
                category="investigation",
                level="intermediate",
                duration="10 Days",
                participants=890,
                description="Advanced investigative methods including forensic analysis, interview techniques, and digital evidence collection.",
                image_url="https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=800",
            ),
            dict(
                title="Cybercrime & Digital Forensics",
                category="technology",
                level="advanced",
                duration="7 Days",
                participants=520,
                description="Modern cybercrime investigation, digital forensics tools, and handling of electronic evidence in court proceedings.",
                image_url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
            ),
            dict(
                title="Community Policing Strategies",
                category="community",
                level="foundation",
                duration="3 Days",
                participants=1560,
                description="Building effective relationships with communities, conflict resolution, and modern approaches to public order management.",
                image_url="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
            ),
            dict(
                title="Physical Fitness & Tactical Training",
                category="physical",
                level="foundation",
                duration="14 Days",
                participants=2100,
                description="Comprehensive physical conditioning program with tactical defence, use of force protocols, and operational fitness standards.",
                image_url="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
            ),
            dict(
                title="Law & Legal Procedures",
                category="legal",
                level="intermediate",
                duration="5 Days",
                participants=730,
                description="Essential legal knowledge covering criminal law, evidence procedures, human rights obligations, and court presentation skills.",
                image_url="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            ),
        ]
        Course.objects.all().delete()
        for data in courses:
            Course.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f"  Created {len(courses)} courses."))

        self.stdout.write("Seeding events...")
        events = [
            dict(
                title="Annual Police Leadership Summit",
                category="conference",
                date=datetime.date(2025, 3, 20),
                time=datetime.time(9, 0),
                location="HKIAP Main Auditorium",
                description="Bringing together senior officers to discuss the future of policing in Hong Kong.",
                capacity=300,
                is_featured=True,
            ),
            dict(
                title="Cybersecurity Masterclass",
                category="workshop",
                date=datetime.date(2025, 3, 25),
                time=datetime.time(14, 0),
                location="Technology Training Centre",
                description="Hands-on workshop on the latest cybercrime trends and investigative tools.",
                capacity=40,
                is_featured=True,
            ),
            dict(
                title="Community Policing Forum",
                category="seminar",
                date=datetime.date(2025, 4, 5),
                time=datetime.time(10, 0),
                location="Conference Room A",
                description="Panel discussion on community policing initiatives across districts.",
                capacity=80,
                is_featured=False,
            ),
            dict(
                title="Graduation Ceremony — Batch 2025",
                category="ceremony",
                date=datetime.date(2025, 4, 15),
                time=datetime.time(11, 0),
                location="HKIAP Parade Ground",
                description="Graduation ceremony for the 2025 intake of recruit officers.",
                capacity=500,
                is_featured=True,
            ),
        ]
        Event.objects.all().delete()
        for data in events:
            Event.objects.create(**data)
        self.stdout.write(self.style.SUCCESS(f"  Created {len(events)} events."))

        self.stdout.write(self.style.SUCCESS("Done! Database seeded successfully."))
