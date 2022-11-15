function getBooks(data) {
    return data
}
function getNBooks(books,count) {
    const newBooks = []
    for(let i = 0; i < count-1; i++) {
        newBooks.push(books[i])
    }
    return newBooks
}
function renderedBooks(book,htmls) {
    const bookImageUrl = book.parselyMeta['parsely-image-url']
    const booklink = book.parselyMeta['parsely-link']
    const bookTitle = book.title.rendered
    const bookdate = book.date
    htmls.push(
        `
        <div class="c-2 book-item">
            <img src="${bookImageUrl}" alt="" class="book-item__image">
            <div class="book-item__content">
                <h3 class="book-item__title">${bookTitle}</h3>
                <p class="book-item__date">${bookdate}</p>
            </div>
            <div class="book-item__overlay">
                <a href="${booklink}" class="book-item__direct-page" target="_blank">View More</a>
            </div>
        </div>
        `
    )
    htmls.join('')
    document.querySelector(".books-container").innerHTML = htmls
}

function handleRenderBooks() {
    const API = "https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed"
    
    fetch(API)
    .then((response)=> {
        return response.json()
    })
    
    .then((data)=> {
        let countBooksForRender = 11
        const loadMoreButton = document.querySelector(".books-load-more")
        const books = getBooks(data)
        const newBooks = getNBooks(books,countBooksForRender)
        let htmls = []
        newBooks.forEach((book)=> {
            renderedBooks(book,htmls)
        })    
    })
}
function app() {
    handleRenderBooks()
}
app()