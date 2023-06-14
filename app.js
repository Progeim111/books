const titleInput = document.getElementById("Title")
const authorInput = document.getElementById("Author")
const isbnInput = document.getElementById("ISBN")
const table = document.getElementById("WebTable")
const form = document.querySelector('form')

form.addEventListener("submit", addBook)
table.addEventListener('click', deleteBook)
window.addEventListener('load', getBooksFromLocalStorage);




function addBook(e){
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = titleInput.value
    cell2.innerHTML = authorInput.value
    cell3.innerHTML = isbnInput.value
    const a = document.createElement('a')
    a.appendChild(document.createTextNode('X'))
    a.className = 'blue-text text-darken-2 secondary-content'
    a.style = 'alig'
    a.setAttribute('href', '#')
    cell4.appendChild(a)
    addBookToLocalStorage(titleInput.value, authorInput.value, isbnInput.value)
    e.preventDefault()
}

function deleteBook(e){
    let listBook
    let name = e.target.parentElement.parentElement.children[0].innerText
    let author = e.target.parentElement.parentElement.children[1].innerText
    let ISBN = e.target.parentElement.parentElement.children[2].innerText
    let listDeletedBook = [name,author,ISBN]
    if (e.target.textContent === "X") {
        if (confirm("are you sure you want to remove this book?")) {
            listBook = e.target.parentElement.parentElement.rowIndex
            if (e.target.parentElement.parentElement.rowIndex > 0) {
                console.log(e.target.parentElement.parentElement.rowIndex)
                table.deleteRow(listBook)
                deleteBookFromLocalStorage(name, author, ISBN);
            }
        }
    }
}

function addBookToLocalStorage(title, author, isbn) {
    let books;

    // Check if 'books' already exists in localStorage
    if (localStorage.getItem('books') === null) {
        // If not, create an empty array
        books = [];
    } else {
        // If it exists, retrieve the existing data
        books = JSON.parse(localStorage.getItem('books'));
    }

    // Create a new book object with the provided data
    const newBook = [
        title,
        author,
        isbn,
    ];

    // Add the new book to the 'books' array
    books.push(newBook);

    // Update localStorage with the updated 'books' array
    localStorage.setItem('books', JSON.stringify(books));
}

function deleteBookFromLocalStorage(title, author, isbn) {
    let books;

    // Check if 'books' exists in localStorage
    if (localStorage.getItem('books') === null) {
        return; // If 'books' doesn't exist, there is nothing to delete
    } else {
        // Retrieve the existing data from localStorage
        books = JSON.parse(localStorage.getItem('books'));
    }

    // Find the book with the matching title, author, and isbn
    const index = books.findIndex(
        (book) =>
            book[0] === title &&
            book[1] === author &&
            book[2] === isbn
    );

    if (index !== -1) {
        // If the book is found (index is not -1), remove it from the 'books' array
        books.splice(index, 1);

        // Update localStorage with the updated 'books' array
        localStorage.setItem('books', JSON.stringify(books));
    }
}

function getBooksFromLocalStorage() {
    let books;

    // Check if 'books' exists in localStorage
    if (localStorage.getItem('books') === null) {
        books = []; // If 'books' doesn't exist, set it as an empty array
    } else {
        // Retrieve the existing data from localStorage
        books = JSON.parse(localStorage.getItem('books'));
    }

    // Iterate over each book in the 'books' array
    books.forEach((book) => {
        const title = book[0];
        const author = book[1];
        const isbn = book[2];

        // Create a new row for the book in the table
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        // Set the values of the cells in the row
        cell1.innerHTML = title;
        cell2.innerHTML = author;
        cell3.innerHTML = isbn;

        // Create the delete button
        const deleteButton = document.createElement('a');
        deleteButton.appendChild(document.createTextNode('X'));
        deleteButton.className = 'blue-text text-darken-2 secondary-content';
        deleteButton.href = '#';

        // Append the delete button to the last cell in the row
        cell4.appendChild(deleteButton);
    });
}


