
from django.db import models


class Author(models.Model):
    """
    Author Model
    Stores information about book authors.

    Fields:
    - name: Name of the author (string).
    """

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Book(models.Model):
    """
    Book Model
    Represents a book written by an author.

    Fields:
    - title: Title of the book.
    - publication_year: Year the book was published.
    - author: ForeignKey relationship to Author model.
      This creates a one-to-many relationship:
      One Author -> Many Books.
    """

    title = models.CharField(max_length=255)
    publication_year = models.IntegerField()
    author = models.ForeignKey(
        Author,
        related_name="books",  # Enables reverse relation: author.books.all()
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title
