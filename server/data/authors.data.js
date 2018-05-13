const { Author } = require('../models')
const getPageOfCollection = require('../utils/pagination');

const itemsPerPage = 10;

module.exports = class AuthorsData {
    getOrAddAuthorByName(firstName, lastName) {
        return new Promise((resolve, reject) => {
            return Author.findOne({ 'first_name': firstName, 'last_name': lastName },
                (err, author) => {
                    if (err) {
                        return reject(err);
                    } else {
                        if (!author) {
                            return this.createAuthorByName(firstName, lastName);
                        }

                        return resolve(author);
                    }
                });
        });
    }

    getAuthorByName(firstname, lastname) {
        return new Promise((resolve, reject) => {
            return Author.findOne({ 'first_name': firstname, 'last_name': lastname },
                (err, author) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(author);
                    }
                });
        });
    }

    createAuthorByName(firstName, lastName) {
        return new Promise((resolve, reject) => {
            const author = new Author();
            author.first_name = firstName;
            author.last_name = lastName;
            author.save((err, createdAuthor) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(createdAuthor);
                }
            });
        });
    }

    createAuthor(author) {
        return new Promise((resolve, reject) => {
            let newAuthor = new Author();
            newAuthor.first_name = author.firstname;
            newAuthor.last_name = author.lastname;
            newAuthor.nationality = author.nationality;
            newAuthor.birth_date = author.birthdate;
            newAuthor.age = author.age;
            newAuthor.biography = author.biography;
            newAuthor.website = author.website;

            newAuthor.save((err, createdAuthor) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(createdAuthor);
                }
            });
        });
    }

    updateAuthor(authorId, author) {
        return new Promise((resolve, reject) => {
            Author.findOneAndUpdate({ _id: authorId }, {
                $set: {
                    first_name: author.firstname,
                    last_name: author.lastname,
                    nationality: author.nationality,
                    birth_date: author.birthdate,
                    age: author.age,
                    biography: author.biography,
                    website: author.website,
                    photo: author.photoUrl
                }
            }, { new: true },
            (err, updatedAuthor) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(updatedAuthor);
                }
            });
        });
    }

    getAuthorById(id) {
        return new Promise((resolve, reject) => {
            return Author.findById(id)
                .populate({ path: 'books', select: 'title summary photo' })
                .exec((err, author) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(author);
                    }
                });
        });
    }

    addBookToAuthorCollection(bookId, authorId) {
        return new Promise((resolve, reject) => {
            Author.findOneAndUpdate({ _id: authorId }, { $push: { books: bookId } },
                { new: true }, (err, savedBook) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(savedBook);
                    }
                });
        });
    }

    getAllAuthors(page) {
        return new Promise((resolve, reject) => {
            Author.find({ 'isDeleted': false })
                .exec((err, authors) => {
                    if (err) {
                        return reject(err);
                    }

                    const pageAuthors = getPageOfCollection(authors, page, itemsPerPage);

                    const data = {
                        authors: pageAuthors,
                        authorsCount: authors.length
                    };

                    return resolve(data);
                });
        });
    }

    deleteAuthor(id) {
        return new Promise((resolve, reject) => {
            Author.findOneAndUpdate({ '_id': id }, {
                $set: {
                    isDeleted: true
                }
            }, { new: true }, (err, author) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            });
        });
    }
}