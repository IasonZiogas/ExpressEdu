// Importing the client so to have access to the database
const client = require ('./MongoDB');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// const { path } = require('express/lib/application');
app.use(bodyParser.json()); 

// configurating the paths of the html,css,script files
app.use(express.static('../public'));
app.use('/images', express.static('../public/images'));
app.use('/scripts', express.static('../scripts'));
app.use('/style', express.static('../style'));


// Creating a class user to sent the information to the database
class User {
    constructor(name, surname, birthday, email, tel, username, password, education) {
      this.name = name;
      this.surname = surname;
      this.birthday = birthday;
      this.email=email;
      this.tel = tel;
      this.username = username;
      this.password = password;
      this.education = education;
    }
  }

var UsersDAO= null

// Creating the initial connection to the database
client.connect()
  .then(() =>{
        UsersDAO = client.db("ExpressEduDB").collection("UsersDAO")
        let server= app.listen(8080)
  })


//   Creeating a new user and adding him to the database
app.post('/users', function(req,res){
    let data = req.body;
    let query = {email: data.email}
    UsersDAO.find(query).toArray()
    .then(userList => {
        console.log(userList.lenght)
        if (userList === undefined){
            let new_user = new User(data.name,data.surname,data.birthday,data.email,data.tel,data.username,data.password,data.education);
            UsersDAO.insertOne(new_user)
            .then(result =>{ 
                return res.sendStatus(201);
            })
        }
        else {
            return res.sendStatus(400);
        }
    })


})


// Searching in the database if the credentials sent by the user are correct
app.post('/users/search', function(req,res){
    let data = req.body;
    let query = {email: String(data.email)}
    UsersDAO.find(query).toArray()
    .then(userList => {
        if (userList === undefined){
            // if user is not found sent appropriate message
            return res.sendStatus(404);
        }
        else {
            // searching if the password matches the user's email
            let userExists = userList.find(({password}) => password === data.password)
            if (userExists === undefined){
                // if the password doesnt match sent appropriate message
                return res.sendStatus(400);
            }
            else {
                // Credentials are correct
                return res.sendStatus(201) ;
            }
        }
    })
})

// Retrieving and sending the information of the users profile
app.get('/users/:email', function(req,res){
    let data = req.params.email;
    console.log(data);
    let query = {email: String(data)}
    UsersDAO.find(query).toArray()
    .then(userList => {
        if (userList === undefined){
            return res.sendStatus(404);
        }
        else {
            let userExists = userList[0];
            res.send(userExists);
        }
    })
})

// Loading the front page to the user when he connects 
app.get('/', function(req,res){
    res.sendFile('index.html');
})
