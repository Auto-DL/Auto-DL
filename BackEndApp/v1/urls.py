from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # v0 routes
    path('generate/', views.generate, name='generate'),
    path('train/', views.train, name='train'),
    path('compile/', views.compile, name='compile'),
    # home routes
    path('projects/all/', views.get_all_projects, name='all-projects'),
    path('project/get/', views.get_project, name='get-project'),
    path('project/edit/', views.edit_project, name='edit-project'),
    path('project/delete/', views.delete_project, name='delete-project'),
    # step-1 Routes
    path('project/new/', views.create_project, name='create-project'),

]
