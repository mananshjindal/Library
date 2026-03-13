const myLibrary = [];
const books = document.querySelector(".books-container");
const btn = document.querySelector(".add-book-button");
const dialog = document.querySelector(".add-book-dialog");
const btn_cancel = document.querySelector(".cancel");
const form = document.querySelector("form");

function Book(title, author, noOfPages, read) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.hasRead = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    const readStatus = this.hasRead ? "read" : "has not read";
    return `${this.title} by ${this.author}, ${this.noOfPages}, ${readStatus}`;
  };
}

function addBooksToLibrary(title, author, noOfPages, read) {
  let book = new Book(title, author, noOfPages, read);
  myLibrary.push(book);
}

function displayBooks() {
  books.innerHTML = "";
  for (let item of myLibrary) {
    let div = document.createElement("div");
    div.classList = "book-card";
    let p_title = document.createElement("p");
    let p_author = document.createElement("p");
    let p_noOfPages = document.createElement("p");
    let p_hasRead = document.createElement("p");
    p_title.textContent = item.title;
    p_author.textContent = item.author;
    p_noOfPages.textContent = item.noOfPages;
    p_hasRead.textContent = item.hasRead ? "read" : "has not read";
    div.append(p_title, p_author, p_noOfPages, p_hasRead);
    books.append(div);
  }
}

// submit button handling
form.addEventListener("submit", (e) => {
  addBooksToLibrary(
    e.target.querySelector("#title").value,
    e.target.querySelector("#author").value,
    e.target.querySelector("#pages").value,
    e.target.querySelector("#read").checked,
  );
  displayBooks();
  dialog.close();
  form.reset();
  e.preventDefault();
});

btn.addEventListener("click", () => {
  dialog.showModal();
});

btn_cancel.addEventListener("click", () => {
  dialog.close();
});

// Code to close the dialog when user clicks on webpage
dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

addBooksToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBooksToLibrary("Atomic Habits", "James Clear", 320, true);
addBooksToLibrary("1984", "George Orwell", 328, false);
addBooksToLibrary("The Alchemist", "Paulo Coelho", 208, true);
addBooksToLibrary("Clean Code", "Robert C. Martin", 464, false);

displayBooks();
