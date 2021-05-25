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
    tag: {
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
        type: String,
        required: false
    }
})

module.exports = {
    userSchema: userSchema, 
    sunbellRepairedSchema: sunbellRepairedSchema}