const { Event } = require('../models');
const getPageOfCollection = require('../utils/pagination');
const itemsPerPage = 18;

module.exports = class EventsData {
    getUserEvents(id, page) {
        return new Promise((resolve, reject) => {
            Event.find({ 'creator': id })
                .populate('creator')
                .exec((err, events) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const eventsOnPage = getPageOfCollection(events, page, itemsPerPage);

                        let result = {
                            events: eventsOnPage,
                            eventsCount: events.length
                        };

                        return resolve(result);
                    }
                });
        });
    }

    getAllEvents(page) {
        return new Promise((resolve, reject) => {
            Event.find({ 'isDeleted': false })
                .populate({ path: 'genres', select: 'name' })
                .populate('creator')
                .sort({ 'start_date ': '-1' })
                .exec((err, events) => {
                    if (err) {
                        return reject(err);
                    }

                    const pageEvents = getPageOfCollection(events, page, itemsPerPage);

                    const data = {
                        events: pageEvents,
                        eventsCount: events.length
                    };

                    return resolve(data);
                });
        });
    }

    getEventById(id) {
        return new Promise((resolve, reject) => {
            return Event.findOne({ '_id': id, 'isDeleted': false },
                (err, event) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(event);
                    }
                });
        });
    }


    createEvent(newEvent) {
        return new Promise((resolve, reject) => {
            let event = new Event();
            event.title = newEvent.title;
            event.start_date = newEvent.start_date;
            event.end_date = newEvent.end_date;
            event.place = newEvent.place;
            event.city = newEvent.city;
            event.details = newEvent.details;
            event.photo = newEvent.photo;
            event.creator = newEvent.creatorId;
            // if (newEvent.book) {
            //     event.book = newEvent.bookId;                
            // }
            event.genres = newEvent.genres;

            event.save((err, createdEvent) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(createdEvent);
                }
            });
        });
    }

    updateEvent(eventId, event) {
        return new Promise((resolve, reject) => {
            Event.findOneAndUpdate({ _id: eventId }, {
                $set: {
                    title: event.title,
                    start_date: event.start_date,
                    end_date: event.end_date,
                    place: event.place,
                    city: event.city,
                    photo: event.photo,
                    details: event.details,
                    genres: event.genres
                }
            },
                { new: true })
                .populate({ path: 'genres', select: 'name' })
                .populate('creator')
                .exec((err, savedEvent) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(savedEvent);
                    }
                });
        });
    }

    deleteEvent(id) {
        return new Promise((resolve, reject) => {
            Event.findOneAndUpdate({ '_id': id }, {
                $set: {
                    isDeleted: true
                }
            }, { new: true }, (err, event) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            });
        });
    }
}