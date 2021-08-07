'use strict'

const libraryContainer = document.querySelector('.library-container')

const title = document.querySelector('.new-title')
const author = document.querySelector('.new-author')
const pages = document.querySelector('.new-pages')


let submitBtn = document.querySelector('.sub')
let books = [];

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
    this.id = Math.ceil(Math.random() * 10000) + title
}        

Book.prototype.addBook = function() {
    books.push(this)
}

submitBtn.addEventListener('click', function(e) {
    const readStatus = document.querySelector('input[name=read-status]:checked')
    e.preventDefault();
    const newBook = new Book(title.value, author.value, pages.value, readStatus.value) 
    newBook.addBook()
    createElements(newBook)
})

function createElements(ele) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-div');
    bookDiv.setAttribute('data-id', ele.id)
    bookDiv.innerHTML = `
        <span class="delete">x</span>
        <div>
          <h2 class="header">Title</h2>
          <p class="title"></p>
          <h2 class="header">Author</h2>
          <p class="author"></p>
          <h2 class="header">Pages</h2>
          <p class="pages"></p>
        </div>
    `
    populateBookDiv(bookDiv, ele)
    
    bookDiv.appendChild(createReadToggle(ele))
    
    libraryContainer.appendChild(bookDiv)
}

function populateBookDiv(ele, obj) {
    const title = ele.querySelector('.title')
    const author = ele.querySelector('.author')
    const pages = ele.querySelector('.pages')
    title.textContent = obj.title
    author.textContent = obj.author
    pages.textContent = obj.pages
    
}

function createReadToggle(ele) {
    const readBtn = document.createElement('button')
    readBtn.classList.add('read-btn')
    readBtn.textContent = ele.readStatus
    return readBtn
}

libraryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-btn')) {
        let readBtnText = e.target.textContent == 'Read' ? 'Not Read' : 'Read'
        const identifier = e.target.parentElement.getAttribute('data-id');
        e.target.textContent = readBtnText
        books.forEach(((book) => {
            if (book.title == identifier) {
                book.readStatus = readBtnText
            }
        }))
    }

    if (e.target.classList.contains('delete')) {
        const identifier = e.target.parentElement.getAttribute('data-id');
        books.forEach(((book, index) => {
            if (book.id == identifier) books.splice(index, 1)
        }))
        
        e.target.parentElement.remove();
    }
})