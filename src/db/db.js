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
        // findUserWithName('egil1403')
        // addNewRepairSchema('egil1403', [1, 2, 4, 6], 'los angeles', 2343512324)
        // addNewRepairSchema('egil1403', [4, 2], 'oslo', 2329023938)
        // addNewRepairSchema('egil1403', [1, 2, 4, 6], 'los angeles', 09876)
        // addNewRepairSchema('egil1403', [1, 2, 4, 6], 'los angeles', 148625)
        // addNewRepairSchema('egil1403', [12, 5, 8], 'oslo')
        // checkIfValidUser('egil1403')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


const User = mongoose.model('User', schemas.userSchema)
const RepairedSunbell = mongoose.model('Repaired_Sunbell', schemas.sunbellRepairedSchema)

// FUNSKJON FOR Å SENDE INN SKJEMA OM REPARERT LAMPE

const addNewRepairSchema = async (repairman, changed, location, tag = 'unidentable') => {
    const newSunbellRepairSchema = new RepairedSunbell({
        repairman: repairman, 
        partsChanged: [...changed], 
        location: location,
        tag: tag
    })
    await newSunbellRepairSchema.save().then( () => {
        console.log('item was saved successfully')
        console.log(newSunbellRepairSchema.repairman)
    
    }).catch( ( error ) => {
        console.log('there was an error saving')
    })
}

// FUNKSJON FOR Å SJEKKE OM BRUKEREN FINS I DATABASEN

const checkIfValidUser = async (username) => {
    await User.findOne({username}, ( err, res ) => {
        if (err) {
            console.log('something is wrong or could not find user with name' + username)
        } 
        console.log(`${username} was found in the database`)
        console.log(`${res._id}`)
    })
}

// Testing
const findUserWithName = async (name) => {
    await User.findOne({username: name}, ( err, res ) => {
        if (err) {
            console.log('kunne ikke finne noe')
        }
        console.log(res.username)
    })
}


module.exports = connectDB;