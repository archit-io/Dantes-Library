document.querySelector('#submitToList').addEventListener('click', addToReadinglist)
if(document.querySelector('.searchBook')){
    document.querySelector('.searchBook').addEventListener('click', findBook)
}

const deleteFromList = document.querySelectorAll('.delete')

Array.from(deleteFromList).forEach((el)=>{
    el.addEventListener('click', deleteReadinglistItem)
})

async function findBook(){
    const book = document.querySelector('#bookSearch').value
    try{
        const res = await fetch('./reviews/getThumbnailImage', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'book': book,
            })
        })
        const data = await res.json()

        
        const title = data.items[0].volumeInfo.title
        const overview = data.items[0].volumeInfo.description
        //const thumbnailImage = data.results[0].thumbnailImage_path
        document.querySelector('.bookTitle').innerText = title
        document.querySelector('.bookDesc').innerText = overview
        document.querySelector('.bookThumbnailImage').src = data.items[0].volumeInfo.imageLinks.thumbnail
    }catch(err){
        console.error(err)
    }
}

async function addToReadinglist(){

    const title = document.querySelector('.bookTitle').innerText
    const thumbnailImage = document.querySelector('.bookThumbnailImage').src

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
        location.replace('./readinglist')
    }catch(err){
        console.log(err)
    }
}

async function deleteReadinglistItem() {

    const listItemId = this.parentNode.dataset.id
    console.log(listItemId)
    try{
        const response = await fetch('./readinglist/deleteReadinglistItem', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'listItemIdFromJSFile': listItemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
