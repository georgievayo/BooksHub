import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
import '../../style/profile.css';
import Information from './profile-partials/Information';
import BooksList from './profile-partials/BooksList';
import EventsList from './profile-partials/EventsList';
import CommentsList from './profile-partials/CommentsList';
import FriendsList from './profile-partials/FriendsList';
import InvitationsList from './profile-partials/InvitationsList';

class ProfilePage extends Component {
    state = { links: ['active', '', '', '', '', '', '', '', '', ''] };
    render() {
        return (
            this.props.user !== null ?
                [<header key="profile-header" className="section background-image text-center">
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        {this.props.user.username === this.props.currentUser ?
                            <span>Hello, {this.props.user.first_name} {this.props.user.last_name}!</span> :
                            <span>{this.props.user.first_name} {this.props.user.last_name}</span>
                        }
                    </h1>
                    <img className="arrow-object" src="img/arrow-object-white.svg" alt="arrow" />
                </header>,
                <section key="profile-section" className="background-white dashboard section">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebar">
                                <div className="widget user-dashboard-profile">
                                    <div className="profile-thumb text-center">
                                        <img src={this.props.user.photo} className="rounded-circle" alt="user-avatar" />
                                    </div>
                                    <h5 className="text-center">{this.props.user.first_name} {this.props.user.last_name}</h5>
                                    <p>{this.props.user.username}</p>
                                    {this.props.currentUser === this.props.user.username &&
                                        <button type="button" className="btn btn-main-green" data-toggle="modal" data-target="#edit-modal">Edit Profile</button>
                                    }
                                </div>
                                <div className="widget user-dashboard-menu">
                                    <ul>
                                        <li className={this.state.links[0]} id="profile-info" onClick={this.changeContent}>
                                            <i className="fa fa-user"></i> Information
                                        </li>
                                        <li className={this.state.links[1]} id="currently-reading-link" onClick={this.changeContent}>
                                            <i className="fa fa-book"></i> Currently reading
                                        </li>
                                        <li className={this.state.links[2]} id="want-to-read-link" onClick={this.changeContent}>
                                            <i className="fa fa-bookmark-o"></i> Want to read
                                        </li>
                                        <li className={this.state.links[3]} id="read-link" onClick={this.changeContent}>
                                            <i className="fa fa-file-archive-o"></i> Read
                                        </li>
                                        <li className={this.state.links[4]} id="my-events-link" onClick={this.changeContent}>
                                            <i className="fa fa-calendar"></i> {this.props.currentUser === this.props.user.username && <span>My</span>} Events
                                        </li>
                                        <li className={this.state.links[5]} id="joined-events-link" onClick={this.changeContent}>
                                            <i className="fa fa-bookmark-o"></i> Joined Events
                                        </li>
                                        <li className={this.state.links[6]} id="reviews-link" onClick={this.changeContent}>
                                            <i className="fa fa-comments"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Reviews
                                        </li>
                                        <li className={this.state.links[7]} id="comments-link" onClick={this.changeContent}>
                                            <i className="fa fa-comments"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Comments
                                        </li>
                                        <li className={this.state.links[8]} id="friends-link" onClick={this.changeContent}>
                                            <i className="fa fa-users"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Friends
                                        </li>
                                        {this.props.currentUser === this.props.user.username &&
                                            <li className={this.state.links[9]} id="invitations-link" onClick={this.changeContent}>
                                                <i className="fa fa-user"></i>Pending invitations
                                        </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {this.state.links[0] === 'active' &&
                                <Information user={this.props.user} />
                            }
                            {this.state.links[1] === 'active' &&
                                <BooksList books={this.props.user.statuses.filter(status => status.name === 'CurrentlyReading')} 
                                    title="Currently Reading Collection" />
                            }
                            {this.state.links[2] === 'active' &&
                                <BooksList books={this.props.user.statuses.filter(status => status.name === 'WantToRead')} 
                                    title="Want to Read Collection" />
                            }
                            {this.state.links[3] === 'active' &&
                                <BooksList books={this.props.user.statuses.filter(status => status.name === 'Read')} 
                                    title="Read Books Collection" />
                            }
                            {this.state.links[4] === 'active' &&
                                <EventsList events={this.props.user.events} title="Events Collection" 
                                    isMyProfile={this.props.user.username === this.props.currentUser}/>
                            }
                            {this.state.links[5] === 'active' &&
                                <EventsList events={this.props.user.joined_events} title="Joined Events Collection" 
                                    isMyProfile={false} />
                            }
                            {this.state.links[6] === 'active' &&
                                <CommentsList comments={this.props.user.reviews} title="Reviews Collection" 
                                    isMyProfile={this.props.user.username === this.props.currentUser} />
                            }
                            {this.state.links[7] === 'active' &&
                                <CommentsList comments={this.props.user.comments} title="Comments Collection" 
                                    isMyProfile={this.props.user.username === this.props.currentUser} />
                            }
                            {this.state.links[8] === 'active' &&
                                <FriendsList users={this.props.user.friends} title="Friends Collection" />
                            }
                            {this.state.links[9] === 'active' &&
                                <InvitationsList invitations={this.props.user.requests} title="Pending Invitations Collection" />
                            }
                        </div>
                    </div>
                </section>
                ] :
                <div className="loader"></div>
        )
    }

    changeContent = (event) => {
        switch (event.target.id) {
            case 'currently-reading-link':
                this.setState({ links: ['', 'active', '', '', '', '', '', '', '', ''] });
                break;
            case 'want-to-read-link':
                this.setState({ links: ['', '', 'active', '', '', '', '', '', '', ''] });
                break;
            case 'read-link':
                this.setState({ links: ['', '', '', 'active', '', '', '', '', '', ''] });
                break;
            case 'my-events-link':
                this.setState({ links: ['', '', '', '', 'active', '', '', '', '', ''] });
                break;
            case 'joined-events-link':
                this.setState({ links: ['', '', '', '', '', 'active', '', '', '', ''] });
                break;
            case 'reviews-link':
                this.setState({ links: ['', '', '', '', '', '', 'active', '', '', ''] });
                break;
            case 'comments-link':
                this.setState({ links: ['', '', '', '', '', '', '', 'active', '', ''] });
                break;
            case 'friends-link':
                this.setState({ links: ['', '', '', '', '', '', '', '', 'active', ''] });
                break;
            case 'invitations-link':
                this.setState({ links: ['', '', '', '', '', '', '', '', '', 'active'] });
                break;
            default:
                this.setState({ links: ['active', '', '', '', '', '', '', '', '', ''] });
                break;
        }
    };
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    return {
        user: state.users.profile,
        currentUser: username
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getProfile: dispatch(usersActions.getProfile(ownProps.match.params.username))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);