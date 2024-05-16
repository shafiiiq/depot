var db = require('../db/db');
const bcrypt = require('bcrypt');

module.exports = {
    signUp: (userData, callback) => {
        return new Promise(async (resolve, reject) => {

            if (userData.phoneNumber) {
                var user = await db.get().collection('userSignup').findOne({ phoneNumber: userData.phoneNumber })
            } else {
                var user = await db.get().collection('userSignup').findOne({ email: userData.email })
            }
            
            // if user is alreay exists 
            if (user) {
                resolve(false)
            } else {
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection('userSignup').insertOne(userData).then((data) => {
                    resolve(data.insertedId)
                })
            }
        })
    },
    login: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            if (userData.phoneNumber) {
                var user = await db.get().collection('userSignup').findOne({ phoneNumber: userData.phoneNumber })
            } else {
                var user = await db.get().collection('userSignup').findOne({ email: userData.email })
            }

            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('Login succes');
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("Login failed");
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("Login failed");
                resolve({ status: false })
            }
        })
    }
}