from django.shortcuts import render, redirect
from django.views.generic import DetailView
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required, permission_required, user_passes_test
from .models import Book, Library

## function based view=
def list_books(request):
    books = Book.objects.all()
    return render(request, 'relationship_app/list_books.html', {'books': books})
## class bassed view=
class LibraryDetailView(DetailView):
    model= Library
    template_name = 'relationshi_app/library_detail.html'
    context_object_name ='library'