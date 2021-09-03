from os import name
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # v0 routes
    path("generate/", views.generate, name="generate"),
    path("train/", views.train, name="train"),
    path("compile/", views.compile, name="compile"),
    # home routes
    path("projects/all/", views.get_all_projects, name="all-projects"),
    path("project/get/", views.get_project, name="get-project"),
    path("project/edit/", views.edit_project, name="edit-project"),
    path("project/delete/", views.delete_project, name="delete-project"),
    path("project/clone/", views.clone_project, name="clone-project"),
    path("project/share/", views.share_project, name="share-project"),
    path("users/all/", views.all_users, name="all-users"),
    # step-1 routes
    path("project/new/", views.create_project, name="create-project"),
    # pre-step-2 routes
    path(
        "preprocessing/get/", views.get_preprocessing_params, name="get-preprocessing"
    ),
    path(
        "preprocessing/save/",
        views.save_preprocessing_params,
        name="save-preprocessing",
    ),
    # step-2 routes
    path("layers/get/", views.get_layers, name="get-layers"),
    path("layers/save/", views.save_layers, name="save-layers"),
    path("hyperparams/get/", views.get_hyperparams, name="get-hyperparams"),
    path("hyperparams/save/", views.save_hyperparams, name="save-hyperparams"),
    # post-processing routes
    path("code/download/", views.download_code, name="dowload-code"),
    # publish to github routes
    path("github/getusername/", views.get_github_username, name="get-github-username"),
    path("github/authorize/", views.authorize_github, name="authorize-github"),
    path(
        "github/publish/",
        views.publish_on_github,
        name="publish-on-github",
    ),
    path("github/logout/", views.github_logout, name="github-logout"),
]
