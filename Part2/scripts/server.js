// Importing the client
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

// the 'database' that holds all the users
// let UsersDAO = []

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

let firstTime = true;

app.post('/users', function(req,res){
    let data = req.body;
    let query = {email: data.email}
    UsersDAO.find(query).toArray()
    .then(userList => {
        console.log(userList.lenght)
        if (userList.lenght === undefined && firstTime === true){
            let new_user = new User(data.name,data.surname,data.birthday,data.email,data.tel,data.username,data.password,data.education);
            firstTime = false;
            UsersDAO.insertOne(new_user)
            .then(result =>{
                console.log('Inserted' + result.insertedCount)
                return res.sendStatus(201);
            })
        }
       else if (userList.lenght === 0) {
            let new_user = new User(data.name,data.surname,data.birthday,data.email,data.tel,data.username,data.password,data.education);
            UsersDAO.insertOne(new_user)
            .then(result =>{
                console.log('Inserted' + result.insertedCount)
                return res.sendStatus(201);
            })
        }
        else {
            return res.sendStatus(400);
        }
    })

    // let email_user = UsersDAO.find(User => User.email === data.email);
    // console.log("-----------------------")
    // console.log(email_config)
    // if (email_config === undefined){
    //     let new_user = new User(data.name,data.surname,data.birthday,data.email,data.tel,data.username,data.password,data.education);
    //     UsersDAO.insertOne(new_user);
    //     return res.sendStatus(201);
    // } else {
    //     console.log(UsersDAO);
    //     return res.sendStatus(400);
    // }
})


app.post('/users/search', function(req,res){
    let data = req.body;
    console.log(data);
    let query = {email: String(data.email)}
    UsersDAO.find(query).toArray()
    .then(userList => {
        if (userList === undefined || userList.lenght === 0){
            return res.sendStatus(404);
        }
        else {
            // searching if the password matches the user's email
            let userExists = userList.find(({password}) => password === data.password)
            console.log("-------------------------------")
            console.log("else")
            console.log(userExists);
            if (userExists === undefined){
                return res.sendStatus(400);
            }
            else {
                return res.sendStatus(201) ;
            }
        }
    })
})

app.post('/users/get', function(req,res){
    let data = req.body;
    console.log(data);
    let query = {email: String(data.email)}
    UsersDAO.find(query).toArray()
    .then(userList => {
        if (userList === undefined || userList.lenght === 0){
            return res.sendStatus(404);
        }
        else {
            // searching if the password matches the user's email
            let userExists = userList.find(({password}) => password === data.password)
            console.log("-------------------------------")
            console.log("else")
            console.log(userExists);
            if (userExists === undefined){
                return res.sendStatus(400);
            }
            else {
                res.send(userExists);
            }
        }
    })
})


app.get('/', function(req,res){
    res.sendFile('index.html');
})
