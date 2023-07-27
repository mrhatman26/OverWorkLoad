console.log("addlink_stafftomodule.js loaded!");
let moduleCodeDropDown = document.getElementById("mod_assign_mod_code");
let staffCodeDropDown = document.getElementById("mod_assign_staff_code");
let deliveryBox = document.getElementById("mod_assign_mod_delivery");
let newToModuleDropDown = document.getElementById("mod_assign_mod_newto");
let moduleLeaderDropDown = document.getElementById("mod_assign_mod_leader");
let modulePrepDropDown = document.getElementById("mod_assign_mod_prep");
let inLabDropDown = document.getElementById("mod_assign_mod_inlab");
let moduleCreditsBox = document.getElementById("mod_assign_mod_credits");
let moduleWeekNoBox = document.getElementById("mod_assign_mod_noweeks");
let moduleStudentsNoBox = document.getElementById("mod_assign_mod_student_amount");
let moduleHoursPerWeekBox = document.getElementById("mod_assign_mod_weekhours");
let moduleRepeatLecturesBox = document.getElementById("mod_assign_mod_weeklyrepeats");
let moduleFirstLabHoursBox = document.getElementById("mod_assign_mod_firsthours");
let moduleRepeatLabHoursBox = document.getElementById("mod_assign_mod_repeathours");
let overrideMarkingHoursDropDown = document.getElementById("mod_assign_mod_markhoursoverride");
let overrideHoursBox = document.getElementById("mod_assign_mod_overridehours");
let moduleNotes = document.getElementById("mod_assign_mod_notes");
let assignSubButton = document.getElementById("assign_subbutton");
let assignError = document.getElementById("assign_div_error_msg");
const textElementList = [deliveryBox, moduleCreditsBox, moduleWeekNoBox, moduleStudentsNoBox, moduleHoursPerWeekBox, moduleRepeatLecturesBox, moduleFirstLabHoursBox, moduleRepeatLabHoursBox, moduleNotes];
const intElementList = [moduleCreditsBox, moduleWeekNoBox, moduleStudentsNoBox, moduleHoursPerWeekBox, moduleRepeatLecturesBox, moduleFirstLabHoursBox, moduleRepeatLabHoursBox, overrideHoursBox];
const yesNoDropDownElements = [newToModuleDropDown, moduleLeaderDropDown, modulePrepDropDown, inLabDropDown, overrideMarkingHoursDropDown];
const allElements = [moduleCodeDropDown, staffCodeDropDown, deliveryBox, newToModuleDropDown, moduleLeaderDropDown, modulePrepDropDown, inLabDropDown, moduleCreditsBox, moduleWeekNoBox, moduleStudentsNoBox, moduleHoursPerWeekBox, moduleRepeatLecturesBox, moduleFirstLabHoursBox, moduleRepeatLabHoursBox, overrideMarkingHoursDropDown, overrideHoursBox, moduleNotes];
if (window.location.href.includes("failed%3DFalse")){
    assignError.style.visibility = 'hidden';
    assignError.style.display = "none";
}
else if (window.location.href.includes("failed=False")){
    assignError.style.visibility = "hidden";
    assignError.style.display = "none";
}
else{
    assignError.innerHTML = "Failed to assign staff member to module, please try again.";
    assignError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
}
checkNumber = function(value){
    if (!isNaN(parseInt(value))){
        console.log("(checkNumber): " + value + " is an integer");
        return true;
    }
    else if (!isNaN(parseFloat(value))){
        console.log("(checkNumber): " + value + " is a float");
        return true;
    }
    else{
        console.log("(checkNumber): " + value + " is not number")
        return false;
    }
}
showError = function(message, console_error){
    assignError.innerHTML = message;
    assignError.style.visibility = "visible";
    assignError.style.display = "block";
    assignError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
    console.error(console_error);
}
const addupButton = function(){
    for (let i = 0; i < textElementList.length; i++){
        if (textElementList[i].value === ""){
            if (i === textElementList.length - 1){
                textElementList[i].value = "N/A"
            }
            else{
                showError("Please fill in all entries!", "One of the textboxes was empty");
                return;
            }
        }
        if (textElementList[i].value.includes("?")){
            showError("? is an invalid character", "? used in one of the textboxes");
            return;
        }
    }
    for (let i = 0; i < intElementList.length; i++){
        if (i === intElementList.length - 1){
            if (overrideMarkingHoursDropDown.value === "Yes"){
                if (checkNumber(intElementList[i].value) === false){
                    showError("Hours must be numbers!", "One or more text boxes did not contain integers or floats where they should have");
                    return;
                }
            }
            else{
                overrideHoursBox.value = 0;
                if (checkNumber(intElementList[i].value) === false){
                    showError("Hours must be numbers!", "One or more text boxes did not contain integers or floats where they should have");
                    return;
                }
            }
        }
        else{
            if (checkNumber(intElementList[i].value) === false){
                showError("Hours must be numbers!", "One or more text boxes did not contain integers or floats where they should have");
                return;
            }
        }
    }
    for (let i = 0; i < yesNoDropDownElements.length; i++){
        console.log("Old value: " + yesNoDropDownElements[i].value);
        if (yesNoDropDownElements[i].value === "Yes"){
            yesNoDropDownElements[i].value = "1";
        }
        else{
            yesNoDropDownElements[i].value = "0";
        }
        console.log("New value: " + yesNoDropDownElements[i].value);
    }
    if (moduleCodeDropDown.value === "Choose Module Code" || moduleCodeDropDown.value === ""){
        showError("No module code selected!", "Module code box still contains 'Choose Module Code'");
        
    }
    else if (staffCodeDropDown.value === "Choose Staff Code" || staffCodeDropDown.value === ""){
        showError("No staff code selected!", "Staff code box still contains 'Choose Staff Code'");
    }
    else if (overrideMarkingHoursDropDown.value === "Yes" && overrideHoursBox.value === ""){
        showError("Please enter the override hours!", "No override hours given when override is set to 'Yes'");
    }
    else{
        let assignURL = "";
        for (let i = 0; i < allElements.length; i++){
            if (assignURL === ""){
                assignURL = allElements[i].value;
            }
            else{
                assignURL = assignURL + "+" + allElements[i].value;
            }
        }
        assignURL = assignURL.replaceAll("https://", "");
        assignURL = assignURL.replaceAll(" ", "%20");
        assignURL = assignURL.replaceAll("!", "%21");
        assignURL = assignURL.replaceAll("?", "%3F");
        assignURL = assignURL.replaceAll("/", "%3F");
        assignURL = assignURL.replaceAll(".", "%2E");
        assignURL = "/modules/assign/linkinfo=" + assignURL;
        window.location.replace(assignURL);
    }
};
function checkEnterKey(event) {
    if (event.key === 'Enter') { 
        event.preventDefault();
        assignSubButton.click();
    }
}
assignSubButton.addEventListener("click", addupButton);
for (let i = 0; i < textElementList.length; i++){
    textElementList[i].addEventListener("keyup", function(event) { checkEnterKey(event) ;});
}