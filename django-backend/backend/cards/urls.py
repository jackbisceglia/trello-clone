from rest_framework import routers
from .api import CardViewSet

router = routers.DefaultRouter()
router.register('api/cards', CardViewSet, 'cards')

urlpatterns = router.urls