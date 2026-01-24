

class IssuedBook {
    _id;
    name;
    author;
    price;
    genre;
    publisher;
    issuedDate;
    returnDate;

    constructor(user){
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.price = user.issuedBook.price;
        this.genre = user.issuedBook.genre;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy= user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}

module.exports = IssuedBook;
