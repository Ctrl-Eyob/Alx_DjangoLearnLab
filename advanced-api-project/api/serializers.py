from rest_framework import serializers
from .models import Author, Book
from datetime import datetime


class BookSerializer(serializers.ModelSerializer):
    """
    BookSerializer:
    Serializes all Book model fields.

    Custom Validation:
    Ensures publication_year is not in the future.
    """

    class Meta:
        model = Book
        fields = '__all__'

    def validate_publication_year(self, value):
        """
        Custom field-level validation.
        Prevents saving a book with a future publication year.
        """
        current_year = datetime.now().year
        if value > current_year:
            raise serializers.ValidationError(
                "Publication year cannot be in the future."
            )
        return value


class AuthorSerializer(serializers.ModelSerializer):
    """
    AuthorSerializer:
    - Serializes author's name
    - Includes nested BookSerializer to show related books

    Relationship Handling:
    Uses 'books' related_name from Book model
    to dynamically fetch all books written by the author.
    """

    books = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Author
        fields = ['id', 'name', 'books']
