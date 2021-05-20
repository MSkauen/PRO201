const mongoose = require('mongoose')

const mongodb = 'mongodb+srv://brightdbUser:passcodeBrightDb@bright.df4mk.mongodb.net/Bright_database?retryWrites=true&w=majority'
// const UsersModel = mongoose.model('users', null)

const connectDB = async ( ) => {
    try {
        await mongoose.connect(mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Connected successfully to mongoDB' + mongodb.toString())
        addNewMember()
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    sunbell_video_progress: {
        type: Array,
        required: false
    }
})

const addNewMember = async () => {
    const marcos = new User({name: 'Marcos'})
    await marcos.save()
}



const checkIfValidUser = async ( ) => {
    try {
        console.log( await mongoose.User.find(marcos) )
    } catch (err) {
        console.error(err.message)
    }
}

checkIfValidUser()

module.exports = connectDB;