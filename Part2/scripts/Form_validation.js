window.onload = function(){
    document.getElementById("submit_button").addEventListener("click", passwordValidation);
    document.getElementById("user_education").addEventListener("click", enablegradyear);
    document.getElementById("collapsible").addEventListener("click",collapsableMenu);
}

// Adding collapsable menu
function collapsableMenu(){

    let url = "https://elearning-aueb.herokuapp.com/categories"
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init ={
    method: "GET",
    headers: myHeaders
}

    let template = document.querySelector("#course-categories-template").innerHTML;
    let compiled_template = Handlebars.compile(template);

    fetch(url, init)
    .then(response => response.json() )
    .then(obj => {
        console.log('Received object', obj)
        let categoriesRecieved = {categories: []};
        if (obj != null){
            for (category in obj){
                categoriesRecieved["categories"].push({"id": obj[category].id,"title":obj[category].title})
            }
        } else {
            console.log("No categories found...")
        }
        console.log(categoriesRecieved);
        let rendered = compiled_template(categoriesRecieved);
        let  htmlCourses = document.querySelector("#course_categories_menu");
        htmlCourses.innerHTML = rendered;
    })
    .catch(error => {
        console.log(error)
    })

    this.classList.toggle("active");
    var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
          }
}


// when you select university as your education status graduation year pops up
function enablegradyear(){
    let e=document.getElementById("user_education").value;
    if (e == "University"){
        document.getElementById("graduation_year").hidden=false;
    }
    else{
        document.getElementById("graduation_year").hidden=true;
    }
}

// checking if the 2 passwords are the same 
function passwordValidation(){
    let password = document.getElementById("user_password");
    let password_config = document.getElementById("user_password_config");
    let error = document.getElementById("password_error");
    if (password.value === password_config.value){
        error.textContent = "";
    }
    else{
        window.alert("Passwords should match")
        // error.textContent = "Passwords should match"
    }    
}

// Checking if the user if over the age of 18
function ageValidation(){
    let userAge =document.getElementById("user_birthday").value;
    let fields = userAge.split('-');
    let user_year = parseInt(fields[0]);
    let user_month = parseInt(fields[1]);
    let user_day = parseInt(fields[2]);

    let error = document.getElementById("age_error");

    let current_date = new Date();
    let current_year = current_date.getUTCFullYear();
    let current_month = current_date.getUTCMonth() + 1;
    let current_day=current_date.getUTCDate();

    let flag = true;
    if (current_year - user_year < 18){
        flag=false;
    } 
    else if (current_year - user_year === 18) {
        if (current_month < user_month){
            flag = false;
        } 
        else if (current_month === user_month){
            if (current_day < user_day){
                flag = false;
            }
        } 
    } 
    
    if (flag){
        error.textContent = ""
        passwordValidation();
    } 
    else{
        window.alert("You have to be over 18 years old")
        // error.textContent = "You have to be over 18 years old"
    }  
}


// Sending the request to the server
async function signUp(){
    let url = "http://localhost:8080/users"

    let user = {}
    user["name"] = document.getElementById("first_name").value;
    user["surname"] = document.getElementById("last_name").value;
    user["birthday"] = document.getElementById("user_birthday").value;
    user["email"] = document.getElementById("user_email").value;
    user["tel"] = document.getElementById("user_phone").value;
    user["username"] = document.getElementById("username").value;
    user["password"] = document.getElementById("user_password").value;
    user["education"] = document.getElementById("user_education").value;   

    let init ={
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(user)
    };

    await fetch(url, init)
    .then(function(response){
        if (response.status === 400){
            window.alert("Email is already used...")
        } else if (response.status === 201){
            document.getElementById("signup-form").innerHTML = "<a href='index.html'><h2>Επιτυχής εγγραφή!</h2></a>"
        }
    })
    .catch(error => {
        console.log(error)
    })
}