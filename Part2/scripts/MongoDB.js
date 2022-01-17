const MongoClient = require('mongodb').MongoClient;

const username = 'Iason-Ziwgas'
const password = 'ExpressEdu56'
const host = 'cluster0.ngzpo.mongodb.net/ExpressEduDB'



const uri =  `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = client;