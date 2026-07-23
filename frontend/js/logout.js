document.addEventListener("DOMContentLoaded", () => {

    // Get user details from localStorage
    const user = JSON.parse(localStorage.getItem("pathToHireUser"));

    if (user) {

        document.getElementById("userName").innerText =
            user.name;

        document.getElementById("userEmail").innerText =
            user.email;

    }

    // Cancel Button
    document.getElementById("cancelBtn").addEventListener("click", () => {

        window.location.href = "dashboard.html";

    });

    // Logout Button
    document.getElementById("logoutBtn").addEventListener("click", () => {

        const btn = document.getElementById("logoutBtn");

        btn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Logging Out...';

        btn.disabled = true;

        setTimeout(() => {

            // Remove login session
            localStorage.removeItem("isLoggedIn");

            // If you want to completely remove the user,
            // uncomment the line below.
            // localStorage.removeItem("pathToHireUser");

            alert("Logged Out Successfully!");

            window.location.href = "login.html";

        }, 1800);

    });

});