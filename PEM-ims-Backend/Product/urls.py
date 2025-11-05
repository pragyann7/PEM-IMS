from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import CategoryListAPIView, ProductListCreateAPIView

urlpatterns = [
    
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('addproduct/', ProductListCreateAPIView.as_view(), name='add-product'),
    path('products/', ProductListCreateAPIView.as_view(), name='products'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)