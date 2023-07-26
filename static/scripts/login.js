console.log("Login.js Loaded!");
let loginUsernameBox = document.getElementById("login_username");
let loginPasswordBox = document.getElementById("login_password");
let loginSubmitButton = document.getElementById("login_subbutton");
let loginError = document.getElementById("login_div_error_msg");
if (loginUsernameBox == null || loginPasswordBox == null || loginSubmitButton == null || loginError == null){
    console.log("Login.js: Login screen not found. Script not running.");
}
else{
    if (window.location.href.includes("failed%3DFalse")){
        loginError.style.visibility = "hidden";
        loginError.style.display = "none";
    }
    else if (window.location.href.includes("failed=False")){
        loginError.style.visibility = "hidden";
        loginError.style.display = "none";
    }
    else{
        loginError.innerHTML = "Login failed, please try again.";
    }
    const loginButton = function(){
        if (loginUsernameBox.value === "" || loginPasswordBox.value === ""){
            loginError.innerHTML = "Please fill in both boxes.";
            loginError.style.visibility = "visible";
            loginError.style.display = "block";
            loginError.style.color = "red";
        }
        else{
            let loginURL = "";
            loginURL = loginURL + loginUsernameBox.value;
            loginURL = loginURL + "+" + loginPasswordBox.value;
            loginURL = loginURL.replaceAll("https://", "");
            loginURL = loginURL.replaceAll(" ", "%20");
            loginURL = loginURL.replaceAll("!", "%21");
            loginURL = loginURL.replaceAll("?", "%3F");
            loginURL = loginURL.replaceAll("/", "");
            loginURL = "/user/login/userinfo=" + loginURL;
            window.location.replace(loginURL);
        }
    }
    console.log("Login.js: Waiting for user to click submit button...");
    loginSubmitButton.addEventListener("click", loginButton);
    loginUsernameBox.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) { //13 is the keycode for the ENTER key.
         event.preventDefault();
         loginSubmitButton.click();
        }
    });
    loginPasswordBox.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) { //13 is the keycode for the ENTER key.
         event.preventDefault();
         loginSubmitButton.click();
        }
    });
}