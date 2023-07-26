console.log("addup.js loaded!");
let upNameBox = document.getElementById("up_name");
let upTypeBox = document.getElementById("up_type");
let upHoursBox = document.getElementById("up_hours");
let upCommentBox = document.getElementById("up_comment");
let upSubButton = document.getElementById("up_subbutton");
let upError = document.getElementById("upadd_div_error_msg");
const elementList = [upNameBox, upTypeBox, upHoursBox, upCommentBox];
if (window.location.href.includes("failed%3DFalse")){
    upError.style.visibility = 'hidden';
    upError.style.display = "none";
}
else if (window.location.href.includes("failed=False")){
    upError.style.visibility = "hidden";
    upError.style.display = "none";
}
else{
    upError.innerHTML = "Failed to add uplift, please try again.";
    upError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
}
checkNumber = function(value){
    if (!isNaN(parseInt(value))){
        console.log("(checkNumber): Value is an integer");
        return true;
    }
    else if (!isNaN(parseFloat(value))){
        console.log("(checkNumber): Value is a float");
        return true;
    }
    else{
        console.log("(checkNumber): Value is not number")
        return false;
    }
}
showError = function(message, console_error){
    upError.innerHTML = message;
    upError.style.visibility = "visible";
    upError.style.display = "block";
    upError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
    console.error(console_error);
}
const addupButton = function(){
    for (let i = 0; i < elementList.length; i++){
        if (elementList[i].value === ""){
            showError("Please fill in all entries!", "One of the textboxes was empty");
            return;
        }
        if (elementList[i].value.includes("?")){
            showError("? is an invalid character", "? used in one of the textboxes");
            return
        }
    }
    if (checkNumber(upHoursBox.value) === false){
        showError("Hours must be a number!", "Hours was not entered as a number");
    }
    else{
        let addupURL = "";
        for (let i = 0; i < elementList.length; i++){
            if (addupURL === ""){
                addupURL = elementList[i].value;
            }
            else{
                addupURL = addupURL + "+" + elementList[i].value;
            }
        }
        addupURL = addupURL.replaceAll("https://", "");
        addupURL = addupURL.replaceAll(" ", "%20");
        addupURL = addupURL.replaceAll("!", "%21");
        addupURL = addupURL.replaceAll("?", "%3F");
        addupURL = addupURL.replaceAll("/", "%3F");
        addupURL = addupURL.replaceAll(".", "%2E");
        addupURL = "/uplifts/add/upliftinfo=" + addupURL;
        window.location.replace(addupURL);
    }
};
function checkEnterKey(event) {
    if (event.key === 'Enter') { 
        event.preventDefault();
        upSubButton.click();
    }
}
upSubButton.addEventListener("click", addupButton);
for (let i = 0; i < elementList.length; i++){
    elementList[i].addEventListener("keyup", function(event) { checkEnterKey(event) ;});
}