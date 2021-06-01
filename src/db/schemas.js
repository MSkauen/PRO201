const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    sunbell_video_progress: {
        type: Array,
        required: false,
    }
})

const sunbellRepairedSchema = new mongoose.Schema({
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
    userSchema: userSchema, 
    sunbellRepairedSchema: sunbellRepairedSchema}