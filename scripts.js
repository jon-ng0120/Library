'use strict'

const libraryContainer = document.querySelector('.library-container')

const title = document.querySelector('.new-title')
const author = document.querySelector('.new-author')
const pages = document.querySelector('.new-pages')

let submitBtn = document.querySelector('.sub')
let books = [];

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const newBook = new Book(title.value, author.value, pages.value) 
    newBook.addBook()
    createElements(newBook)
})

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}        

Book.prototype.addBook = function() {
    books.push(this)
}

function createElements(ele) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-div');
    const elements = populateBookDiv(ele)
    bookDiv.appendChild(createDeleteBtn())
    bookDiv.appendChild(elements)
    bookDiv.appendChild(createReadToggle())
    
    libraryContainer.appendChild(bookDiv)
}

function populateBookDiv(ele) {
    const headings = ['title', 'author', 'pages']
    const contentDiv = document.createElement('div')
    contentDiv.classList.add('content-div')
    let elements = headings.map(heading => {
        const p = document.createElement('p');
        p.textContent = `${heading.slice(0,1).toUpperCase() + heading.slice(1)}: ${ele[heading]}`;
        // p.setAttribute('data', headings)
        return p;
    })
    contentDiv.append(...elements)
    return contentDiv
}

function createReadToggle(readStatus) {
    const readBtn = document.createElement('button')
    readBtn.classList.add('read-btn')
    readBtn.textContent = readStatus
    return readBtn
}

function createDeleteBtn() {
    const delBtn = document.createElement('button')
    delBtn.textContent = 'X'
    delBtn.classList.add('delete')
    deleteBook(delBtn)
    return delBtn
}

function deleteBook(ele) {
    ele.addEventListener('click', function() {
        this.parentElement.remove();
    })
}