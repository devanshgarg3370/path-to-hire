/* =========================================
   PATH TO HIRE AUTHENTICATION JS (FastAPI)
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Helper: Show Error
    function showError(input, message) {
        if (!input) return;
        const parentGroup = input.closest(".input-group") || input.parentElement;
        const error = parentGroup ? parentGroup.querySelector(".error") : null;

        if (error) {
            error.innerText = message;
        }
        input.style.borderColor = "#ef4444";
    }

    // Helper: Clear Error
    function clearError(input) {
        if (!input) return;
        const parentGroup = input.closest(".input-group") || input.parentElement;
        const error = parentGroup ? parentGroup.querySelector(".error") : null;

        if (error) {
            error.innerText = "";
        }
        input.style.borderColor = "#cbd5e1";
    }

    // Helper: Email Regex
    function validateEmail(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    // Helper: Toast Notifications
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
        toast.style.background = type === "success" ? "#16a34a" : "#ef4444";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }


    // ==========================================
    // 1. SIGNUP FORM HANDLER
    // ==========================================
    if (signupForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            let valid = true;
            const nameVal = nameInput ? nameInput.value.trim() : "";
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const passwordVal = passwordInput ? passwordInput.value.trim() : "";
            const confirmVal = confirmPasswordInput ? confirmPasswordInput.value.trim() : "";

            if (!nameVal) {
                showError(nameInput, "Full Name is required");
                valid = false;
            } else {
                clearError(nameInput);
            }

            if (!emailVal || !validateEmail(emailVal)) {
                showError(emailInput, "Enter a valid email address");
                valid = false;
            } else {
                clearError(emailInput);
            }

            if (!passwordVal) {
                showError(passwordInput, "Password is required");
                valid = false;
            } else {
                clearError(passwordInput);
            }

            if (passwordVal !== confirmVal) {
                showError(confirmPasswordInput, "Passwords do not match");
                valid = false;
            } else {
                clearError(confirmPasswordInput);
            }

            if (!valid) return;

            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;
            submitBtn.disabled = true;

            try {
                const response = await fetch("http://127.0.0.1:8000/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: nameVal,
                        email: emailVal,
                        password: passwordVal
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    showToast("Account Created Successfully! 🚀 Redirecting to login...", "success");
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1500);
                } else {
                    const errorMsg = data.detail || "Registration failed";
                    showToast(errorMsg, "error");
                }
            } catch (err) {
                console.error("Signup Fetch Error:", err);
                showToast("Cannot connect to server. Is FastAPI running?", "error");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }


    // ==========================================
    // 2. LOGIN FORM HANDLER
    // ==========================================
    if (loginForm)if (loginForm) {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            let valid = true;
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const passwordVal = passwordInput ? passwordInput.value.trim() : "";

            if (!emailVal || !validateEmail(emailVal)) {
                showError(emailInput, "Enter a valid email");
                valid = false;
            } else {
                clearError(emailInput);
            }

            if (!passwordVal) {
                showError(passwordInput, "Password is required");
                valid = false;
            } else {
                clearError(passwordInput);
            }

            if (!valid) return;

            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Logging in...`;
            submitBtn.disabled = true;

            try {
                const response = await fetch("http://127.0.0.1:8000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: emailVal,
                        password: passwordVal
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("isLoggedIn", "true");

                    showToast("Login Successful 🚀", "success");

                    setTimeout(() => {
                        window.location.href = "resume-upload.html";
                    }, 1200);
                } else {
                    const errorMsg = data.detail || "Invalid Email or Password";
                    showToast(errorMsg, "error");
                }
            } catch (err) {
                console.error("Login Fetch Error:", err);
                showToast("Cannot connect to server. Is FastAPI running?", "error");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==========================================
    // 3. GOOGLE LOGIN DEMO HANDLER
    // ==========================================
    const googleLoginBtn = document.getElementById("googleLoginBtn");
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", () => {
            googleLoginBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Connecting to Google...`;
            googleLoginBtn.style.opacity = "0.7";

            setTimeout(() => {
                localStorage.setItem("token", "demo-google-token-xyz");
                localStorage.setItem("user", JSON.stringify({ name: "Google Demo User", email: "demo.user@gmail.com" }));
                localStorage.setItem("isLoggedIn", "true");

                showToast("Google Sign-In Successful! 🚀", "success");

                setTimeout(() => {
                    window.location.href = "resume-upload.html";
                }, 1000);
            }, 1000);
        });
    }

});
// ======================================================
// PASSWORD VISIBILITY TOGGLE
// ======================================================

const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");
const toggleIcon = document.getElementById("toggleIcon");

if (togglePassword && passwordField && toggleIcon) {
    togglePassword.addEventListener("click", () => {
        const isHidden = passwordField.type === "password";

        passwordField.type = isHidden ? "text" : "password";

        toggleIcon.classList.toggle("fa-eye", !isHidden);
        toggleIcon.classList.toggle("fa-eye-slash", isHidden);

        togglePassword.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );
    });
}