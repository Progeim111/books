class LS {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book) {
        const books = LS.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = LS.getBooks();
        const index = books.findIndex((book) => book.isbn === isbn);
        if (index !== -1) {
            books.splice(index, 1);
            localStorage.setItem("books", JSON.stringify(books));
        }
    }
}
