'use strict'

const NewBookModalBtn = document.querySelector('.open-new-book')
const grayBackgroundDiv = document.querySelector('.gray-background')
const libraryContainer = document.querySelector('.library-container')
const closeModalBtn = document.querySelector('.close-modal');
const newBookForm = document.querySelector('.new-book-modal')
const title = document.querySelector('.new-title')
const author = document.querySelector('.new-author')
const pages = document.querySelector('.new-pages')


let submitBtn = document.querySelector('.add-book')
let books = [];

// Book class 
class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
        this.id = Math.ceil(Math.random() * 10000) + title
    }

    // Add book object to books array
    addBook() {
        books.push(this)
    }
}


// Create new book 
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const readStatus = document.querySelector('input[name=read-status]:checked')
    checkInputFields() 
    if (Array.from(document.querySelectorAll('.empty-field-error')).some(element => element.style.display == 'block') == false) {
        const newBook = new Book(title.value, author.value, pages.value, readStatus.value) 
        newBook.addBook()
        createElements(newBook)
        closeNewBookForm()
        clearErrorMessages()
        setLocalStorage()
    }
})

// Check for empty input fields
function checkInputFields() {
    const inputFields = newBookForm.querySelectorAll('input')
    inputFields.forEach(element => {
        if (element.type == 'text') {
            if (element.value == '') {
                document.querySelector(`#${element.className}-error`).style.display = 'block';
            } else {
                document.querySelector(`#${element.className}-error`).style.display = '';
            }
        }
        if (element.type == 'radio') {
            if (document.querySelector('input[name=read-status]:checked') == null) {
                document.querySelector('#read-status-error').style.display = 'block'
            } else {
                document.querySelector('#read-status-error').style.display = ''
            }
        }
    })
}

// Remove input error messages
function clearErrorMessages() {
    const errorMessags = document.querySelectorAll('.empty-field-error');
    Array.from(errorMessags).forEach(element => element.style.display = '')
}

// Create the book element div
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

// Create book div text content
function populateBookDiv(ele, obj) {
    const title = ele.querySelector('.title')
    const author = ele.querySelector('.author')
    const pages = ele.querySelector('.pages')
    title.textContent = obj.title
    author.textContent = obj.author
    pages.textContent = obj.pages
    
}

// Toggle the read status
function createReadToggle(ele) {
    const readBtn = document.createElement('button')
    readBtn.classList.add('read-btn')
    readBtn.textContent = ele.readStatus
    return readBtn
}

// Close new book modal
function closeNewBookForm() {
    const newBookModalInputs = newBookForm.querySelectorAll('input')
    newBookForm.style.display = 'none';
    grayBackgroundDiv.style.display = 'none';

    Array.from(newBookModalInputs).forEach(element => {
        element.type == 'text' ? element.value = "" : element.checked = false
    })
}

// Sets books array to local storage

function setLocalStorage() {
    localStorage.setItem('storedBooks', JSON.stringify(books));
}


// Gets book array from local storage
function getLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('storedBooks'));
    if (storedBooks !== null) {
        books = storedBooks
        books.forEach(ele => createElements(ele)) // creates div for each item in stored local storage
    }
    
}
 
libraryContainer.addEventListener('click', (e) => {
    // Changes read status of book
    if (e.target.classList.contains('read-btn')) {
        let readBtnText = e.target.textContent == 'Read' ? 'Not Read' : 'Read'
        const identifier = e.target.parentElement.getAttribute('data-id');
        e.target.textContent = readBtnText
        books.forEach(((book) => {
            if (book.id == identifier) {
                book.readStatus = readBtnText
            }
        }))
        setLocalStorage()
    }

    // Deletes book object from book array
    if (e.target.classList.contains('delete')) {
        const identifier = e.target.parentElement.getAttribute('data-id');
        books.forEach(((book, index) => {
            if (book.id == identifier) books.splice(index, 1)
        }))
        
        e.target.parentElement.remove();
        setLocalStorage()
    }
})

// Displays new book modal
NewBookModalBtn.addEventListener('click', () => {
    newBookForm.style.display = 'flex';
    grayBackgroundDiv.style.display = 'block';
})

// Closes new book modal
closeModalBtn.addEventListener('click', () => {
    closeNewBookForm()
    clearErrorMessages()
})

// Runs on page load to grab local storage key
getLocalStorage()