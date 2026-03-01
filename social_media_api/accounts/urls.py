from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, ProfileView
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet

router = DefaultRouter()
router.register(r"posts", PostViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = router.urls

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", obtain_auth_token, name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
]