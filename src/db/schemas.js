const mongoose = require('mongoose')


const CoursePart = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    access: {
        type: Boolean,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    contentUrl: {
        type: String,
        required: true,
    },
    courseProgress: {
        type: Number,
        required: false,
    }
})

const Course = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    access: {
        type: Boolean,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    courseParts: {
        type: [CoursePart],
        required: true,
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    certification: {
        type: String,
        required: false
    },
    courses: {
        type: [Course],
        required: false,
    }
})

const RepairedProductSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: false
    },
    partsChanged: { type: [Number] },
    date: {
        type: Date,
        required: false,
        default: Date.now
    },
    location: {
        type: {
            latitude: Number,
            longitude: Number
        },
        required: false
    }
})

module.exports = {
    userSchema: UserSchema,
    repairedProductSchema: RepairedProductSchema,
}