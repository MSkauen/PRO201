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
        //checkIfLampIsPreviouslyRepaired(2343512324)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


const User = mongoose.model('User', schemas.userSchema)
const RepairedSunbell = mongoose.model('Repaired_Sunbell', schemas.sunbellRepairedSchema)

// FUNSKJON FOR Å SENDE INN SKJEMA OM REPARERT LAMPE

const addNewRepairSchema = async (username, serial, location, partsChanged) => {

    const newSunbellRepairSchema = new RepairedSunbell({
        user: username,
        partsChanged: partsChanged,
        location: location,
        serial: serial
    })
    console.log(newSunbellRepairSchema)

    //console.log(newSunbellRepairSchema)
     await newSunbellRepairSchema.save().then(() => {
        console.log('item was saved successfully')
    })
    return newSunbellRepairSchema

}

const updateRepairSchema = async (username, serial, partsChanged) => {

    return await RepairedSunbell.findOneAndUpdate(
        {
            serial: serial
        },
        {
            user: username,
            partsChanged: partsChanged,
            serial: serial
        },
    ).then((i) => {
        return i
        console.log('item was updated successfully')
    }).catch( (err) => {
        console.log(err.message)
    })
}

// FUNKSJON FOR Å SJEKKE OM BRUKEREN FINS I DATABASEN

const checkIfValidUser = async (username) => {
    return await User.findOne({username}).then( (u) => {
        console.log("U: "+u)
        return u
    }).catch( (err) => {
        console.log(err.message)
    })
}

const checkIfLampIsPreviouslyRepaired = async (serial) => {
    console.log("SERIAL: "+serial)
    let item = await RepairedSunbell.findOne({serial}).then( (t) => {
        console.log("t: " + t)
        return t
    }).catch( (err) => {
        console.log(err.message)
    })
    return item
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


module.exports = {
    connectDB: connectDB,
    checkIfValidUser: checkIfValidUser,
    checkIfLampIsPreviouslyRepaired: checkIfLampIsPreviouslyRepaired,
    addNewRepairSchema: addNewRepairSchema,
    updateRepairSchema: updateRepairSchema
    };