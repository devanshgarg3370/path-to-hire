document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const loginBtn = document.getElementById("loginBtn");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showError("Please enter both email and password.");
            return;
        }

        // Show loading state on button
        const originalBtnText = loginBtn.innerHTML;
        loginBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Logging in...`;
        loginBtn.disabled = true;
        hideError();

        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Save JWT token and user details in localStorage
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect to Dashboard
                window.location.href = "dashboard.html";
            } else {
                // Display error detail from backend
                showError(data.detail || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            showError("Unable to connect to server. Ensure FastAPI backend is running.");
        } finally {
            loginBtn.innerHTML = originalBtnText;
            loginBtn.disabled = false;
        }
    });

    function showError(message) {
        if (errorMsg) {
            errorMsg.innerText = message;
            errorMsg.style.display = "block";
        } else {
            alert(message);
        }
    }

    function hideError() {
        if (errorMsg) {
            errorMsg.style.display = "none";
        }
    }
});