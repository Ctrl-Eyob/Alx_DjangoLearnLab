\# Delete Operation



\*\*Command:\*\*



```python

from bookshelf.models import Book



\# Delete the book we just updated

book = Book.objects.get(title="Nineteen Eighty-Four")

book.delete()



\# Verify deletion

Book.objects.all()



