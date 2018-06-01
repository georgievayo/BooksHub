import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as genresActions from '../../actions/genres.actions';

class EventsResultPartial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: new Set(),
        };
    }

    componentDidMount() {
        this.props.getAllGenres();        
    }

    render() {
        return (
            <div className="panel container" id="search-results-events">
                <div className="row">
                    <div className="col-md-3 filters">
                        <div className="filter">
                            <div className="row">
                                <h4>Filter by Genre:</h4>
                            </div>
                            {this.props.genres.map(genre => 
                                <div key={genre._id} className="row checkbox checkbox-success">
                                    <input id={genre.name} type="checkbox" name="genre" value={genre.name} onChange={this.handleFilterChange} />
                                    <label htmlFor={genre.name}>
                                        {genre.name}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3>Found Events</h3>
                        <div className="row">
                            {this.props.events.map(event =>
                            <div key={event._id} className="card col-lg-3">
                                <Link to={"/events/" + event._id}>
                                    <img height="100px" className="card-img-top img-thumbnail" src={event.photo} alt="" />
                                </Link>
                                <div className="card-block">
                                    <h4 className="card-title">
                                        <Link to={"/events/" + event._id}>{event.title}</Link>
                                    </h4>
                                    <p className="card-text">
                                        <i className="fa fa-calendar"></i> {event.start_date ? event.start_date.split('T')[0] : ''}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            <i className="fa fa-map-marker"></i> {event.place}, {event.city}</small>
                                    </p>
                                </div>
                            </div>
                            )}
                        </div>
                        {/* <div className="row">
                            <div className="col-md-offset-5 pages total center">
                                Page 1 of 1
                                <div className="pagination-container center">
                                    <ul className="pagination">
                                        <li className="active">
                                            <a>1</a>
                                        </li>
                                        <li>
                                            <a>2</a>
                                        </li>
                                        <li>
                                            <a>3</a>
                                        </li>
                                        <li>
                                            <a>4</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }

    handleFilterChange = (event) => {
        console.log(event.target.value + " - " + event.target.checked);

        if (event.target.checked) {
            this.state.filters.add(event.target.value);
        } else {
            this.state.filters.delete(event.target.value);
        }

        if (this.props.searchValue) {
            console.log(this.state.filters);            
            this.props.search(this.props.searchValue, this.state.filters);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        genres: state.administration.genres,        
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllGenres: () => dispatch(genresActions.getAllGenres()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsResultPartial);