from relationship_app.models import Author, Library, Librarian

# Query all books by a specific author
author = Author.objects.get(name="John Doe")
books_by_author = author.book_set.all()

# List all books in a library
library = Library.objects.get(name="Central Library")
library_books = library.books.all()

# Retrieve the librarian for a library
librarian = Librarian.objects.get(library=library)

print(books_by_author, library_books, librarian)
