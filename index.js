const bookForm = document.getElementById('book-form');
const titleForm = bookForm.elements['title-input'];
const authorForm = bookForm.elements['author-input'];
const bookList = document.getElementById('books-list');

class Book {
	booksArray = []
	constructor(id, title, author){
		this.id = id,
		this.title = title,
		this.author = author   
	}

	inArray(id) {
		for (let book of  booksArray) {
			if (book.Title.includes(id)) {
				return true;
		 }
		 return false;
		}
	}

	addBookToArray(title, author){
		//Check for empty book and add book to booksArray 
		if (title && author) {
				if(!inArray(title)){
					const book = new Book(title, title, author);
					this.booksArray = [...this.booksArray, book];
				}      
		}
	}

	createElt(elt, class_name, text_content){
		let elt1 = document.createElement(elt);
		elt1.className = class_name;
		elt1.textContent = text_content;
		return elt1;
	}

	displayPage(){
		this.booksArray.forEach(addToPage);
	}

	addToPage(book) {
		//if (title && author) 
		const div = createElt('div', 'book-items', '');
		const pTitle = createElt('p', 'book-title', `${book.Title}`);
		const pAuthor = createElt('p', 'book-author', `${book.Author}`);			
		const removeBtn = createElt('button', '', 'Remove');
		removeBtn.id = `${book.Title}`;		
		const hr = document.createElement('hr');
		div.appendChild(pTitle);
		div.appendChild(pAuthor);
		div.appendChild(removeBtn);
		div.appendChild(hr);
		bookList.appendChild(div);
		
	}	
	// Update booksArray with data from localStorage
	getLocalStorage() {
		// Check if data is in storage and convert to js object
		if (localStorage.getItem('bookList')) {		    
		    this.booksArray = JSON.parse(localStorage.getItem('bookList'));
		  }
		}
	
	setLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	removeBook(title) {
  	this.booksArray = this.booksArray.filter((book) => book.Title !== title); 
		bookList.innerHTML = '';
    setLocalStorage('bookList', this.booksArray);    
  }
}




document.body.onload = getLocalStorage();

removeBtn.addEventListener('click', (e) => {
   removeBook(e.target.id);
});


bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleForm.value;
  const author = authorForm.value;

  addBookToArray(title, author);

  // store data to localStorage to retain data on pageload
  populateLocalStorage('bookList', booksArray);

  bookList.innerHTML = '';
	displayPage();  
});