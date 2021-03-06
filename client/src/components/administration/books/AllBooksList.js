import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookRow from './BookRow';
import Pagination from "react-js-pagination";
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';
import { BarLoader } from 'react-css-loaders';
import * as booksActions from '../../../actions/books.actions';
import * as modalsActions from '../../../actions/modals.actions';
import * as loadersActions from '../../../actions/loaders.actions';

class AllBooksList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        this.props.showLoader();
        this.props.getAllBooks(this.state.activePage);
    }

    render() {
        return (
            this.props.isLoaderVisible ?
                <div className="loader-page">
                    <BarLoader color="#4eb980" size="11" />
                </div> :
                <div id="page-content-wrapper administration-box" key="books-list">
                    <div id="books">
                        <h2>Books</h2>
                        <button type="button" className="btn btn-main-green" onClick={this.props.openAddBookModal}>+ Add</button>
                        {this.props.books.length > 0 &&
                            [<table key="books-table" className="table">
                                <tbody>
                                    <tr>
                                        <th>
                                            PhotoUrl
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            ISBN
                                        </th>
                                        <th>
                                            Published
                                        </th>
                                        <th>
                                            Author
                                        </th>
                                        <th>
                                            Publisher
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {this.props.books.map(book =>
                                        <BookRow key={book._id} book={book} />
                                    )}
                                </tbody>
                            </table>,

                            <div key="pages" className="row">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.props.booksCount}
                                    pageRangeDisplayed={5}
                                    onChange={this.selectPage}
                                />
                            </div>]
                        }

                    </div>
                    {this.props.isVisibleAddBookModal &&
                        <AddBookModal />
                    }
                    {this.props.isVisibleEditBookModal &&
                        <EditBookModal />
                    }
                </div>
        )
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.props.getAllBooks(pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        books: state.administration.books,
        booksCount: state.administration.booksCount,
        isVisibleAddBookModal: state.modals.showAddBookModal,
        isVisibleEditBookModal: state.modals.showEditBookModal,
        isLoaderVisible: state.loaders.showLoader
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllBooks: (pageNumber) => dispatch(booksActions.getAllBooks(pageNumber)),
        openAddBookModal: () => dispatch(modalsActions.openAddBookModal()),
        showLoader: () => dispatch(loadersActions.showLoader())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooksList);
