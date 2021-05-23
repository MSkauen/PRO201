const mongoose = require('mongoose')
const schemas = require('./schemas')
const mongodb = require('./dbconfig')

const connectDB = async ( ) => {
    try {
        await mongoose.connect(mongodb.mongodbpasscode, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Connected successfully to mongoDB')
        findUserWithName('egilwiththechills')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


const User = mongoose.model('User', schemas.userSchema)

// const addNewMember = async () => {
//     const marcos = new User({name: 'Marcos'})
//     await marcos.save()
// }

const findUserWithName = async (name) => {
    await User.findOne({username: name}, ( err, res ) => {
        if (err) {
            console.log('kunne ikke finne noe')
        }
        console.log(res)
    })
}




// const checkIfValidUser = async () => {
//     try {
//         console.log( await User.find(marcos) )
//     } catch (err) {
//         console.error(err.message)
//     }
// }

// checkIfValidUser()

module.exports = connectDB;