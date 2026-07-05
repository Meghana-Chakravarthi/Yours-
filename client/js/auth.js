// LOGIN FORM

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        console.log("Login submitted!");

        window.location.href = "dashboard.html";

    });

}



// SIGNUP FORM

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();

        console.log("Signup submitted!");

        window.location.href = "dashboard.html";

    });

}