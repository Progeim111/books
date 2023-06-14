document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill in all fields", "error");
    } else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        LS.addBook(book);
        UI.showAlert("Book added", "success");
        UI.clearFields();
    }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    LS.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Book removed", "success");
});
