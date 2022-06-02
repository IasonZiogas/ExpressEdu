const MongoClient = require('mongodb').MongoClient;

const username = ''
const password = ''
const host = ''



const uri =  `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = client;