console.log("Signup.js Loaded!");
let signupUsernameBox = document.getElementById("signup_username");
let signupPasswordBox = document.getElementById("signup_password");
let signupSubmitButton = document.getElementById("signup_subbutton");
let signupError = document.getElementById("signup_div_error_msg");
const elementList = [signupUsernameBox, signupPasswordBox];
if (window.location.href.includes("failed%3DFalse")){
    signupError.style.visibility = 'hidden';
    signupError.style.display = "none";
}
else if (window.location.href.includes("failed=False")){
    signupError.style.visibility = "hidden";
    signupError.style.display = "none";
}
else{
    signupError.innerHTML = "Singup failed, please try again.";
    signupError.style.color = "red";
    window.scrollTo(0, document.body.scrollHeight);
}
const signupButton = function(){
    if (signupUsernameBox.value === "" || signupPasswordBox.value === ""){
        signupError.innerHTML = "Please fill in all entries!";
        signupError.style.visibility = "visible";
        signupError.style.display = "block";
        signupError.style.color = "red";
        window.scrollTo(0, document.body.scrollHeight);
        console.error("One of the text boxes is empty");
    }
    else if (signupPasswordBox.value.includes("1234") || signupPasswordBox.value.length < 6){
        signupError.innerHTML = "Please enter a stronger password";
        signupError.style.visibility = "visible";
        signupError.style.display = "block";
        signupError.style.color = "red";
        window.scrollTo(0, document.body.scrollHeight);
        console.error("Password is insecure");
    }
    else if (signupPasswordBox.value.includes(signupUsernameBox.value)){
        signupError.innerHTML = "Please ensure your password does not contain your username.";
        signupError.style.visibility = "visible";
        signupError.style.display = "block";
        signupError.style.color = "red";
        window.scrollTo(0, document.body.scrollHeight);
        console.error("Password contains username");
    }
    else{
        let signupURL = ""; 
        signupURL = signupURL + signupUsernameBox.value;
        signupURL = signupURL + "+" + signupPasswordBox.value;
        signupURL = signupURL.replaceAll("https://", "");
        signupURL = signupURL.replaceAll(" ", "%20");
        signupURL = signupURL.replaceAll("!", "%21");
        signupURL = signupURL.replaceAll("?", "%3F");
        signupURL = signupURL.replaceAll("/", "");
        signupURL = signupURL.replaceAll(".", "%2E");
        signupURL = "/users/signup/userinfo=" + signupURL;
        window.location.replace(signupURL);
    }
}
function checkEnterKey(event) {
    if (event.key === 'Enter') { 
        event.preventDefault();
        signupSubmitButton.click();
    }
}
signupSubmitButton.addEventListener("click", signupButton);
for (let i = 0; i < elementList.length; i++){
    elementList[i].addEventListener("keyup", function(event) { checkEnterKey(event) ;});
}