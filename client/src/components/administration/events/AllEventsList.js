import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from '../../../actions/modals.actions';
import * as loadersActions from '../../../actions/loaders.actions';
import * as eventsActions from '../../../actions/events.actions';
import Pagination from "react-js-pagination";
import EventRow from './EventRow';
import { BarLoader } from 'react-css-loaders';
import AddEventModal from './../../events/common/AddEventModal';
import * as constants from '../../../utils/constants';

class AllEventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    componentDidMount() {
        this.props.showLoader();
        this.props.getAllEvents(this.state.activePage);
    }

    render() {
        return (
            this.props.isLoaderVisible ?
            <div className="loader-page">
                <BarLoader color="#4eb980" size="11" />
            </div>:
            <div id="page-content-wrapper administration-box" key="events-list">
                <div id="events">
                    <h2>Events</h2>
                    <button type="button" className="btn btn-main-green" onClick={this.props.openAddEventModal}>+ Add</button>
                    {this.props.events.length > 0 &&
                        [
                        <table key="events-table" className="table">
                            <tbody>
                                <tr>
                                    <th>
                                        Photo
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Start date
                                    </th>
                                    <th>
                                        End date
                                    </th>
                                    <th>
                                        Place
                                    </th>
                                    <th>
                                        City
                                    </th>
                                    <th>
                                        Creator
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {this.props.events.map(event =>
                                    <EventRow key={event._id} event={event} />
                                )}
                            </tbody>
                        </table>,
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.eventsCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>]
                    }
                    
                </div>

                {this.props.isVisibleAddEventModal &&
                    <AddEventModal page={constants.ADMINISTRATION_PAGE} />
                }
            </div>
        )
    }

    selectPage = (page) => {
        this.setState({ activePage: page });
        this.props.getAllEvents(page);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        events: state.administration.events,
        eventsCount: state.administration.eventsCount,
        isVisibleAddEventModal: state.modals.showAddEventModal,
        isLoaderVisible: state.loaders.showLoader
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllEvents: (page) => dispatch(eventsActions.getAllEvents(page)),
        openAddEventModal: () => dispatch(modalsActions.openAddEventModal()),
        showLoader: () => dispatch(loadersActions.showLoader())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEventsList);