window.onload = function(){
    // document.getElementById("submit_button").addEventListener("click", emailValidation);
    document.getElementById("submit_button").addEventListener("click", passwordValidation);
    document.getElementById("submit_button").addEventListener("click", ageValidation);
    document.getElementById("user_education").addEventListener("click", enablegradyear);
//     document.getElementById("Computer_Science").addEventListener("click", enableCorrectForm("Computer_Science"))
//     document.getElementById("Literature").addEventListener("click", enableCorrectForm("Literature"))
//     document.getElementById("Natural_Sciences").addEventListener("click", enableCorrectForm("Natural_Sciences"))
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

// Show the correct questions depending of the users favorite field
function enableCorrectForm(field){
    var computerScience= document.getElementsByClassName("Computer_Science_sidebar");
    var literature = document.getElementsByClassName("Literature_sidebar");
    var naturalSciences= document.getElementsByClassName("Natural_Sciences_sidebar");
    if(field == "Computer_Science"){
        // Displaying appropriate form
        document.getElementById("Computer_Science_form").hidden=false;
        document.getElementById("Literature_form").hidden=true;
        document.getElementById("Natural_Sciences_form").hidden=true;
        // Displaying appropriate sidebar
        for (let i = 0; i < computerScience.length; i++){
            computerScience[i].hidden=false;
         }
         for (let y = 0; y < literature.length; y++){
             literature[y].hidden = true;
         }
         for (let z = 0; z< naturalSciences.length; z++){
             naturalSciences[z].hidden=true;
         }


    }
    else if(field== "Literature"){
        // Displaying appropriate form
        document.getElementById("Computer_Science_form").hidden=true;
        document.getElementById("Literature_form").hidden=false;
        document.getElementById("Natural_Sciences_form").hidden=true;
        // Displaying appropriate sidebar
        for (let i = 0; i < computerScience.length; i++){
           computerScience[i].hidden=true;
        }
        for (let y = 0; y < literature.length; y++){
            literature[y].hidden = false;
        }
        for (let z = 0; z< naturalSciences.length; z++){
            naturalSciences[z].hidden=true;
        }
    }
    else if(field == "Natural_Sciences"){
        // Displaying appropriate form
        document.getElementById("Computer_Science_form").hidden=true;
        document.getElementById("Literature_form").hidden=true;
        document.getElementById("Natural_Sciences_form").hidden=false;
        // Displaying appropriate sidebar
        for (let i = 0; i < computerScience.length; i++){
            computerScience[i].hidden=true;
         }
         for (let y = 0; y < literature.length; y++){
             literature[y].hidden = true;
         }
         for (let z = 0; z< naturalSciences.length; z++){
             naturalSciences[z].hidden=false;
         }
    }
}


// checking if the 2 passwords are the same 
function passwordValidation(){
    let password = document.getElementById("user_password");
    let password_config = document.getElementById("user_password_config");
    let error = document.getElementById("password_error");
    if (password.value === password_config.value){
        error.textContent = ""
    }
    else{
        error.textContent = "Passwords should match"
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
    } 
    else{
        window.alert("Invalid input")
        error.textContent = "You have to be over 18 years old"
    }  
}