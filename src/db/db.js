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
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


const User = mongoose.model('User', schemas.userSchema)
const RepairedSunbell = mongoose.model('Repaired_Sunbell', schemas.repairedProductSchema)

// FUNSKJON FOR Å SENDE INN SKJEMA OM REPARERT LAMPE

const addNewRepairSchema = async (username, serial, location, partsChanged) => {

    const newSunbellRepairSchema = new RepairedSunbell({
        user: username,
        partsChanged: partsChanged,
        location: location,
        serial: serial
    })

     await newSunbellRepairSchema.save().then(() => {
        console.log('item was saved successfully')
    })
    return newSunbellRepairSchema

}

const updateRepairSchema = async (username, serial, partsChanged, location) => {

    return await RepairedSunbell.findOneAndUpdate(
        {
            serial: serial
        },
        {
            user: username,
            location: {
                longitude: location.longitude,
                latitude: location.latitude
            },
            partsChanged: partsChanged,
            serial: serial
        },
    ).then((i) => {
        console.log('item was updated successfully')
        console.log(i)
        return i
    }).catch( (err) => {
        console.log(err.message)
    })
}

const checkIfValidUser = async (username) => {
    return await User.findOne({username}).then( (u) => {
        return u
    }).catch( (err) => {
        console.log(err.message)
    })
}

const checkIfLampIsPreviouslyRepaired = async (serial) => {

    let item = await RepairedSunbell.findOne({serial}).then( (t) => {
        return t
    }).catch( (err) => {
        console.log(err.message)
    })
    return item
}

const getAllProducts = async () => {
    let products = await User.find()
    return products
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
    updateRepairSchema: updateRepairSchema,
    getAllProducts: getAllProducts
    };