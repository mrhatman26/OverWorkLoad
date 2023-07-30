console.log("addlink_stafftomodule.js loaded!");
let adminCodeDropDown = document.getElementById("admin_assign_admin_code");
let staffCodeDropDown = document.getElementById("admin_assign_staff_code");
let adminQuantityBox = document.getElementById("admin_assign_admin_quantity");
let adminDescription = document.getElementById("admin_assign_admin_notes");
let overrideAdminHoursDropDown = document.getElementById("admin_assign_admin_adminhoursoverride");
let overrideHoursBox = document.getElementById("admin_assign_admin_overridehours");
let adminType = document.getElementById("hidden_noaffect");
let assignSubButton = document.getElementById("assign_subbutton");
let assignError = document.getElementById("assign_div_error_msg");
const intElementList = [adminQuantityBox, overrideHoursBox];
const allElements = [staffCodeDropDown, adminCodeDropDown, adminQuantityBox, overrideAdminHoursDropDown, overrideHoursBox, adminDescription];
adminCodeResize();
if (window.location.href.includes("failed%3DFalse")){
    assignError.style.visibility = 'hidden';
    assignError.style.display = "none";
}
else if (window.location.href.includes("failed=False")){
    assignError.style.visibility = "hidden";
    assignError.style.display = "none";
}
else{
    if (window.location.href.includes("reason=0")){
        assignError.innerHTML = "Failed to assign staff member to uplift, please try again.";
    }
    else if(window.location.href.includes("reason=1")){
        assignError.innerHTML= "Staff member already assigned to uplift, please try again.";
    }
    else{
        assignError.innerHTML = "Failed to assign staff member to uplift due to a server error, please try again.";
    }
    assignError.style.color = "red";
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
    console.error(console_error);
}
const addupButton = function(){
    if (adminCodeDropDown.value === "Choose uplift" || adminCodeDropDown.value === ""){
        showError("No uplift selected!", "uplift box still contains 'Choose uplift'");
        return;
    }
    if (staffCodeDropDown.value === "Choose Staff Code" || staffCodeDropDown.value === ""){
        showError("No staff code selected!", "Staff code box still contains 'Choose Staff Code'");
        return;
    }
    if (adminQuantityBox.value === ""){
        showError("Please enter admin quantity!", "Admin quantity was empty")
        return;
    }
    for (let i = 0; i < allElements.length; i++){
        if (allElements[i].value.includes("?")){
            showError("? is an invalid character", "? used in one of the textboxes");
            return;
        }
    }
    for (let i = 0; i < intElementList.length; i++){
        if (i === intElementList.length - 1){
            if (overrideAdminHoursDropDown.value === "Yes"){
                if (checkNumber(intElementList[i].value) === false){
                    showError("Quantity and hours must be numbers!", "One or more text boxes did not contain integers or floats where they should have");
                    return;
                }
            }
            else{
                overrideHoursBox.value = 0;
                if (checkNumber(intElementList[i].value) === false){
                    showError("Quantity and hours must be numbers!", "One or more text boxes did not contain integers or floats where they should have");
                    return;
                }
            }
        }
        else{
            if (checkNumber(intElementList[i].value) === false){
                showError("Quantity and hours must be numbers!", "One or more text boxes did not contain integers or floats where they should have");
                return;
            }
        }
    }
    if (overrideAdminHoursDropDown.value == "Yes"){
        overrideAdminHoursDropDown.value = "1";
    }
    else{
        overrideAdminHoursDropDown.value = "0";
    }
    if (overrideAdminHoursDropDown.value === "Yes" && overrideHoursBox.value === ""){
        showError("Please enter the override hours!", "No override hours given when override is set to 'Yes'");
    }
    else{
        let assignURL = "";
        if (adminDescription.value === ""){
            adminDescription.value = "N/A";
        }
        for (let i = 0; i < allElements.length; i++){
            if (assignURL === ""){
                assignURL = allElements[i].value;
            }
            else{
                assignURL = assignURL + "+" + allElements[i].value;
            }
        }
        assignURL = assignURL + "+" + adminType.innerHTML;
        assignURL = assignURL.replaceAll("https://", "");
        assignURL = assignURL.replaceAll(" ", "%20");
        assignURL = assignURL.replaceAll("!", "%21");
        assignURL = assignURL.replaceAll("?", "%3F");
        assignURL = assignURL.replaceAll("/", "%3F");
        assignURL = assignURL.replaceAll(".", "%2E");
        assignURL = "/uplifts/admin/add/linkinfo=" + assignURL;
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
for (let i = 0; i < allElements.length; i++){
    allElements[i].addEventListener("keyup", function(event) { checkEnterKey(event) ;});
}
function adminCodeResize(){
    var selectedValue = adminCodeDropDown.options[adminCodeDropDown.selectedIndex].value; 
    var selectedText = adminCodeDropDown.options[adminCodeDropDown.selectedIndex].text;
    adminCodeDropDown.style.width = 20 + (selectedText.length * 10) + "px";
}
adminCodeDropDown.addEventListener("change", adminCodeResize, false);