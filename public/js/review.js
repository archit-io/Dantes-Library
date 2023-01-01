if(document.querySelector('#submit')){
    document.querySelector('#submit').addEventListener('click', postReview)
} 
document.querySelector('#bookSearch')
if(document.querySelector('.searchBtn')){
    document.querySelector('.searchBtn').addEventListener('click', getThumbnailImage)
}
const books = document.getElementById('booksSelection')
if(books){
    books.addEventListener('change', changeBook)

}

if(document.querySelector('#update')){
    document.querySelector('#update').addEventListener('click', updateReview)
}

const addToReadinglist = document.querySelectorAll('#addToList')

Array.from(addToReadinglist).forEach((el)=>{
    el.addEventListener('click', addToList)
})


let currentBooks = []
let title = ''
let overview = ''
let thumbnailImage = ''

async function getThumbnailImage () {
    const book = document.querySelector('#bookSearch').value

    while (books.firstChild) {
        books.removeChild(books.firstChild)
    }

    try {
        const res = await fetch('./getThumbnailImage', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'book': book,
            })
        })
        const data = await res.json()
        currentBooks = data.items //data.results changedd
        console.log(currentBooks)

        if (currentBooks.length > 1) {
            const selected = document.createElement('option')
            selected.text = 'Select a book below'
            books.appendChild(selected)
            currentBooks.forEach(book => {
                const currBook = document.createElement('option')
                currBook.setAttribute('id', book.id)
                currBook.value = book.volumeInfo.title
                currBook.text = `Book: ${book.volumeInfo.title}, Authors: ${book.volumeInfo.authors}`
                books.appendChild(currBook)
            })
        } else {
            title = data.items[0].volumeInfo.title
            overview = data.items[0].volumeInfo.subtitle
            thumbnailImage = data.items[0].volumeInfo.imageLinks.thumbnail

            document.querySelector('.bookTitle').innerText = title
            document.querySelector('.bookDesc').innerText = overview
            document.querySelector('.bookThumbnailImage').src = thumbnailImage
        }
        books.toggleAttribute('hidden')
        books.style.display = 'inherit'

    } catch (err) {
        console.error(err)
    }
}

function changeBook (e) {
    const id = e.target.selectedOptions[0].id
    const selectedMov = currentBooks.filter(book => book.id == id)

    title = selectedMov[0].volumeInfo.title
    overview = selectedMov[0].volumeInfo.description
    thumbnailImage = selectedMov[0].volumeInfo.imageLinks.thumbnail
    

    document.querySelector('.bookTitle').innerText = title
    document.querySelector('.bookDesc').innerText = overview
    document.querySelector('.bookThumbnailImage').src = thumbnailImage
}

async function postReview () {
    const reviewText = document.querySelector('#review').value;
    const stars = displayRadioValue()
    if (!title) {
        alert('Please select a book')
    }
    else if (!reviewText || !stars) {
        alert('Please complete a review by entering text and selecting a star rating')
    }
    else {
        try {
            const response = await fetch('./createReview', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'review': reviewText,
                    'book': title,
                    'rating': stars,
                    'thumbnailImage': thumbnailImage
                })
            })
            const data = await response.json()
            console.log(data)
            location.replace('./')
        } catch (err) {
            console.log(err)
        }
    }
}

async function updateReview () {
    const newReview = document.querySelector('#review').value
    const stars = Number(displayRadioValue())
    console.log(stars)


    const id = window.location.pathname.split("/").pop()

    try {
        const response = await fetch('../updateReview', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'review': newReview,
                'rating': stars,
                'id': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.replace('../')
    } catch (err) {
        console.log(err)
    }


    const data = await response.json()
    console.log(data)
    location.replace('../../')
}

function displayRadioValue () {
    var ele = document.getElementsByName('rate');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return ele[i].value
    }
}

async function addToList(){
    const title = this.parentNode.querySelector('.bookTitle').innerText
    const thumbnailImage = this.parentNode.querySelector('.bookThumbnailImage').src
    console.log(title)

    try{
        const response = await fetch('../readinglist/addToReadinglist', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'book': title,
                'thumbnailImage': thumbnailImage
            })
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
