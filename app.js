const myLibrary = [];

function Book(title, author, noOfPages, read) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.hasRad = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    const readStatus = this.hasRead ? "read" : "has not read";
    return `${this.title} by ${this.author}, ${this.noOfPages}, ${this.readStatus}`;
  };
}

function addBooksToLibrary(title, author, noOfPages, read) {
  let book = new Book(title, author, noOfPages, read);
  myLibrary.push(book);
}
