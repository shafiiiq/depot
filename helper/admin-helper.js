const bcrypt = require('bcrypt');
var db = require('../db/db') 


module.exports = {
    signUp: (userData, callback) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection('adminSignup').insertOne(userData).then((data) => {
                resolve(data.insertedId)
            })
        })
    },
    login: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let admin = await db.get().collection('adminSignup').findOne({ email: userData.email })
            if (admin) {
                bcrypt.compare(userData.password, admin.password).then((status) => {
                    if (status) {
                        console.log('Login succes');
                        response.admin = admin
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
    },

    addProducts: (productData, callback) => {
        db.get().collection('warehouse').insertOne(productData).then(data => {
            const insertedId = data?.insertedId?.toString();
            callback(insertedId);
        });
    }
}