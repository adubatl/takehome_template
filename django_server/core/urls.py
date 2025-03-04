"""
URL configuration for core project.
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    # Redirect root to admin
    path("", RedirectView.as_view(url="admin/", permanent=False)),
]
