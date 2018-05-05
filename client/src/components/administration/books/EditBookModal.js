import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import * as booksActions from '../../../actions/books.actions';
import * as modalsActions from '../../../actions/modals.actions';

class EditBookModal extends Component {
    state = {
        title: this.props.book.title,
        isbn: this.props.book.isbn,
        summary: this.props.book.summary,
        photo: this.props.book.photo,
        language: this.props.book.language,
        publisher: this.props.book.publisher,
        genres: []
    };

    render() {
        return (
            <Modal visible={true} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Edit book</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-title">Title</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-title" value={this.state.title || ''} type="text" onChange={(event) => this.handleTitleChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-photo">Photo</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-photo" value={this.state.photo || ''} type="text" onChange={(event) => this.handlePhotoChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-isbn">ISBN</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-isbn" value={this.state.isbn || ''} type="text" onChange={(event) => this.handleIsbnChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-publisher">Publisher</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-publisher" value={this.state.publisher || ''} type="text" onChange={(event) => this.handlePublisherChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-language">Language</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-language" value={this.state.language || ''} type="text" onChange={(event) => this.handleLanguageChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-summary">Summary</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-summary" value={this.state.summary || ''} type="text" onChange={(event) => this.handleSummaryChange(event)} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.submitBook}>
                        Edit
          </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeEditBookModal}>
                        Cancel
          </button>
                </div>
            </Modal>
        )
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleIsbnChange = (event) => {
        this.setState({ isbn: event.target.value });
    }

    handlePublisherChange = (event) => {
        this.setState({ publisher: event.target.value });
    }

    handleSummaryChange = (event) => {
        this.setState({ summary: event.target.value });
    }

    handlePhotoChange = (event) => {
        this.setState({ photo: event.target.value });
    }

    handleLanguageChange = (event) => {
        this.setState({ language: event.target.value });
    }

    handleGenresChange = (event) => {

    }

    submitBook = () => {
        const book = {
            title: this.state.title,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            summary: this.state.summary,
            photo: this.state.photo,
            language: this.state.language
        };

        this.props.saveBook(book);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isVisibleEditBook: state.modals.showEditBookModal
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveBook: (book) => dispatch(booksActions.editBook(book)),
        closeEditBookModal: () => dispatch(modalsActions.closeEditBookModal())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBookModal);
