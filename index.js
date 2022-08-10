const bookForm = document.getElementById('book-form');
const titleForm = bookForm.elements['title-input'];
const authorForm = bookForm.elements['author-input'];
const bookList = document.getElementById('books-list');

class Book {
	booksArray = []

	constructor() {
		this.getLocalStorage()
		console.log("creating book object")
		console.log(this.booksArray)
	}

	inArray(id) {
		for (let book of this.booksArray) {
			if (book.Title.includes(id)) {
				return true;
			}
			return false;
		}
	}

	addBookToArray(title, author) {
		//Check for empty book and add book to booksArray 
		if (title && author) {
			if (!this.inArray(title)) {
				this.booksArray = [...this.booksArray, {
					"id": title,
					"Title": title,
					"Author": author
				}];
			}
		}		
	}

	createElt(elt, clsName, textContent = '') {
		let elt1 = document.createElement(elt);
		elt1.clsName = clsName;
		if (textContent !== "") {
			elt1.textContent = textContent;
		}
		return elt1;
	}

	displayPage() {
		bookList.innerHTML = '';
		this.booksArray.forEach(this.addToPage);		
	}

	addToPage(book) {
		//if (title && author) 
		const div = document.createElement('div');
		div.innerHTML = `
		<p>${book.Title}</p>
		<p>${book.Author}</p>
		<button id="${book.Title}" type="submit" onclick= book.removeBook(this.id)>Remove</button>
		<hr>
		`
		bookList.appendChild(div);
	}

	// Update booksArray with data from localStorage
	getLocalStorage() {
		// Check if data is in storage and convert to js object
		if (localStorage.getItem('bookList')) {
			this.booksArray = JSON.parse(localStorage.getItem('bookList'));
		}
	}

	setLocalStorage() {
		localStorage.setItem('bookList', JSON.stringify(this.booksArray));
	}

	removeBook(title) {
		this.booksArray = this.booksArray.filter((book) => book.Title !== title);
		bookList.innerHTML = '';
		this.setLocalStorage('bookList', this.booksArray);
		this.displayPage()
	}
}

const book = new Book()

window.addEventListener('load', (e) => {
	book.displayPage();
});

bookForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const title = titleForm.value;
	const author = authorForm.value;

	book.addBookToArray(title, author);
	book.setLocalStorage()
	book.displayPage();

	titleForm.value = "";
	authorForm.value = "";
});