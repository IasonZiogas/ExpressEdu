
window.onload=function(){
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

// Checking if the credentials are correct
async function checkProfile(){
    let user_email = document.getElementById("user_email").value;
    let user_password = document.getElementById("user_password").value;

    const data = {email: user_email, password:user_password}

    let url = "http://localhost:8080/users/search"


    let init ={
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
        };

    await fetch(url, init)
    .then(function(response){
        if (response.status === 404){
            window.alert("User not found...")
        } else if (response.status === 400){
            window.alert("Wrong password...")
        }
         else if (response.status === 201){ 
            //  If the credentials are correct get the profile's information 
             loadProfile()
        }
    })
    .catch(error => {
        console.log(error)
    })
}

// Retrieving the information of the profile
async function loadProfile(){

    let user_email = document.getElementById("user_email").value;

    let url = "http://localhost:8080/users/" + user_email

    let template = document.querySelector("#profile-details-template").innerHTML;
    let compiled_template = Handlebars.compile(template);

    let init ={
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        };

    await fetch(url, init)
    .then(response => response.json() )
    .then(obj => {
            console.log('Received object', obj)
            profileDetails = obj;
            document.getElementById("credentials-form").hidden = true;
            document.getElementById("profile").hidden = false;
            let rendered = compiled_template(profileDetails);
            let  Profile = document.querySelector("#profile");
            Profile.innerHTML = rendered;
        
    })
    .catch(error => {
        console.log(error)
    })
}
