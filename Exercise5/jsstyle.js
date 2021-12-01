

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
function enablecorrectform(field){
    if(field == "Computer_Science"){
        document.getElementById("Computer_Science_form").hidden=false;
        document.getElementById("Literature_form").hidden=true;
        document.getElementById("Natural_Sciences_form").hidden=true;
    }
    else if(field== "Literature"){
        document.getElementById("Computer_Science_form").hidden=true;
        document.getElementById("Literature_form").hidden=false;
        document.getElementById("Natural_Sciences_form").hidden=true;

    }
    else if(field == "Natural_Sciences"){
        document.getElementById("Computer_Science_form").hidden=true;
        document.getElementById("Literature_form").hidden=true;
        document.getElementById("Natural_Sciences_form").hidden=false;
    }
}