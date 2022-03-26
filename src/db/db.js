
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
        return i
    }).catch( (err) => {
        console.log(err.message)
    })
}
const updateUserSchema = async (username, courseId, coursePartId) => {
const user = await checkIfValidUser(username.username)
const part = await getCoursePart(username, coursePartId)
    console.log("PARTTTT: "+ part)
let newUser = user.courses.map( async (p) => {
    const courseParts = p.courseParts

     return courseParts.map( async(t) => {
        console.log("t"+t.id + " " + coursePartId)
        if(t.id === coursePartId){
            t.completed = true
            console.log("PART: " + t)
        } else {
            return
        }
    })
})
    console.log("Newuser: " + JSON.stringify(newUser))
    User.findOneAndUpdate({username: user.username}, {courses: courses})
}
const getCoursePart = async (username, coursePartId) => {
    const user = await checkIfValidUser(username.username)
    console.log(user)
    return await user.courses.map((p) => {
        const courseParts = p.courseParts

        return courseParts.map((t) => {
            if(t.id === coursePartId){
                console.log("PART: " + t + t.completed)
                return t
            }
        })
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
    getAllProducts: getAllProducts,
    updateUserCourseCompletion: updateUserSchema
    };