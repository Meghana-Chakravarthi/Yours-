// =============================
// LOGIN
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid Email or Password");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    });

}


// =============================
// SIGNUP
// =============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const college = document.getElementById("college").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const alreadyExists = users.find(
            u => u.email === email
        );

        if (alreadyExists) {

            alert("Email already exists");

            return;

        }

        const newUser = {

            id: Date.now(),

            fullName,

            college,

            email,

            password,

            karma: 0,

            recoveries: 0

        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("currentUser", JSON.stringify(newUser));

        alert("Signup Successful!");

        window.location.href = "dashboard.html";

    });

}