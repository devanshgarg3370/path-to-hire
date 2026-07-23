/* =========================================
      PATH TO HIRE LOGIN VALIDATION JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // ==============================
    // Show Error
    // ==============================

    function showError(input, message) {

        const error = input.parentElement.querySelector(".error");

        if (error) {
            error.innerText = message;
        }

        input.style.borderColor = "#ef4444";
    }

    // ==============================
    // Clear Error
    // ==============================

    function clearError(input) {

        const error = input.parentElement.querySelector(".error");

        if (error) {
            error.innerText = "";
        }

        input.style.borderColor = "#cbd5e1";
    }

    // ==============================
    // Email Validation
    // ==============================

    function validateEmail(value) {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(value);
    }

    // ==============================
    // Real Time Validation
    // ==============================

    email.addEventListener("input", () => {

        if (email.value.trim() === "") {

            showError(email, "Email is required");

        } else if (!validateEmail(email.value)) {

            showError(email, "Enter valid email");

        } else {

            clearError(email);

        }

    });

    password.addEventListener("input", () => {

        if (password.value.trim() === "") {

            showError(password, "Password is required");

        } else {

            clearError(password);

        }

    });

    // ==============================
    // Login Submit
    // ==============================

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let valid = true;

        if (email.value.trim() === "") {

            showError(email, "Email is required");

            valid = false;

        }

        else if (!validateEmail(email.value)) {

            showError(email, "Invalid Email");

            valid = false;

        }

        if (password.value.trim() === "") {

            showError(password, "Password is required");

            valid = false;

        }

        if (!valid) return;

        // ==============================
        // Get Registered User
        // ==============================

        const storedUser = JSON.parse(localStorage.getItem("pathToHireUser"));

        if (!storedUser) {

            showToast("No account found. Please Sign Up first.", "error");

            return;

        }

        // ==============================
        // Check Credentials
        // ==============================

        if (

            email.value === storedUser.email &&
            password.value === storedUser.password

        ) {

            localStorage.setItem("isLoggedIn", "true");

            showToast("Login Successful 🚀", "success");

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1500);

        }

        else {

            showToast("Invalid Email or Password", "error");

        }

    });

    // ==============================
    // Toast Message
    // ==============================

    function showToast(message, type) {

        const toast = document.createElement("div");

        toast.innerText = message;

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "12px";
        toast.style.color = "#fff";
        toast.style.fontWeight = "600";
        toast.style.zIndex = "9999";
        toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";
        toast.style.background =
            type === "success" ? "#16a34a" : "#ef4444";

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.remove();

        }, 3000);

    }

});