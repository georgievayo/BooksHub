const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: Date,
    place: {
        type: String,
        required: true
    },
    city: String,
    details: String,
    photo: {
        type: String,
        default: "https://d.wildapricot.net/images/newsblog/bigstock-events-7444309.jpg"
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    book: {
        type: Schema.ObjectId,
        ref: 'Book'
    },
    genres: [{
        type: Schema.ObjectId,
        ref: 'Genre'
    }],
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }],
    participants: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
  });
  
const Event = mongoose.model('Event', Event);

module.exports = {
    Event
};