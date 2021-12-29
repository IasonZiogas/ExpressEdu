window.onload=function(){
    document.getElementById("collapsible").addEventListener("click",collapsableMenu);
}


// Adding collapsable menu
function collapsableMenu(){
    this.classList.toggle("active");
    var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
          }
}
