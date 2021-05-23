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
    repairman: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    partsChanged: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: false
    }
})

module.exports = {userSchema, sunbellRepairedSchema}