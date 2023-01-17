const titleInput = document.getElementById("Title")
const authorInput = document.getElementById("Author")
const isbnInput = document.getElementById("ISBN")
const table = document.getElementById("WebTable")
const form = document.querySelector('form')

form.addEventListener("submit", addBook)
table.addEventListener('click', deleteBook)





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
            }
        }
    }
}