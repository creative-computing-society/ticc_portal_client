from django.urls import path, include
from . import views
from . import authentication

urlpatterns = [
    path('auth/login/', authentication.UserLoginView.as_view(), name='login'),
    path('auth/register/', authentication.UserCreationView.as_view(), name='register'),
    path('auth/logout/', authentication.UserLogoutView.as_view(), name='logout'),
    path('auth/update/', authentication.UserUpdateView.as_view(), name='update'),
    path('auth/delete/', authentication.UserDeleteView.as_view(), name='delete'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('students/', views.StudentList.as_view(), name='student-list'),
    path('counsellors/', views.TiccCounsellorList.as_view(), name='counsellor-list'),
    path('userdetails/', views.UserDetail.as_view(), name='user-details'),
    path('studentdetails/', views.StudentDetail.as_view(), name='student-details'),
    path('bookings/', views.ListBookingsView.as_view(), name='list-bookings'),
    path('bookings/details/', views.RetrieveBookingView.as_view(), name='retrieve-booking'),
    path('bookings/create/', views.CreateBookingView.as_view(), name='create-booking'),
    path('bookings/cancel/', views.CancelBookingView.as_view(), name='cancel-booking'),
    path('bookings/update/', views.UpdateBookingView.as_view(), name='update-booking'),
]


 
