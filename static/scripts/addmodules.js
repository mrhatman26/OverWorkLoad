console.log("addmod.js loaded!");
let modLevelBox = document.getElementById("mod_level");
let modCodeBox = document.getElementById("mod_code");
let modTitleBox = document.getElementById("mod_title");
let modSubButton = document.getElementById("mod_subbutton");
let modError = document.getElementById("modadd_div_error_msg");
const elementList = [modLevelBox, modCodeBox, modTitleBox];
if (window.location.href.includes("failed%3DFalse")){
    modError.style.visibility = 'hidden';
    modError.style.display = "none";
}
else if (window.location.href.includes("failed=False")){
    modError.style.visibility = "hidden";
    modError.style.display = "none";
}
else{
    modError.innerHTML = "Failed to add module, please try again.";
    modError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
}
showError = function(message, console_error){
    modError.innerHTML = message;
    modError.style.visibility = "visible";
    modError.style.display = "block";
    modError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
    console.error(console_error);
}
const addmodButton = function(){
    for (let i = 0; i < elementList.length; i++){
        if (elementList[i].value === ""){
            showError("Please fill in all entries!", "One of the textboxes was empty");
            return;
        }
    }
    let addmodURL = "";
    for (let i = 0; i < elementList.length; i++){
        if (addmodURL === ""){
            addmodURL = elementList[i].value;
        }
        else{
            addmodURL = addmodURL + "+" + elementList[i].value;
        }
    }
    addmodURL = addmodURL.replaceAll("https://", "");
    addmodURL = addmodURL.replaceAll(" ", "%20");
    addmodURL = addmodURL.replaceAll("!", "%21");
    addmodURL = addmodURL.replaceAll("?", "%3F");
    addmodURL = addmodURL.replaceAll("/", "?");
    addmodURL = addmodURL.replaceAll(".", "%2E");
    addmodURL = "/modules/add/moduleinfo=" + addmodURL;
    window.location.replace(addmodURL);
};
function checkEnterKey(event) {
    if (event.key === 'Enter') { 
        event.preventDefault();
        modSubButton.click();
    }
}
modSubButton.addEventListener("click", addmodButton);
for (let i = 0; i < elementList.length; i++){
    elementList[i].addEventListener("keyup", function(event) { checkEnterKey(event) ;});
}