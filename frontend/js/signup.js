/* =========================================
      PATH TO HIRE SIGNUP JS (FastAPI)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (!signupForm) return;

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!name || !email || !password) {
            showToast("Please fill in all fields", "error");
            return;
        }

        // Show loading state
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Registering...`;
        submitBtn.disabled = true;

        try {
            // POST request to FastAPI backend
            const response = await fetch("http://127.0.0.1:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Account Created Successfully! 🚀", "success");

                // Redirect to login page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                const errorMessage = data.detail || "Registration failed.";
                showToast(errorMessage, "error");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            showToast("Cannot connect to server. Is FastAPI running?", "error");
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Toast Notification Helper
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
});
