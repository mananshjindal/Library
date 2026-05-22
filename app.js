const myLibrary = [];
const books = document.querySelector(".books-container");
const btn_add = document.querySelector(".add-book-button");
const dialog = document.querySelector(".add-book-dialog");
const btn_cancel = document.querySelector(".cancel");
const form = document.querySelector("form");

function Book(title, author, noOfPages, read) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.hasRead = read;
  this.id = crypto.randomUUID();
}

function addBooksToLibrary(title, author, noOfPages, read) {
  let book = new Book(title, author, noOfPages, read);
  myLibrary.push(book);
  displayBooks(book);
}

function displayBooks(item) {
  let div = document.createElement("div");
  div.classList.add("book-card");
  let p_title = document.createElement("p");
  p_title.classList.add("title");
  let p_author = document.createElement("p");
  p_author.classList.add("author");
  let p_noOfPages = document.createElement("p");
  p_noOfPages.classList.add("pages");
  let p_hasRead = document.createElement("p");
  p_hasRead.classList.add("read-status");
  const btn_remove = document.createElement("button");
  btn_remove.textContent = "Remove";
  btn_remove.classList.add("remove");
  div.dataset.id = item.id;
  p_title.textContent = item.title;
  p_author.textContent = item.author;
  p_noOfPages.textContent = item.noOfPages + " " + "pages";
  if (item.hasRead) {
    p_hasRead.textContent = "read";
    p_hasRead.classList.add("read");
  } else {
    p_hasRead.textContent = "not read";
    p_hasRead.classList.add("notRead");
  }
  div.append(p_title, p_author, p_noOfPages, p_hasRead, btn_remove);
  books.append(div);
}

// submit button handling
form.addEventListener("submit", (e) => {
  //server fallback
  if (
    e.target.querySelector("#title").value === "" ||
    e.target.querySelector("#author").value === "" ||
    e.target.querySelector("#pages").value === "" ||
    e.target.querySelector("#pages").value <= 0
  ) {
    alert("Please enter the details");
    return;
  }
  addBooksToLibrary(
    e.target.querySelector("#title").value,
    e.target.querySelector("#author").value,
    e.target.querySelector("#pages").value,
    e.target.querySelector("#read").checked,
  );
  dialog.close();
  form.reset();
  e.preventDefault();
});

books.addEventListener("click", (e) => {
  // read toggle
  if (e.target.classList.contains("read-status")) {
    const card = e.target.closest(".book-card");
    const id = card.dataset.id;
    const book = myLibrary.find((b) => b.id === id);
    book.hasRead = !book.hasRead;
    if (book.hasRead) {
      e.target.textContent = "read";
      e.target.classList.add("read");
      e.target.classList.remove("notRead");
    } else {
      e.target.textContent = "not read";
      e.target.classList.add("notRead");
      e.target.classList.remove("read");
    }
  }
  //remove book
  if (e.target.classList.contains("remove")) {
    const card = e.target.closest(".book-card");
    const id = card.dataset.id;
    const book = myLibrary.find((b) => b.id === id);
    myLibrary.splice(myLibrary.indexOf(book), 1);
    card.remove(book);
  }
});

btn_add.addEventListener("click", () => {
  dialog.showModal();
});

//close dialog
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
