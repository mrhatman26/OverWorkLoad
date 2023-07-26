console.log("addstaff.js loaded!");
let staffCodeBox = document.getElementById("staff_code");
let staffNameBox = document.getElementById("staff_name");
let staffGradeBox = document.getElementById("staff_grade");
let staffFTEBox = document.getElementById("staff_fte");
let staffHEAcheck = document.getElementById("staff_hasHEA");
let staffSubButton = document.getElementById("staff_subbutton");
let staffError = document.getElementById("staffadd_div_error_msg");
const elementList = [staffCodeBox, staffNameBox, staffGradeBox, staffFTEBox];
if (window.location.href.includes("failed%3DFalse")){
    staffError.style.visibility = 'hidden';
    staffError.style.display = "none";
}
else if (window.location.href.includes("failed=False")){
    staffError.style.visibility = "hidden";
    staffError.style.display = "none";
}
else{
    staffError.innerHTML = "Singup failed, please try again.";
    staffError.style.color = "red";
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
    staffError.innerHTML = message;
    staffError.style.visibility = "visible";
    staffError.style.display = "block";
    staffError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
    console.error(console_error);
}
const addStaffButton = function(){
    for (let i = 0; i < elementList.length; i++){
        if (elementList[i].value === ""){
            showError("Please fill in all entries!", "One of the textboxes was empty");
            return;
        }
    }
    if (checkNumber(staffFTEBox.value) === false){
        showError("Please make sure FTE is a number!", "The value of FTE was not a number");
    }
    else{
        let addStaffURL = "";
        for (let i = 0; i < elementList.length; i++){
            if (addStaffURL === ""){
                addStaffURL = elementList[i].value;
            }
            else{
                addStaffURL = addStaffURL + "+" + elementList[i].value;
            }
        }
        addStaffURL = addStaffURL + "+" + staffHEAcheck.checked;
        addStaffURL = addStaffURL.replaceAll("https://", "");
        addStaffURL = addStaffURL.replaceAll(" ", "%20");
        addStaffURL = addStaffURL.replaceAll("!", "%21");
        addStaffURL = addStaffURL.replaceAll("?", "%3F");
        addStaffURL = addStaffURL.replaceAll("/", "");
        addStaffURL = addStaffURL.replaceAll(".", "%2E");
        addStaffURL = "/staff/add/staffinfo=" + addStaffURL;
        window.location.replace(addStaffURL);
    }
};
function checkEnterKey(event) {
    if (event.key === 'Enter') { 
        event.preventDefault();
        staffSubButton.click();
    }
}
staffSubButton.addEventListener("click", addStaffButton);
for (let i = 0; i < elementList.length; i++){
    elementList[i].addEventListener("keyup", function(event) { checkEnterKey(event) ;});
}