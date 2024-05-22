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
    },

    searchResult: (searchKey) => {
        let words = searchKey.split(" ");
        let Keywords = [];
        let stopWords = ["a", "an", "the", "in", "on", "at", "to", "of", "for", "with", "by", "as", "from", "that", "this", "these", "those", "but", "or", "and", "nor", "not", "be", "am", "is", "are", "was", "were", "been", "have", "has", "had", "do", "does", "did", "will", "would", "shall", "should", "can", "could", "may", "might", "must", "about", "above", "after", "against", "along", "among", "around", "before", "behind", "below", "beneath", "beside", "between", "beyond", "during", "inside", "into", "near", "off", "out", "outside", "over", "past", "through", "throughout", "towards", "under", "underneath", "until", "up", "upon", "without"];
        
        words.forEach(word => {
            let lowercaseWord = word.toLowerCase();
    
            if (!stopWords.includes(lowercaseWord)) {
                Keywords.push(word);
            }
        });
    
        console.log("Keywords:");
        console.log(Keywords);
    
        return new Promise(async (resolve, reject) => {
            // Create an array to hold individual regex patterns for each keyword
            let regexPatterns = Keywords.map(keyword => new RegExp(`\\b${keyword}\\b`, 'i'));
            
            // Create an array to hold $or conditions for each keyword
            let orConditions = regexPatterns.map(pattern => ({ $or: [{ productName: pattern }, { productCategory: pattern }] }));
    
            // Perform the query using $or with all conditions
            let products = await db.get().collection('warehouse').find({ $or: orConditions }).toArray();
            resolve(products);
        });
    },

    getCountedItems: (count) => {
        return new Promise(async (resolve, reject) => {
            const dbConnection = db.get();
            const collection = dbConnection.collection('warehouse');
            
            let products = await collection.find({})
                .sort({ _id: -1 })  // Assuming _id is an ObjectId, sorting by _id in descending order
                .limit(count)
                .toArray();
                
            resolve(products);
            console.log(products);
        });
    }
    
    
}