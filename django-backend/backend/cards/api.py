from cards.models import Card
from rest_framework import viewsets, permissions
from .serializers import CardSerializer

# Card viewset
class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CardSerializer